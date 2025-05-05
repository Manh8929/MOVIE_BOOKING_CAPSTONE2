import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import * as authService from "../services/authService";

const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {icon}
    </div>
  </div>
);

const RegisterBanner = () => (
  <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-black to-red-900 text-white p-12 flex-col justify-center">
    <div className="max-w-md">
      <h1 className="text-3xl font-light italic mb-6">
        Tham gia ngay bây giờ và khám phá thế giới điện ảnh với chúng tôi!
      </h1>
    </div>
  </div>
);
const GenderDropdown = ({ id, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm mb-2">
      Giới tính
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
    >
      <option value="">Chọn giới tính</option>
      <option value="male">Nam</option>
      <option value="female">Nữ</option>
      <option value="other">Khác</option>
    </select>
  </div>
);
const RegisterPage = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      const newUser = await authService.registerUser(formData);
      console.log("newUser",newUser)
      toast.success(newUser.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error during registration:", error); // In chi tiết lỗi ra console
      if (error.response) {
        // Nếu lỗi trả về từ server
        toast.error(
          `Đăng ký thất bại: ${error.response.data.message || error.message}`
        );
      } else {
        // Nếu không có response từ server
        toast.error("Đăng ký thất bại, vui lòng thử lại!");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/auth/facebook`;
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <RegisterBanner />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Tạo tài khoản mới
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="full_name"
                label="Họ và tên"
                type="text"
                placeholder="Nguyễn Văn A"
                value={formData.full_name}
                onChange={handleInputChange}
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="balamia@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="password"
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleInputChange}
              />
              <InputField
                id="confirmPassword"
                label="Xác nhận mật khẩu"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GenderDropdown
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
              <InputField
                id="dob"
                label="Ngày sinh"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <InputField
              id="address"
              label="Địa chỉ"
              type="text"
              placeholder="Số nhà, đường, thành phố"
              value={formData.address}
              onChange={handleInputChange}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
                className="mr-2"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 cursor-pointer"
                onClick={() => setShowTerms(true)}
              >
                Tôi đồng ý với{" "}
                <span className="text-red-500 underline">
                  Điều khoản và điều kiện
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition duration-300"
            >
              Đăng ký
            </button>
          </form>
          <div className="mt-6 flex flex-col space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FaGoogle className="h-5 w-5 mr-2 text-red-500" /> Đăng nhập với
              Google
            </button>
            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FaFacebook className="h-5 w-5 mr-2 text-blue-500" /> Đăng nhập
              với Facebook
            </button>
          </div>
        </div>
      </div>
      {showTerms && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-lg font-bold mb-4">Điều khoản và điều kiện</h3>
            <p className="text-sm text-gray-700">
              Khi đăng ký tài khoản, bạn đồng ý tuân thủ các quy định sau:
              <ul className="list-disc list-inside mt-2">
                <li>Không sử dụng tài khoản vào mục đích phi pháp.</li>
                <li>Bảo mật thông tin đăng nhập của bạn.</li>
                <li>
                  Chúng tôi có quyền khóa tài khoản nếu phát hiện hành vi gian
                  lận.
                </li>
                <li>
                  Chính sách có thể thay đổi và bạn cần cập nhật thường xuyên.
                </li>
              </ul>
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowTerms(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => {
                  setAcceptedTerms(true);
                  setShowTerms(false);
                }}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;