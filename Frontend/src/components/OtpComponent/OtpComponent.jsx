import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpComponent = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setOtp(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp === "2003") {
            toast.success("Thanh toán thành công", { position: "top-right", autoClose: 3000 });
            setTimeout(() => navigate("/payment-success"), 3000);
        } else {
            toast.error("Sai mã OTP", { position: "top-right", autoClose: 3000 });
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] text-white">
            <h1 className="text-3xl font-bold mb-6">Nhập mã OTP</h1>
            <form onSubmit={handleSubmit} className="bg-[#121212] p-6 flex flex-col rounded-lg shadow-lg text-center">
                <input
                    type="text"
                    value={otp}
                    onChange={handleChange}
                    maxLength="4"
                    className="text-black text-center text-2xl font-bold p-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Nhập OTP"
                />
                <button
                    type="submit"
                    className="mt-4 bg-red-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-red-700 hover:scale-110 transition-transform duration-300"
                >
                    Xác Nhận
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default OtpComponent;
