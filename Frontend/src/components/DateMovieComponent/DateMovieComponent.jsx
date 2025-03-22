import React, { useState, useEffect } from "react";
import { BiCalendar, BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DateMovieComponent = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    const movieTimes = ["10:00", "13:00", "16:00", "19:00", "21:00"];

    const getUpcomingDays = () => {
        const days = [];
        const now = new Date();
        for (let i = 0; i < 7; i++) {
            const futureDate = new Date(now);
            futureDate.setDate(now.getDate() + i);
            days.push(futureDate.toISOString().split("T")[0]);
        }
        return days;
    };

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        setSelectedDate(new Date().toISOString().split("T")[0]);
        return () => clearInterval(interval);
    }, []);

    const getAvailableMovieTimes = () => {
        if (!selectedDate) return movieTimes;

        const now = new Date();
        const selectedDay = new Date(selectedDate);

        if (selectedDay.toDateString() !== now.toDateString()) return movieTimes;

        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        return movieTimes.filter(time => {
            const [hour, minutes] = time.split(":").map(Number);
            return hour > currentHour || (hour === currentHour && minutes > currentMinutes);
        });
    };

    const handleContinue = () => {
        if (!selectedTime) {
            toast.error("Vui lòng chọn giờ chiếu!", { position: "top-right" });
            return;
        }
        toast.success("Đang chuyển hướng ...", { position: "top-right" });
        setTimeout(()=>{
            navigate("/seat-select");
        },2000)
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] text-white min-h-screen">
            <ToastContainer />
            <h2 className="text-3xl font-bold">Chọn Ngày & Giờ Chiếu</h2>

            <div className="flex flex-col items-center gap-2">
                <label className="text-lg flex items-center gap-2">
                    Chọn Ngày:
                </label>
                <div className="flex gap-3 flex-wrap justify-center">
                    {getUpcomingDays().map((day, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedDate(day)}
                            className={`px-4 py-2 rounded-lg cursor-pointer ${selectedDate === day ? "bg-red-500" : "bg-gray-600"
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
                    {getAvailableMovieTimes().length > 0 ? (
                        getAvailableMovieTimes().map((time, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedTime(time)}
                                className={`px-4 py-2 rounded-lg cursor-pointer ${selectedTime === time ? "bg-red-500 text-white" : "bg-gray-600"
                                    }`}
                            >
                                {time}
                            </button>
                        ))
                    ) : (
                        <p className="text-red-400">Không còn suất chiếu trong hôm nay!</p>
                    )}
                </div>
            </div>

            {selectedDate && selectedTime && (
                <p className="text-lg mt-4 flex items-center gap-2">
                    <BiCalendar className="text-xl" /> Ngày xem: <strong>{new Date(selectedDate).toLocaleDateString("vi-VN")}</strong> |
                    <BiTimeFive className="text-xl" /> Giờ chiếu: <strong>{selectedTime}</strong>
                </p>
            )}

            <p className="text-lg mt-2">
                Thời gian hiện tại: <strong>{currentTime.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</strong>
            </p>

            <button
                onClick={handleContinue}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:translate-y-3">
                Tiếp tục
            </button>
        </div>
    );
};

export default DateMovieComponent;
