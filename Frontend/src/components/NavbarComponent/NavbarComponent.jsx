import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarComponent = () => {
    const location = useLocation(); 

    return (
      <nav className="flex space-x-6 text-white text-lg">
        {[
          { path: "/schedule-movie", label: "Lịch chiếu" },
          { path: "/movies", label: "Phim" },
          { path: "/promotions", label: "Ưu đãi" },
          { path: "/news", label: "Tin tức phim" },
          { path: "/members", label: "Thành viên" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`transition-transform transform hover:-translate-y-1 
                        ${
                          location.pathname === item.path
                            ? "text-[#E63946] font-bold"
                            : "hover:text-[#E63946]"
                        }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
};

export default NavbarComponent;
