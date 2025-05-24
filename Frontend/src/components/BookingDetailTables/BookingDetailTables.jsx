import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieDetail } from "../../services/movieService";

const BookingDetailTables = () => {
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [formattedPrice, setFormattedPrice] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");

  const theaterName = localStorage.getItem("selectedTheaterName");

  useEffect(() => {
    const movieId = localStorage.getItem("selectedMovieId");
    const selectedTime = localStorage.getItem("selectedTime");
    const totalPrice = localStorage.getItem("totalPrice");
    const seats = localStorage.getItem("selectedSeatsName") || "";

    const fetchInfo = async () => {
      try {
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

        // Định dạng giá tiền
        if (totalPrice) {
          const price = Number(totalPrice);
          const formatted = price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
          setFormattedPrice(formatted);
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin:", err);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div className="min-h-screen p-6 text-white flex justify-center items-center bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] shadow-lg">
      <div className="w-[100%] sm:w-[60%] min-h-[660px] bg-black border-white border-double border-8 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6">
          Thông tin đặt vé
        </h1>
        <fieldset className="border-dashed border-2 border-white p-6 rounded min-h-[460px] w-full text-center">
          <legend className="text-2xl font-bold">Nội Dung Thanh Toán</legend>
          <div className="mt-[4%] space-y-3 text-xl">
            <p>
              <strong>Phim:</strong> {movieName}
            </p>
            <p className="mt-6">
              <strong>Rạp:</strong> {theaterName}
            </p>
            <p className="mt-6">
              <strong>Ngày:</strong> {formattedDate}
            </p>
            <p className="mt-6">
              <strong>Thời gian:</strong> {formattedTime}
            </p>
            <p className="mt-6">
              <strong>Ghế:</strong> {selectedSeats || "Chưa chọn ghế"}
            </p>
            <p className="mt-6">
              <strong>Tổng tiền:</strong> {formattedPrice}
            </p>
          </div>
        </fieldset>
        <button
          type="submit"
          onClick={() => navigate("/payment")}
          className="mt-6 bg-red-600 px-8 py-3 rounded-lg text-white font-semibold hover:bg-red-700 transition-transform transform hover:-translate-y-3"
        >
          Tiếp Tục
        </button>
      </div>
    </div>
  );
};

export default BookingDetailTables;
