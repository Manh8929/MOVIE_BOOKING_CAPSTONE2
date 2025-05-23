import db from "../models";
import PayOS from "@payos/node";
import dotenv from "dotenv";

dotenv.config();

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

const normalizeStatus = (status) => {
  if (!status || typeof status !== "string") {
    return "unknown";
  }

  switch (status.toUpperCase()) {
    case "PAID":
      return "completed";
    case "CANCELLED":
    case "FAILED":
      return "failed";
    default:
      return status.toLowerCase();
  }
};

export const createPaymentLinkService = async ({
  user_id,
  amount,
  selectedSeats,
  showtime_id,
  description,
}) => {
  if (!selectedSeats || selectedSeats.length === 0) {
    throw new Error("Phải chọn ít nhất 1 ghế");
  }

  // 0. Kiểm tra ghế có sẵn
  const unavailableSeats = await db.Seat.findAll({
    where: {
      seat_id: selectedSeats,
      is_available: false,
    },
  });
  if (unavailableSeats.length > 0) {
    const seatNames = unavailableSeats.map((seat) => seat.name).join(", ");
    throw new Error(`Ghế đã được đặt: ${seatNames}`);
  }

  // 1. Tạo Booking
  const booking = await db.Booking.create({
    user_id,
    showtime_id,
    qr_code: `QR-${Date.now()}`,
    total_price: amount,
    status: "pending",
  });

  // 2. Gán ghế
  await Promise.all(
    selectedSeats.map((seat_id) =>
      db.BookingSeat.create({ booking_id: booking.booking_id, seat_id })
    )
  );

  // 3. Tạo Payment
  const payment = await db.Payment.create({
    user_id,
    booking_id: booking.booking_id,
    amount,
    payment_status: "pending",
    payment_method: "payos",
  });

  // 4. Tạo link thanh toán
  const checkoutUrl = await generatePaymentLink({
    amount,
    orderCode: payment.payment_id,
    description,
  });

  return {
    checkoutUrl,
    payment_id: payment.payment_id,
    booking_id: booking.booking_id,
  };
};

export const generatePaymentLink = async ({
  amount,
  orderCode,
  description,
}) => {
  if (!amount || isNaN(amount)) throw new Error("Invalid amount");

  const paymentData = {
    amount: Number(amount),
    orderCode: Number(orderCode),
    description: description || "Thanh toán vé xem phim",
    items: [
      {
        name: description || "Thanh toán vé xem phim",
        quantity: 1,
        price: Number(amount),
      },
    ],
    cancelUrl: `${process.env.CLIENT_URL}/`,
    returnUrl: `${process.env.CLIENT_URL}/payment-success`,
  };

  const paymentLinkRes = await payos.createPaymentLink(paymentData);
  return paymentLinkRes.checkoutUrl;
};

export const updatePaymentStatusService = async ({ payment_id, status }) => {
  const normalizedStatus = normalizeStatus(status);

  console.log("payment_id:", payment_id, typeof payment_id);
  const payment = await db.Payment.findByPk(payment_id);

  if (!payment) {
    throw new Error(`Không tìm thấy payment với id: ${payment_id}`);
  }

  // 1. Cập nhật trạng thái thanh toán
  await payment.update({ payment_status: normalizedStatus });

  // 2. Cập nhật trạng thái Booking
  const booking = await db.Booking.findByPk(payment.booking_id);
  if (!booking) throw new Error("Không tìm thấy booking");

  await booking.update({
    status: normalizedStatus === "completed" ? "confirmed" : "canceled",
  });

  // 3. Nếu FAILED → hủy giữ ghế và cập nhật lại is_available
  if (normalizedStatus === "failed") {
    const bookedSeats = await db.BookingSeat.findAll({
      where: { booking_id: booking.booking_id },
    });

    const seatIds = bookedSeats.map((seat) => seat.seat_id);

    // Cập nhật lại ghế là available
    await db.Seat.update(
      { is_available: true },
      { where: { seat_id: seatIds } }
    );

    // Xóa giữ ghế
    await db.BookingSeat.destroy({
      where: { booking_id: booking.booking_id },
    });
  }

  // 4. Nếu COMPLETED → đánh dấu ghế là KHÔNG CÒN TRỐNG
  if (normalizedStatus === "completed") {
    const bookedSeats = await db.BookingSeat.findAll({
      where: { booking_id: booking.booking_id },
    });

    const seatIds = bookedSeats.map((seat) => seat.seat_id);

    await db.Seat.update(
      { is_available: false },
      { where: { seat_id: seatIds } }
    );
  }

  return { success: true };
};
