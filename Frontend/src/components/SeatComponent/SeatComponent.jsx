import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SeatComponent = () => {
    const navigate = useNavigate();
    const rows = 8;
    const cols = 10;
    const coupleSeatsRow = rows - 1;

    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (row, col) => {
        const seatId = `${row}-${col}`;
        setSelectedSeats((prev) =>
            prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
        );
    };

    const handleNext = () => {
        if (selectedSeats.length === 0) {
            toast.error("Vui lòng chọn ghế trước khi tiếp tục!", { position: "top-right" });
            return;
        }
        toast.success("Đang chuyển hướng ...", { position: "top-right" });
        setTimeout(() => {
            navigate("/booking-detail");
        }, 2000)
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] text-white min-h-screen">
            <ToastContainer />
            <h2 className="text-3xl font-bold">Chọn Ghế Ngồi</h2>

            {/* Mô tả ghế */}
            <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-500 rounded"></div>
                    <span>Ghế Thường - <strong>75K</strong></span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-500 rounded"></div>
                    <span>Ghế Đôi - <strong>120K</strong></span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                    <span>Ghế Đang Chọn</span>
                </div>
            </div>

            {/* Màn hình chiếu */}
            <div className="w-3/4 bg-gray-600 text-center py-2 rounded">MÀN HÌNH</div>

            {/* Sơ đồ ghế */}
            <div className="grid gap-2">
                {Array.from({ length: rows }, (_, row) => {
                    const rowLabel = String.fromCharCode(65 + row); // A, B, C, ...

                    return (
                        <div key={row} className="flex items-center gap-3 justify-around">
                            {/* Hàng ghế */}
                            <div className={`grid grid-cols-10 gap-3 mt-2 ${row === coupleSeatsRow ? "justify-center" : ""}`}>
                                {Array.from({ length: cols }, (__, col) => {
                                    if (row === coupleSeatsRow && col % 2 === 0) {
                                        const seatId = `${row}-${col}`;
                                        const isSelected = selectedSeats.includes(seatId);

                                        return (
                                            <div
                                                key={col}
                                                onClick={() => toggleSeat(row, col)}
                                                className={`w-16 h-10 flex items-center justify-center rounded cursor-pointer col-span-2
                                                ${isSelected ? "bg-yellow-400" : "bg-red-500"}`}
                                            >
                                                {rowLabel}{col + 1}-{rowLabel}{col + 2}
                                            </div>
                                        );
                                    } else if (row === coupleSeatsRow && col % 2 !== 0) {
                                        return null;
                                    } else {
                                        const seatId = `${row}-${col}`;
                                        const isSelected = selectedSeats.includes(seatId);

                                        return (
                                            <div
                                                key={col}
                                                onClick={() => toggleSeat(row, col)}
                                                className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer
                                                ${isSelected ? "bg-yellow-400" : "bg-green-500"}`}
                                            >
                                                {rowLabel}{col + 1}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Nút đặt vé */}
            <button
                onClick={handleNext}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:translate-y-3">
                Đặt vé
            </button>
        </div>
    );
};

export default SeatComponent;
