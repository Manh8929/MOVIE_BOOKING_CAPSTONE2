import React, { useState } from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 
import logo from '../../assets/img/logo_movie.png';

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-black via-black to-green-900 shadow-lg z-50">
      {/* Logo */}
      <Link to='/' className="flex items-center space-x-2 cursor-pointer">
        <img src={logo} alt="Logo" className="w-24 h-12" />
        <span className="text-3xl text-green-500 font-[Playfair] italic tracking-wider drop-shadow-md">
          Cinemas
        </span>
      </Link>

      {/* Navbar  */}
      <div className="hidden md:flex">
        <NavbarComponent />
      </div>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-transform transform hover:-translate-y-1">
          Đăng nhập
        </button>
        <button className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-transform transform hover:-translate-y-1">
          Đăng kí
        </button>
      </div>

      <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center space-y-6 p-8 transition-all duration-300 z-50">
          {/* Close Button */}
          <button className="absolute top-4 right-6 text-white text-3xl" onClick={() => setIsOpen(false)}>
            <FiX />
          </button>

          {/* Navbar */}
          <NavbarComponent />

          {/* Buttons */}
          <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 w-48 text-center">
            Đăng nhập
          </button>
          <button className="border border-green-500 text-green-500 px-6 py-3 rounded hover:bg-green-500 hover:text-white w-48 text-center">
            Đăng kí
          </button>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
