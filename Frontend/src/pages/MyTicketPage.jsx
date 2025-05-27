import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { toJpeg } from "html-to-image";
import { getMovieDetail } from "../services/movieService";
import { getUserPayments } from "../services/userService";

const MyTicketPage = () => {
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");
  const [ticketCode, setTicketCode] = useState("");
  const theaterName = localStorage.getItem("selectedTheaterName");
  const [isQRVisible, setIsQRVisible] = useState(false);
  const ticketRef = useRef(null);

  const downloadImage = () => {
    if (!ticketRef.current) return;

    toJpeg(ticketRef.current, { quality: 1, backgroundColor: "black" })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "my_ticket.jpg";
        link.click();
      })
      .catch((error) => console.error("Lỗi khi tạo ảnh:", error));
  };
  useEffect(() => {
    const movieId = localStorage.getItem("selectedMovieId");
    const selectedTime = localStorage.getItem("selectedTime");
    const seats = localStorage.getItem("selectedSeatsName") || "";
    const currentUserStr = localStorage.getItem("currentUser");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
    const userId = currentUser?.user_id;

    const token = localStorage.getItem("token");
    const fetchInfo = async () => {
      try {
        if (userId && token) {
          const payments = await getUserPayments(userId, token);
          if (payments.length > 0) {
            const latestPayment = payments[0];
            console.log("Latest payment:", latestPayment);
            setTicketCode(latestPayment.booking_id?.toString() || "N/A");
          }
        }
        // Lấy thông tin phim
        if (movieId) {
          const movie = await getMovieDetail(movieId);
          setMovieName(movie?.title || "Không rõ tên phim");
        }
        if (seats) {
          const seatArray = seats.split(/[, ]+/).filter(Boolean);
          setSelectedSeats(seatArray.join(", "));
        } else {
          setSelectedSeats("");
        }

        // Chuyển định dạng thời gian
        if (selectedTime) {
          const dateVN = new Date(selectedTime);

          // Lấy giờ bắt đầu
          const startHour = dateVN.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Ho_Chi_Minh",
          });

          const dateString = dateVN.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Asia/Ho_Chi_Minh",
          });

          setFormattedDate(dateString);
          setFormattedTime(`${startHour}`);
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin:", err);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div
      ref={ticketRef}
      className="min-h-screen bg-gradient-to-br from-black via-black to-[#4f111e] text-white flex flex-col"
    >
      <h1 className="font-bold text-center mt-36 text-3xl md:text-4xl mb-10">
        Thông tin chi tiết
      </h1>
      <div className="w-full flex justify-center">
        <div className="border border-gray-600 rounded-2xl p-8 w-full max-w-xl bg-black bg-opacity-50 mx-auto shadow-2xl backdrop-blur-md">
          <div className="space-y-6">
            <div>
              <p className="text-gray-400 text-sm">Ngày</p>
              <p className="font-semibold text-lg">{formattedDate}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Tên Phim</p>
              <p className="font-semibold text-lg">{movieName}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Rạp</p>
              <p className="font-semibold text-lg">{theaterName}</p>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">Vé (3)</p>
                <p className="font-semibold text-lg">
                  {selectedSeats || "Chưa chọn ghế"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Thời gian</p>
                <p className="font-semibold text-lg">{formattedTime}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Mã vé</p>
              <p className="font-bold text-xl tracking-widest text-yellow-400">
                {ticketCode}
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mt-4">
              <div
                className="p-3 bg-white rounded-xl shadow-lg cursor-pointer"
                onClick={() => setIsQRVisible(true)}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${ticketCode}`}
                  alt="QR Code"
                  className="rounded"
                />
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadImage}
            className="w-full bg-[#E63946] hover:bg-[#c12d38] text-white py-3 rounded-xl mt-8 font-semibold transition duration-300"
          >
            Tải xuống
          </button>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-10 mb-[80px] border border-gray-600 rounded-xl px-10 py-4 hover:bg-[#db767e] hover:text-black transition mx-auto text-lg font-medium"
      >
        Về trang chủ
      </button>
      {/* QR Code Modal */}
      {isQRVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
          onClick={() => setIsQRVisible(false)}
        >
          <div className="p-8 bg-white rounded-xl shadow-lg relative">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${ticketCode}`}
              alt="QR Code"
              className="rounded"
            />
            <button
              className="absolute top-1 right-2 text-black text-xl font-bold"
              onClick={() => setIsQRVisible(false)}
            >
              <IoMdClose
                size={32}
                className="text-red-600 hover:text-red-800 transition duration-300"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTicketPage;
