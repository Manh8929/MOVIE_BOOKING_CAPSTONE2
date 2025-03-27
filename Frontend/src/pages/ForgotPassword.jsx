import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email gửi yêu cầu đặt lại mật khẩu:", email);
    // Gửi yêu cầu đặt lại mật khẩu tới backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-red-900">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2 text-center">Đặt lại mật khẩu</h2>
        <p className="text-gray-600 text-center mb-6">
          Vui lòng nhập địa chỉ email của bạn vào ô bên dưới để thiết lập lại mật khẩu.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="balamia@gmail.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition duration-300"
          >
            Lấy lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
