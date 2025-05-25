import React, { useState, useEffect } from "react";
import { getAllPayments } from "../services/adminService";
import SidebarAdm from "../components/Admin/SidebarAdm";

const ManagerPayment = () => {
  const [activePage, setActivePage] = useState("managerPayment");
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPayments();
        setPayments(data.payments || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thanh toán:", error);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const { booking_id, User } = payment;
    const email = User?.email?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return booking_id.toString().includes(search) || email.includes(search);
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarAdm activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
          {/* Thanh tìm kiếm */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm theo mã booking hoặc email người dùng"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Bảng thanh toán */}
          <div className="overflow-auto max-h-[75vh]">
            {filteredPayments.length === 0 ? (
              <p className="text-gray-700">Không có dữ liệu thanh toán.</p>
            ) : (
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 border">Mã booking</th>
                    <th className="px-4 py-2 border">Phương thức</th>
                    <th className="px-4 py-2 border">Trạng thái</th>
                    <th className="px-4 py-2 border">Số tiền</th>
                    <th className="px-4 py-2 border">QR Code</th>
                    <th className="px-4 py-2 border">Thời gian chiếu</th>
                    <th className="px-4 py-2 border">Rạp</th>
                    <th className="px-4 py-2 border">Màn hình</th>
                    <th className="px-4 py-2 border">Ghế</th>
                    <th className="px-4 py-2 border">Họ tên</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Số điện thoại</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => {
                    const {
                      booking_id,
                      payment_method,
                      payment_status,
                      amount,
                      Booking,
                      User,
                    } = payment;

                    const seats =
                      Booking?.BookingSeats?.map(
                        (bs) => bs.Seat?.seat_number
                      ).join(", ") || "Chưa có";

                    const theaterName =
                      Booking?.Showtime?.Screen?.Theater?.name || "Chưa có";
                    return (
                      <tr key={payment.payment_id} className="text-center">
                        <td className="px-4 py-2 border">{booking_id}</td>
                        <td className="px-4 py-2 border">{payment_method}</td>
                        <td className="px-4 py-2 border">
                          {payment_status === "pending"
                            ? "Đang chờ"
                            : payment_status === "completed"
                            ? "Hoàn tất"
                            : payment_status === "failed"
                            ? "Thất bại"
                            : payment_status}
                        </td>
                        <td className="px-4 py-2 border">
                          {Number(amount).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>

                        <td className="px-4 py-2 border">{Booking?.qr_code}</td>
                        <td className="px-4 py-2 border">
                          {Booking?.Showtime?.show_time
                            ? new Date(
                                Booking.Showtime.show_time
                              ).toLocaleString()
                            : "Chưa có"}
                        </td>
                        <td className="px-4 py-2 border">{theaterName}</td>
                        <td className="px-4 py-2 border">
                          {Booking?.Showtime?.Screen?.screen_name || "Chưa có"}
                        </td>
                        <td className="px-4 py-2 border">{seats}</td>
                        <td className="px-4 py-2 border">{User?.full_name}</td>
                        <td className="px-4 py-2 border">{User?.email}</td>
                        <td className="px-4 py-2 border">
                          {User?.phone_number || "Chưa có"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPayment;
