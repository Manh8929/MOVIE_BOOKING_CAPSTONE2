import React, { useState, useEffect } from "react";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/img/logo_movie.png";

const HeaderComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("mm", user);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] shadow-lg z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 cursor-pointer">
        <img src={logo} alt="Logo" className="w-24 h-12" />
        <span className="text-3xl text-[#AD1332] font-[Playfair] italic tracking-wider drop-shadow-md">
          Cinemas
        </span>
      </Link>

      {/* Navbar  */}
      <div className="hidden md:flex">
        <NavbarComponent />
      </div>

      {/* Buttons */}

      <div className="hidden md:flex space-x-4">
        {currentUser ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center space-x-3">
              <strong className="text-l font-bold text-[#e5b2b7] uppercase tracking-wide drop-shadow-md">
                {currentUser.email.slice(0, 8)}
              </strong>
              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#E63946] shadow-lg"
              />
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-gradient-to-br from-black via-black to-[#4f111e]"
                >
                  Thông tin của bạn
                </Link>
                <Link
                  to="/ticket-up-his"
                  className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-gradient-to-br from-black via-black to-[#4f111e]"
                >
                  Vé của bạn
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:text-white hover:bg-gradient-to-br from-black via-black to-[#4f111e]"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setActive("login");
                navigate("/login");
              }}
              className={`px-4 py-2 rounded border transition-transform transform 
          ${
            active === "login"
              ? "bg-[#D1D5DB] text-[#111827] scale-105"
              : "border-[#E5E7EB] text-[#E5E7EB] hover:bg-[#E5E7EB] hover:text-[#111827] hover:-translate-y-1"
          }`}
            >
              Đăng nhập
            </button>

            <button
              onClick={() => {
                setActive("register");
                navigate("/registration");
              }}
              className={`px-4 py-2 rounded border transition-transform transform 
          ${
            active === "register"
              ? "bg-[#E5E7EB] text-[#111827] scale-105"
              : "border-[#E5E7EB] text-[#E5E7EB] hover:bg-[#E5E7EB] hover:text-[#111827] hover:-translate-y-1"
          }`}
            >
              Đăng kí
            </button>
          </>
        )}
      </div>

      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center space-y-6 p-8 transition-all duration-300 z-50">
          <button
            className="absolute top-4 right-6 text-white text-3xl"
            onClick={() => setIsOpen(false)}
          >
            <FiX />
          </button>

          <NavbarComponent />
          {currentUser ? (
            <div className="relative flex flex-col items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full border-2 border-white"
                />
              </button>
              {isMenuOpen && (
                <ul className="absolute top-20 bg-white rounded-md shadow-lg py-2 w-48 text-center z-50">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-center text-gray-800 hover:bg-gray-200 hover:text-white hover:bg-gradient-to-br from-black via-black to-[#4f111e]"
                    >
                      Thông tin của bạn
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ticket-up-his"
                      className="block px-4 py-2 text-center text-gray-800 hover:bg-gray-200 hover:text-white hover:bg-gradient-to-br from-black via-black to-[#4f111e]"
                    >
                      Vé của bạn
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-white hover:bg-gradient-to-br from-black via-black to-[#4f111e]"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-[#E63946] text-white px-6 py-3 rounded hover:opacity-70 w-48 text-center transition-transform transform hover:-translate-y-1"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/register")}
                className="border border-[#E63946] text-white px-6 py-3 rounded hover:bg-[#E63946] hover:text-white w-48 text-center transition-transform transform hover:translate-y-1"
              >
                Đăng kí
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
