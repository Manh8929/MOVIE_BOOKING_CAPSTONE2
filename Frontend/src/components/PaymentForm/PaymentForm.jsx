import React, { useState } from "react";
import logo from "../../assets/img/logo_movie.png"; 
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
 const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] text-white p-6">
      <img src={logo} alt="Logo" className="w-32 mb-6" />
      <h1 className="text-3xl font-bold mb-6 text-red-400">Thanh Toán</h1>
      <div className="bg-[#121212] p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6">Chọn phương thức thanh toán</h2>
        <div className="space-y-3 text-lg mt-4 mb-2">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked= {paymentMethod === "cash"}
              className="form-radio text-red-500"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Thanh toán bằng tiền mặt</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              value="App_Banking"
              checked= {paymentMethod === "App_Banking"}
              className="form-radio text-red-500"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Thanh toán qua App Banking</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              value="Card"
              className="form-radio text-red-500" 
              checked= {paymentMethod === "Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Thanh toán bằng visa Card</span>
          </label>
        </div>
        <button
          onClick={() => navigate("/payment-otp")}
          className="mt-6 bg-red-700 px-6 py-3 rounded-lg text-white font-semibold hover:bg-red-800 transition-transform transform hover:-translate-y-1"
        >
          Xác nhận Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;