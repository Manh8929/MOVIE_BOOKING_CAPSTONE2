import React, { useState } from "react";
import bach_tuyet_img from "../../src/assets/img/poster_schedule/bach_tuyet.jpg";
import sathu_img from "../../src/assets/img/poster_schedule/sat_thu_vo_cung_cuc.jpg";
import anh_khong_dau from "../../src/assets/img/poster_schedule/anh_khong_dau.jpg";
import quy_nhap_trang from "../../src/assets/img/poster_schedule/quy_nhap_trang.jpg";

const MovieSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(0);

  const dates = [
    { day: "Chủ nhật", date: "23" },
    { day: "Thứ 2", date: "24" },
    { day: "Thứ 3", date: "25" },
    { day: "Thứ 4", date: "26" },
    { day: "Thứ 5", date: "27" },
    { day: "Thứ 6", date: "28" },
    { day: "Thứ 7", date: "29" },
  ];

  const movies = [
    {
      title: "(Lồng tiếng) Nàng Bạch Tuyết (P)",
      poster: bach_tuyet_img,
      showtimes: [
        { time: "09:50-11:40", room: "02" },
        { time: "13:20-15:10", room: "02" },
        { time: "15:10-17:00", room: "01" },
        { time: "17:00-18:50", room: "03" },
        { time: "19:00-20:50", room: "03" },
      ],
    },
    {
      title: "(Lồng tiếng) Sát thủ vô cùng cực hài (T16)",
      poster: sathu_img,
      showtimes: [
        { time: "09:30-11:17", room: "05" },
        { time: "12:00-13:47", room: "05" },
        { time: "14:00-15:47", room: "05" },
        { time: "16:00-17:47", room: "05" },
        { time: "18:00-19:47", room: "05" },
        { time: "20:00-21:47", room: "05" },
        { time: "22:00-23:47", room: "05" },
      ],
    },
    {
      title: "ANH KHÔNG ĐAU (T18)",
      poster: anh_khong_dau,
      showtimes: [
        { time: "09:30-11:17", room: "05" },
        { time: "12:00-13:47", room: "05" },
        { time: "14:00-15:47", room: "05" },
        { time: "16:00-17:47", room: "05" },
        { time: "18:00-19:47", room: "05" },
        { time: "20:00-21:47", room: "05" },
        { time: "22:00-23:47", room: "05" },
      ],
    },
    {
      title: "QUỶ NHẬP TRÀNG (T18)",
      poster: quy_nhap_trang,
      showtimes: [
        { time: "09:30-11:17", room: "05" },
        { time: "12:00-13:47", room: "05" },
        { time: "14:00-15:47", room: "05" },
        { time: "16:00-17:47", room: "05" },
      ],
    },
  ];

  return (
    <div className="mt-[80px] w-full min-h-screen bg-gradient-to-br from-black via-black to-[#4f111e] text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-[#E45E2F] font-bold border-b-2 border-orange-500 pb-4 mb-8 uppercase tracking-wide">
          Lịch chiếu
        </h2>

        <div className="bg-[#FCF8F1] p-6 rounded-lg shadow-md mb-10">
            <p className="text-xl font-semibold text-[#333]">
              Chọn ngày chiếu
            </p>
            <p className="text-2xl font-semibold text-[#333] mb-4 text-centert text-center">Tháng 3</p>
          <div className="flex flex-wrap gap-6 justify-center">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`min-w-[100px] text-center cursor-pointer transition-all duration-300 border border-orange-300 rounded-lg px-5 py-4 shadow-sm hover:scale-105 ${
                  selectedDate === index
                    ? "bg-orange-500 text-white font-semibold"
                    : "bg-white text-black"
                }`}
                onClick={() => setSelectedDate(index)}
              >
                <p className="text-sm">{date.day}</p>
                <p className="mt-2 text-2xl font-bold">{date.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phim & suất chiếu */}
        <div className="space-y-10">
          {movies.map((movie, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{movie.title}</h3>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <img
                  src={movie.poster}
                  alt="Poster"
                  className="w-32 h-48 object-cover rounded shadow mx-auto md:mx-0"
                />

                {/* Showtimes tự động xuống hàng */}
                <div className="flex flex-wrap gap-4 items-center">
                  {movie.showtimes.map((show, idx) => (
                    <div
                      key={idx}
                      className="border p-3 rounded hover:bg-orange-500 hover:text-white cursor-pointer transition min-w-[140px] text-center"
                    >
                      <p className="font-medium">{show.time}</p>
                      <p className="text-sm mt-1">Phòng chiếu {show.room}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSchedule;
