import React from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <nav className="flex space-x-6 text-white text-lg">
            <Link to="/schedule" className="hover:text-green-400 transition-transform transform hover:-translate-y-1">Lịch chiếu</Link>
            <Link to="/movies" className="hover:text-green-400 transition-transform transform hover:-translate-y-1">Phim</Link>
            <Link to="/deals" className="hover:text-green-400 transition-transform transform hover:-translate-y-1">Ưu đãi</Link>
            <Link to="/news" className="hover:text-green-400 transition-transform transform hover:-translate-y-1">Tin tức phim</Link>
            <Link to="/members" className="hover:text-green-400 transition-transform transform hover:-translate-y-1">Thành viên</Link>
        </nav>
    );
};

export default NavbarComponent;
