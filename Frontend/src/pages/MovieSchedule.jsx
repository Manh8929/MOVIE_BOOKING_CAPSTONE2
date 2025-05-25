import React, { useState } from "react";
import bach_tuyet_img from "../../src/assets/img/poster_schedule/bach_tuyet.jpg";
import sathu_img from "../../src/assets/img/poster_schedule/sat_thu_vo_cung_cuc.jpg";
import anh_khong_dau from "../../src/assets/img/poster_schedule/anh_khong_dau.jpg";
import quy_nhap_trang from "../../src/assets/img/poster_schedule/quy_nhap_trang.jpg";
import { useNavigate } from "react-router-dom";
import * as movieService from "../services/movieService";
import { useEffect } from "react";
const MovieSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(0);
  const [movies, setMovies] = useState([]);
  console.log("movie", movies);
  const navigate = useNavigate();

  const [dates, setDates] = useState([]);

  useEffect(() => {
    const getNext7Dates = () => {
      const today = new Date();
      const days = [
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
      ];
      return Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
          day: days[date.getDay()],
          date: date.getDate().toString().padStart(2, "0"),
          fullDate: `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
        };
      });
    };

    setDates(getNext7Dates());
  }, []);

  // Hàm fetchMovies
  const fetchMovies = async (dateStr) => {
    try {
      const result = await movieService.getMoviesByDate(dateStr);
      console.log('reeeee',result);
      setMovies(result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách phim theo ngày:", err);
    }
  };

  useEffect(() => {
    if (dates.length === 0) return;

    // Gọi fetchMovies cho ngày được chọn
    const dateStr = dates[selectedDate]?.fullDate;
    fetchMovies(dateStr);
  }, [selectedDate, dates]);

  // Gọi fetchMovies cho ngày hiện tại khi component mount
  useEffect(() => {
    if (dates.length > 0) {
      const dateStr = dates[selectedDate]?.fullDate;
      fetchMovies(dateStr);
    }
  }, [dates]);

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  // Lấy tháng hiện tại
  const currentMonth = months[new Date().getMonth()];
  return (
    <div className="mt-[80px] w-full min-h-screen bg-gradient-to-br from-black via-black to-[#4f111e] text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-[#E45E2F] font-bold border-b-2 border-orange-500 pb-4 mb-8 uppercase tracking-wide">
          Lịch chiếu
        </h2>

        <div className="bg-[#FCF8F1] p-6 rounded-lg shadow-md mb-10">
          <p className="text-xl font-semibold text-[#333]">Chọn ngày chiếu</p>
          <p className="text-2xl font-semibold text-[#333] mb-4 text-centert text-center">
            {currentMonth}
          </p>
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
                  className="w-32 h-48 object-cover rounded shadow mx-auto md:mx-0 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  onClick={() => navigate(`/detail-film/${movie.movie_id}`)}
                />

                {/* Showtimes tự động xuống hàng */}
                <div className="flex flex-wrap gap-4 items-center">
                  {movie.showtimes.map((show, idx) => (
                    <div
                      onClick={() =>
                        navigate(`/seat-select`, {
                          state: {
                            showtime: show,
                            movie: movie, // Gửi thông tin phim
                            theater: { name: show.theater }, // Giả sử bạn có thông tin về rạp
                          },
                        })
                      }
                      key={idx}
                      className="border p-3 rounded hover:bg-orange-500 hover:text-white cursor-pointer transition min-w-[140px] text-center"
                    >
                      <p className="font-medium">{show.time}</p>
                      <p className="text-sm mt-1">Rạp {show.theater}</p>
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
