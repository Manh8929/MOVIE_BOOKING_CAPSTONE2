import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaFilm,
  FaUsers,
  FaTheaterMasks,
  FaBoxOpen,
  FaChartBar,
  FaSignOutAlt,
  FaCaretDown,
  FaCaretUp,
  FaNewspaper,
  FaTags,
  FaPollH,
  FaBusinessTime
} from 'react-icons/fa';

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isContentDropdownOpen, setIsContentDropdownOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Phim", icon: FaFilm, path: "/AddMovieAdm" },
    { name: "Rạp Chiếu", icon: FaTheaterMasks, path: "/theatersadm" },
    { name: "Người Dùng", icon: FaUsers, path: "/managementuseradm" },
    { name: "Đơn Hàng", icon: FaBoxOpen, path: "/oderflimadm" },
    { name: "Báo Cáo", icon: FaChartBar, path: "/ReportsAdm" },
    { name: "Lịch chiếu", icon: FaBusinessTime, path: "/showtimeAdm" },
    {
      name: "Quản Lý",
      icon: FaPollH,
      dropdown: true,
      subMenu: [
        { name: "Q.Lý Tin Tức", icon: FaNewspaper, path: "/newsmanageadm" },
        { name: "Q.Lý Khuyến Mãi", icon: FaTags, path: "/promotionManagement" },
        { name: "Q.Lý Ghế", icon: FaTags, path: "/seat-management" },
        { name: "Q.Lý Giá ghế", icon: FaTags, path: "/price-management" },
        { name: "Q.Lý comment", icon: FaTags, path: "/comment-management" }
      ]
    }
  ];

  const toggleDropdown = () => {
    if (!isSidebarCollapsed) {
      setIsContentDropdownOpen(!isContentDropdownOpen);
    }
  };

  return (
    <div
      className={`relative flex flex-col h-screen transition-all duration-300
        ${isSidebarCollapsed ? 'w-24' : 'w-64'}
        bg-gradient-to-r from-[#9b4dca] to-[#f287f2] text-white p-6 border-r-4 border-gray-300 rounded-[5%]`}
    >
      <div
        className="absolute top-6 right-[-20px] cursor-pointer bg-black text-white rounded-full p-2"
        onClick={() => {
          setIsSidebarCollapsed(!isSidebarCollapsed);
          setIsContentDropdownOpen(false);
        }}
      >
        {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </div>

      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-bold text-center">MVB</h2>
      </div>

      <div className="flex-grow">
        {menuItems.map(({ name, icon: Icon, path, dropdown, subMenu }, index) => (
          <div key={index}>
            {dropdown ? (
              <div>
                <div
                  onClick={toggleDropdown}
                  className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
                  hover:text-black transition-all duration-300 
                  ${isContentDropdownOpen ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
                >
                  <Icon className="text-xl" />
                  {!isSidebarCollapsed && <span>{name}</span>}
                  {!isSidebarCollapsed && (
                    <span className="ml-2">
                      {isContentDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
                    </span>
                  )}
                </div>

                {isContentDropdownOpen && (
                  <div className="ml-6">
                    {subMenu.map((item, i) => (
                      <Link
                        key={i}
                        to={item.path}
                        className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
                        hover:text-black transition-all duration-300 
                        ${location.pathname === item.path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
                      >
                        <item.icon className="text-xl" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={path}
                className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
                hover:text-black transition-all duration-300 
                ${location.pathname === path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
              >
                <Icon className="text-xl" />
                {!isSidebarCollapsed && <span>{name}</span>}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] hover:text-black hover:rounded-full transition-all duration-300">
          <FaSignOutAlt className="text-xl" />
          {!isSidebarCollapsed && <span>Đăng xuất</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
