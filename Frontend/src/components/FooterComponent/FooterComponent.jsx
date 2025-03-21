import React from "react";
import logo from '../../assets/img/logo_movie.png';

const FooterComponent = () => {

  return (
    <footer className="bg-black text-gray-300 py-10 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Mô tả */}
        <div className="flex flex-col space-y-3">
          <img src={logo} alt="Cinemas Logo" className="w-32" />
          <p className="text-sm">
            Trải nghiệm rạp chiếu phim MVB tốt nhất với hàng ngàn bộ phim hấp dẫn.
          </p>
        </div>

        {/* Menu Điều Hướng */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-white">Danh Mục</h3>
          <a href="#" className="hover:text-red-500 transition">Lịch Chiếu</a>
          <a href="#" className="hover:text-red-500 transition">Phim</a>
          <a href="#" className="hover:text-red-500 transition">Ưu Đãi</a>
          <a href="#" className="hover:text-red-500 transition">Tin Tức Phim</a>
          <a href="#" className="hover:text-red-500 transition">Thành Viên</a>
        </div>

        {/* Mạng Xã Hội */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold text-white">Kết Nối Với Chúng Tôi</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition text-2xl">
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition text-2xl">
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition text-2xl">
            </a>
          </div>
        </div>
      </div>

      {/* Bản Quyền */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © 2025 Cinemas. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;
