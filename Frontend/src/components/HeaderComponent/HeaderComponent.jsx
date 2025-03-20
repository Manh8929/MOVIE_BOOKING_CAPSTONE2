import React from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo_movie.png';

const HeaderComponent = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-black via-black to-green-900 shadow-lg z-50">
      {/* Logo */}
      <Link to='/' className="flex items-center space-x-2 cursor-pointer">
        <img src={logo} alt="Logo" className="w-24 h-12" />
        <span className="text-3xl text-green-500 font-[Playfair] italic tracking-wider drop-shadow-md">
          Cinemas
        </span>
      </Link>

      {/* Navbar */}
      <NavbarComponent />

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-transform transform hover:-translate-y-1">
          Đăng nhập
        </button>
        <button className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-transform transform hover:-translate-y-1">
          Đăng kí
        </button>
      </div>
    </header>
  );
};

export default HeaderComponent;
