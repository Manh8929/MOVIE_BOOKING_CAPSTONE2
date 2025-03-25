import React from "react";
import logo from '../../assets/img/logo_movie.png';
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterComponent = () => {

  return (
    <footer className="bg-black text-gray-300 py-10 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Mô tả */}
        <div className="flex flex-col space-y-3">
          <img src={logo} alt="Cinemas Logo" className="w-32" />
          <p className="text-sm">
            Trải nghiệm rạp chiếu phim MVB tốt nhất với hàng ngàn bộ phim hấp
            dẫn.
          </p>
        </div>

        {/* Menu Điều Hướng */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-white">Danh Mục</h3>
          <a
            href="/under-construction"
            className="hover:text-red-500 transition"
          >
            Lịch Chiếu
          </a>
          <a
            href="/under-construction"
            className="hover:text-red-500 transition"
          >
            Phim
          </a>
          <a
            href="/under-construction"
            className="hover:text-red-500 transition"
          >
            Ưu Đãi
          </a>
          <a
            href="/under-construction"
            className="hover:text-red-500 transition"
          >
            Tin Tức Phim
          </a>
          <a
            href="/under-construction"
            className="hover:text-red-500 transition"
          >
            Thành Viên
          </a>
        </div>

        {/* Mạng Xã Hội */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Kết Nối Với Chúng Tôi
          </h3>
          <div className="flex space-x-5 text-2xl">
            <a
              href="/under-construction"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="/under-construction"
              className="text-gray-400 hover:text-red-600 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="/under-construction"
              className="text-gray-400 hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Contact Info */}
          <div className="text-sm space-y-2">
            <p>
              <span className="font-medium text-white">Điện thoại:</span> 0123
              456 789
            </p>
            <p>
              <span className="font-medium text-white">Email:</span>{" "}
              manhdeptrai@mvbcinemas.com
            </p>
            <p>
              <span className="font-medium text-white">Địa chỉ:</span> 123 Đường
              ABC, Quận Thanh Khê, TP.Đà Nẵng
            </p>
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
