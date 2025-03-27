import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import avartar1 from "../assets/img/avatar/sontungmtp.png"
import avartar2 from "../assets/img/avatar/jack.png"
import avartar3 from "../assets/img/avatar/bickphuong.png"

const InputField = ({ id, label, type, placeholder, value, onChange, icon }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm mb-2">{label}</label>
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

const LoginBanner = () => (
  <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-black to-red-900 text-white p-12 flex-col justify-center">
    <div className="max-w-md">
      <h1 className="text-3xl font-light italic mb-6">
        Chào mừng. Hãy bắt đầu cuộc phiêu lưu điện ảnh của bạn ngay bây giờ với nền tảng bản vé của chúng tôi!
      </h1>
    </div>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);

  const users = [
    { id: 1, email: "sontung123@gmail.com", password: "123456", avatar: avartar1 },
    { id: 2, email: "jack@gmail.com", password: "3trieu", avatar: avartar2 },
    { id: 3, email: "phuong@gmail.com", password: "123456", avatar: avartar3 }
  ];

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      toast.success('Đăng nhập thành công!');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 2000)
    } else {
      toast.error('Email hoặc mật khẩu không đúng!');
    }
  };


  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const PasswordIcon = () => (
    <button
      type="button"
      className="absolute inset-y-0 right-0 flex items-center pr-3"
      onClick={togglePasswordVisibility}
      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
    >
      {showPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <LoginBanner />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Đăng nhập vào tài khoản của bạn</h2>
          <form onSubmit={handleLogin}>
            <InputField id="email" label="Email" type="email" placeholder="balamia@gmail.com" value={formData.email} onChange={handleInputChange} />
            <InputField id="password" label="Password" type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" value={formData.password} onChange={handleInputChange} icon={<PasswordIcon />} />
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" id="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="mr-2" />
                Ghi nhớ đăng nhập
              </label>
              <a 
              onClick={()=>navigate('/forgotpassword')}
              href="#" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Quên Mật Khẩu?</a>
            </div>
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition duration-300">Login now</button>
          </form>
          <div className="mt-6 flex flex-col space-y-3">
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
              <FaGoogle className="h-5 w-5 mr-2 text-red-500" /> Đăng nhập với Google
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
              <FaFacebook className="h-5 w-5 mr-2 text-blue-500" /> Đăng nhập với Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
