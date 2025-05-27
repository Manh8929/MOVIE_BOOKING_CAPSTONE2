import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage("Không tìm thấy token trong URL.");
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("Token không hợp lệ.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu không khớp!");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await authService.resetPassword({
        token,
        newPassword,
        confirmPassword,
      });
      console.log('res',res);
      setMessage(res.message || "Đặt lại mật khẩu thành công!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800">Đặt lại mật khẩu</h2>
        {message && (
          <p className={`text-center ${message.includes("thành công") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu mới:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-150 ease-in-out shadow-md disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Quay lại <a href="/login" className="text-teal-600 hover:underline">đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
