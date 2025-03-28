import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilmImg from "../assets/img/film/phim1.jpg";

const MovieDetail = () => {
  const [selectedDate, setSelectedDate] = useState("22 Oct");
  const [selectedTime, setSelectedTime] = useState("15:40");
  const navigate = useNavigate();
  const [rating, setRating] = useState(4);

  const dates = [
    "22 tháng 3",
    "23 tháng 3",
    "24 tháng 3",
    "25 tháng 3",
    "26 tháng 3",
  ];
  const times = ["15:40", "16:30", "18:00", "20:15"];
  const reviews = [
    { name: "Lịch", comment: "Phim tuyệt vời! Phải xem.", rating: 5 },
    { name: "Mạnh", comment: "Hoạt hình và cốt truyện tuyệt vời.", rating: 4 },
    { name: "Sung", comment: "Có thể hay hơn, nhưng vẫn hay!", rating: 3 },
  ];

  return (
    <div className="mt-[80px] min-h-screen bg-gradient-to-r from-red-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Chi tiết phim</h1>

        <div className="flex gap-6">
          {/* Movie Poster */}
          <img
            src={FilmImg}
            alt="Movie Poster"
            className="w-48 h-72 rounded-lg shadow-lg"
          />

          {/* Movie Info */}
          <div>
            <h2 className="text-2xl font-semibold">Nhà gia tiên</h2>
            <p className="text-gray-300 mt-2">Thời gian: 98 phút</p>
            <p className="text-gray-300">Thẻ Loại: Hài</p>

            {/* Rating System */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Đánh giá</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl cursor-pointer ${
                      star <= rating ? "text-yellow-400" : "text-gray-500"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <p className="text-sm m-2">3 lượt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Ngày</h3>
          <div className="flex gap-3 mt-2">
            {dates.map((date) => (
              <button
                key={date}
                className={`px-4 py-2 border rounded-lg ${
                  selectedDate === date
                    ? "bg-[#E63946] text-white"
                    : "border-gray-400"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Khung Giờ</h3>
          <div className="flex gap-3 mt-2">
            {times.map((time) => (
              <button
                key={time}
                className={`px-4 py-2 border rounded-lg ${
                  selectedTime === time
                    ? "bg-[#E63946] text-white"
                    : "border-gray-400"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/booking-movie")}
            className="px-6 py-3 bg-[#E63946] text-white rounded-lg text-lg font-semibold hover:bg-transparent hover:border-gray-400 hover:border"
          >
            Đặt vé
          </button>
        </div>

        {/* User Reviews */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Đánh Giá của người xem</h3>
          <div className="mt-4 space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold">{review.name}</h4>
                <p className="text-gray-300">{review.comment}</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
