import React, { useEffect, useState } from 'react'
import logo from '../../assets/img/logo_movie.png'

const HeaderComponent = () => {


  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-black via-black to-green-900">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-24 h-12" />
        <span className="text-3xl text-green-500 font-[Playfair] italic tracking-wider drop-shadow-md">
          Cinemas
        </span>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Login
        </button>
        <button className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white">
          Register
        </button>
      </div>
    </header>
  );
}


export default HeaderComponent