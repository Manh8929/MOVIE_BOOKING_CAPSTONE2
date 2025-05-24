import React, { useState, useEffect } from "react";
import { BiCalendar, BiTimeFive } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as userService from "../../services/userService";
import "react-toastify/dist/ReactToastify.css";
const DateMovieComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, theater } = location.state || {};
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!movie || !theater) {
      toast.error("Thiếu thông tin phim hoặc rạp chiếu!");
      navigate("/"); // quay về trang chính nếu thiếu dữ liệu
    }
  }, [movie, theater, navigate]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchShowtimes = async () => {
      if (!selectedDate || !movie?.movie_id || !theater?.theater_id) {
        console.warn("Thiếu dữ liệu:", {
          selectedDate,
          movieId: movie?.movie_id,
          theaterId: theater?.theater_id,
        });
        return;
      }

      try {
        const result = await userService.getShowtimesByMovieTheaterDate(
          movie.movie_id,
          theater.theater_id,
          selectedDate
        );
        console.log("⏱ Showtimes từ API:", result);
        setShowtimes(result);
        setSelectedShowtime(null);
      } catch (err) {
        console.error(
          "❌ Lỗi khi gọi API:",
          err.response?.data || err.message || err
        );
        toast.error("Không thể tải lịch chiếu.");
        setShowtimes([]);
      }
    };

    fetchShowtimes();
  }, [selectedDate, movie, theater]);

  useEffect(() => {
    console.log("Showtimes state updated:", showtimes);
  }, [showtimes]);

  const getUpcomingDays = () => {
    const days = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isToday = (dateStr) => {
    const todayStr = new Date().toISOString().split("T")[0];
    return dateStr === todayStr;
  };

  const filteredShowtimes = showtimes.filter((st) => {
    const showTimeUTC = new Date(st.show_time); // show_time là UTC
    const now = new Date();

    if (!isToday(selectedDate)) return true;
    return showTimeUTC.getTime() > now.getTime(); // so sánh trực tiếp UTC
  });

  const handleContinue = () => {
    if (!selectedShowtime) {
      toast.error("Vui lòng chọn suất chiếu!", { position: "top-right" });
      return;
    }

    toast.success("Đang chuyển hướng...", { position: "top-right" });
    localStorage.setItem("selectedTime", selectedShowtime.show_time);

    setTimeout(() => {
      navigate("/seat-select", {
        state: { showtime: selectedShowtime, movie, theater },
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] text-white min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold">Chọn Ngày & Giờ Chiếu</h2>

      <div className="flex flex-col items-center gap-2">
        <label className="text-lg flex items-center gap-2">Chọn Ngày:</label>
        <div className="flex gap-3 flex-wrap justify-center">
          {getUpcomingDays().map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(day)}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                selectedDate === day ? "bg-red-500" : "bg-gray-600"
              }`}
            >
              {new Date(day).toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <label className="text-lg flex items-center gap-2">
          Chọn Giờ Chiếu:
        </label>
        <div className="flex gap-3 flex-wrap justify-center">
          {filteredShowtimes.length > 0 ? (
            filteredShowtimes.map((st) => (
              <button
                key={st.showtime_id}
                onClick={() => setSelectedShowtime(st)}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  selectedShowtime?.showtime_id === st.showtime_id
                    ? "bg-red-500"
                    : "bg-gray-600"
                }`}
              >
                {formatTime(st.show_time)}
              </button>
            ))
          ) : (
            <p className="text-red-400">Không có suất chiếu nào!</p>
          )}
        </div>
      </div>

      {selectedDate && selectedShowtime && (
        <p className="text-lg mt-4 flex items-center gap-2">
          <BiCalendar className="text-xl" /> Ngày xem:{" "}
          <strong>{new Date(selectedDate).toLocaleDateString("vi-VN")}</strong>{" "}
          |
          <BiTimeFive className="text-xl" /> Giờ chiếu:{" "}
          <strong>{formatTime(selectedShowtime.show_time)}</strong>
        </p>
      )}

      <p className="text-lg mt-2">
        Thời gian hiện tại:{" "}
        <strong>
          {currentTime.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </strong>
      </p>

      <button
        onClick={handleContinue}
        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:translate-y-3"
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default DateMovieComponent;
