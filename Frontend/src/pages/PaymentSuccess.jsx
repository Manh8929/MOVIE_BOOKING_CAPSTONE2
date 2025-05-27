import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdConfirmationNumber } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const orderCode = queryParams.get("orderCode");

  const handleViewTicket = () => {
    if (orderCode) {
      localStorage.setItem("paymentId", orderCode);
    }
    navigate("/my-ticket");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] text-white">
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg text-center animate-fade-in">
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">Thanh toán thành công</h1>
          <FaCheckCircle className="text-green-400 text-4xl mb-4" />
        </div>
        <p className="text-lg mb-6 text-gray-300">
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleViewTicket}
            className="bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 hover:bg-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <MdConfirmationNumber className="text-xl" />
            Xem chi tiết vé
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 hover:bg-red-700 hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <AiOutlineHome className="text-xl" />
            Trở về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
