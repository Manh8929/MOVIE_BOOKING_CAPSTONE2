import React, { useEffect, useState, useRef } from "react";
import { getUserPayments } from "../../services/userService";
import moment from "moment";
import "moment/locale/vi";
import { toJpeg } from "html-to-image";

const MyTicketHisComponent = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedQR, setSelectedQR] = useState(null); // Dùng để phóng to QR
  const ticketRefs = useRef({}); // Để tạo ảnh tải xuống

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const userId = currentUser?.user_id;

      if (!token || !userId) return;

      try {
        const payments = await getUserPayments(userId, token);
        const now = new Date();

        // Lọc vé có showtime < hiện tại (vé đã qua)
        const pastTickets = payments.filter((payment) => {
          const showTime = new Date(payment.Booking?.Showtime?.show_time);
          return showTime < now;
        });

        setTickets(pastTickets);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách vé:", error);
      }
    };

    fetchTickets();
  }, []);

  const downloadTicket = (id) => {
    const node = ticketRefs.current[id];
    if (!node) return;

    toJpeg(node, { quality: 1, backgroundColor: "black" })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `ticket_${id}.jpg`;
        link.click();
      })
      .catch((err) => console.error("Lỗi khi tải ảnh vé:", err));
  };

  return (
    <div className="mt-[100px] min-h-[400px]">
      {tickets.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">Bạn chưa có vé nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {tickets.map((ticket) => {
            const showTime = new Date(ticket.Booking?.Showtime?.show_time);
            const formattedDate = moment(showTime).locale("vi").format("dddd, DD/MM/YYYY");
            const formattedTime = moment(showTime).format("HH:mm");

            const seatNumbers = ticket.Booking?.BookingSeats?.map(
              (seatObj) => seatObj.Seat?.seat_number
            ).join(", ");

            const ticketCode = ticket.booking_id ? ticket.booking_id.toString() : "N/A";

            return (
              <div
                key={ticket.payment_id}
                ref={(el) => (ticketRefs.current[ticket.payment_id] = el)}
                className="border border-gray-500 rounded-xl p-6 w-full max-w-sm bg-black bg-opacity-40 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <p className="text-gray-400 text-sm mb-1">Ngày</p>
                  <p className="font-semibold mb-4 capitalize">{formattedDate}</p>

                  <p className="text-gray-400 text-sm mb-1">Tên phim</p>
                  <p className="font-semibold mb-4">
                    {ticket.Booking?.Showtime?.Movie?.title || "Tên phim không rõ"}
                  </p>

                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-gray-400 text-sm">Vé ({ticket.Booking?.BookingSeats?.length})</p>
                      <p className="font-semibold">{seatNumbers}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Giờ</p>
                      <p className="font-semibold">{formattedTime}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Mã vé</p>
                    <p className="font-bold text-lg tracking-widest text-yellow-400">{ticketCode}</p>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <div
                    className="p-2 bg-white rounded-xl cursor-pointer hover:scale-105 transition"
                    onClick={() => setSelectedQR(ticketCode)}
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${ticketCode}`}
                      alt="QR Code"
                      className="rounded"
                    />
                  </div>
                </div>

                <button
                  onClick={() => downloadTicket(ticket.payment_id)}
                  className="w-full bg-[#7A1C1C] hover:bg-[#E63946] text-white py-2 rounded-lg mt-6"
                >
                  Tải vé
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal phóng to QR */}
      {selectedQR && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-red-600 text-xl font-bold"
              onClick={() => setSelectedQR(null)}
            >
              ×
            </button>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${selectedQR}`}
              alt="Phóng to QR Code"
              className="w-[300px] h-[300px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTicketHisComponent;
