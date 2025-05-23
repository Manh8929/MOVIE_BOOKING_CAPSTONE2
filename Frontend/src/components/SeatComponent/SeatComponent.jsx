import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as userService from "../../services/userService";
import { useEffect } from "react";
const SeatComponent = ({ showtime }) => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [seatTypes, setSeatTypes] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatList = await userService.getSeatsByShowtime(
          showtime?.showtime_id
        );
        console.log("seatList", seatList);

        setSeats(seatList);
      } catch (error) {
        toast.error("Không thể tải danh sách ghế");
      }
    };

    if (showtime?.showtime_id) {
      fetchSeats();
    }
  }, [showtime]);

  useEffect(() => {
    const fetchSeatTypes = async () => {
      try {
        const data = await userService.getSeatTypes();
        console.log("dataaaaa", data.seatTypes);
        setSeatTypes(data.seatTypes); // data là mảng [{ name, price }]
      } catch (err) {
        toast.error("Không thể tải giá ghế");
      }
    };

    fetchSeatTypes();
  }, []);
  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleNext = () => {
    if (selectedSeats.length === 0) {
      toast.error("Vui lòng chọn ghế trước khi tiếp tục!");
      return;
    }
    toast.success("Đang chuyển hướng ...");
    setTimeout(() => {
      navigate("/booking-detail", { state: { selectedSeats } });
    }, 2000);
  };
  const renderSeat = (seat) => {
    const isSelected = selectedSeats.includes(seat.seat_id);
    const isBooked = seat.is_booked;
    const isAvailable = seat.is_available;
    const isDisabled = isBooked || !isAvailable;

    // Định nghĩa style theo loại ghế
    let baseClass = "";
    switch (seat.seat_type) {
      case "vip":
        baseClass = "w-12 h-10 text-black";
        break;
      case "couple":
        baseClass = "w-20 h-10 text-white";
        break;
      default:
        baseClass = "w-10 h-10 text-white";
    }

    // Ghi đè màu sắc theo trạng thái
    const bgColor = isDisabled
      ? "bg-gray-500 cursor-not-allowed"
      : isSelected
      ? "bg-red-400"
      : seat.seat_type === "vip"
      ? "bg-yellow-300"
      : seat.seat_type === "couple"
      ? "bg-pink-500"
      : "bg-purple-500";

    return (
      <div
        key={seat.seat_id}
        onClick={() => {
          if (!isDisabled) toggleSeat(seat.seat_id);
        }}
        className={`flex items-center justify-center rounded cursor-pointer font-semibold text-sm ${baseClass} ${bgColor}`}
      >
        {seat.seat_number}
      </div>
    );
  };

  // Phân loại ghế
  const regularSeats = seats.filter((s) => s.seat_type === "regular");
  const vipSeats = seats.filter((s) => s.seat_type === "vip");
  const coupleSeats = seats.filter((s) => s.seat_type === "couple");

  const calculateTotalPrice = () => {
    const selectedSeatObjects = seats.filter((seat) =>
      selectedSeats.includes(seat.seat_id)
    );

    let total = 0;
    for (const seat of selectedSeatObjects) {
      const seatType = seatTypes.find((type) => type.name === seat.seat_type);
      if (seatType) {
        total += Number(seatType.price);
      }
    }

    return total;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] text-white min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold">Chọn Ghế Ngồi</h2>
      {/* Bảng giá ghế ngồi */}
      <div className="w-full max-w-2xl grid grid-cols-3 gap-4 mt-4 text-sm text-white">
        {seatTypes.map((type) => {
          const color =
            type.name === "vip"
              ? "bg-yellow-300"
              : type.name === "couple"
              ? "bg-pink-500"
              : "bg-purple-500";

          const bgWrap =
            type.name === "vip"
              ? "bg-yellow-500/30"
              : type.name === "couple"
              ? "bg-pink-600/30"
              : "bg-purple-700/30";

          return (
            <div
              key={type.name}
              className={`flex items-center gap-3 ${bgWrap} px-4 py-2 rounded-xl shadow`}
            >
              <div className={`w-4 h-4 rounded ${color}`}></div>
              <div className="flex flex-col">
                <span className="font-medium capitalize">Ghế {type.name}</span>
                <span className="text-xs opacity-80">
                  {Number(type.price).toLocaleString()}đ
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mô tả ghế */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-purple-500 rounded"></div>
          <span>Ghế Thường</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-yellow-300 rounded"></div>
          <span>Ghế VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-pink-500 rounded"></div>
          <span>Ghế Đôi (Couple)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-400 rounded"></div>
          <span>Ghế Đang Chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-500 rounded"></div>
          <span>Ghế Đã Đặt</span>
        </div>
      </div>

      {/* Màn hình chiếu */}
      <div className="w-3/4 bg-gray-600 text-center py-2 rounded mb-4">
        MÀN HÌNH
      </div>

      {/* Sơ đồ ghế */}
      {/* Ghế Thường */}
      <div className="w-3/6 flex justify-center">
        <div className="grid grid-cols-10 gap-3">
          {regularSeats.map((seat) => renderSeat(seat, "bg-green-500"))}
        </div>
      </div>

      {/* Ghế VIP */}
      <div className="w-3/6 flex justify-center">
        <div className="grid grid-cols-10 gap-3">
          {vipSeats.map((seat) =>
            renderSeat(seat, "bg-yellow-300 w-12 h-12 text-black")
          )}
        </div>
      </div>

      {/* Couple */}
      <div className="w-3/6">
        <div className="flex gap-6 items-center justify-center">
          {coupleSeats.map((seat, idx) =>
            idx % 2 === 0 ? (
              <div key={seat.seat_id} className="flex gap-2">
                {renderSeat(seat, "bg-pink-500 w-14 h-10")}
                {coupleSeats[idx + 1] &&
                  renderSeat(coupleSeats[idx + 1], "bg-pink-500 w-14 h-10")}
              </div>
            ) : null
          )}
        </div>
      </div>
      {/* Tổng giá tiền */}
      {selectedSeats.length > 0 && (
        <div className="text-xl font-semibold text-white">
          Tổng tiền:{" "}
          <span className="text-yellow-300">
            {calculateTotalPrice().toLocaleString()}đ
          </span>
        </div>
      )}
      {/* Nút đặt vé */}
      <button
        onClick={handleNext}
        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:translate-y-3"
      >
        Đặt vé
      </button>
    </div>
  );
};

export default SeatComponent;
