// import { useState } from "react";
// import { 
//   FaChevronLeft, 
//   FaChevronRight, 
//   FaFilm, 
//   FaUsers, 
//   FaTheaterMasks, 
//   FaBoxOpen, 
//   FaChartBar, 
//   FaSignOutAlt 
// } from "react-icons/fa";

// const Sidebar = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [activeItem, setActiveItem] = useState(0); 

//   // list menu
//   const menuItems = [
//     { name: "Phim", icon: FaFilm },
//     { name: "Rạp Chiếu", icon: FaTheaterMasks }, 
//     { name: "Người Dùng", icon: FaUsers }, 
//     { name: "Đơn Hàng", icon: FaBoxOpen },
//     { name: "Báo Cáo", icon: FaChartBar }
//   ];

//   // logic act trang
//   const handleItemClick = (index) => {
//     setActiveItem(index);
//   };

//   return (
//     <div 
//       className={`relative flex flex-col h-screen transition-all duration-300 
//       ${isSidebarCollapsed ? 'w-24' : 'w-64'}  // Increase width to w-24
//       bg-gradient-to-r from-[#9b4dca] to-[#f287f2] text-white p-6 border-r-4 border-gray-300 rounded-[5%]`}
//     >
//       <div className="absolute top-6 right-[-20px] cursor-pointer bg-black text-white rounded-full p-2" 
//         onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
//         {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
//       </div>

//       <div className="flex justify-center items-center mb-6">
//         <h2 className="text-2xl font-bold text-center">MVB</h2>
//       </div>

//       <div className="flex-grow">
//         {menuItems.map(({ name, icon: Icon }, index) => (
//           <div 
//             key={index} 
//             className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//             hover:text-black transition-all duration-300 
//             ${activeItem === index ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`} 
//             onClick={() => handleItemClick(index)}
//           >
//             {/* Icon will always be visible even when collapsed */}
//             <Icon className={`text-xl ${activeItem === index ? 'text-white' : ''}`} />
//             {/* Show the name only when sidebar is expanded */}
//             {!isSidebarCollapsed && <span>{name}</span>}
//           </div>
//         ))}
//       </div>

//       <div className="mt-auto">
//         <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//         hover:text-black hover:rounded-full transition-all duration-300">
//           <FaSignOutAlt className="text-xl" />
//           {!isSidebarCollapsed && <span>Đăng xuất</span>} {/* Hide text when collapsed */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import Link và useLocation từ React Router
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaFilm, 
  FaUsers, 
  FaTheaterMasks, 
  FaBoxOpen, 
  FaChartBar, 
  FaSignOutAlt 
} from 'react-icons/fa';

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();  // Lấy thông tin đường dẫn hiện tại

  // List menu
  const menuItems = [
    { name: "Phim", icon: FaFilm, path: "/AddMovieAdm" },
    { name: "Rạp Chiếu", icon: FaTheaterMasks, path: "/theaters" }, 
    { name: "Người Dùng", icon: FaUsers, path: "/managementuseradm" }, 
    { name: "Đơn Hàng", icon: FaBoxOpen, path: "/oderflimadm" },
    { name: "Báo Cáo", icon: FaChartBar, path: "/ReportsAdm" }
  ];

  return (
    <div 
      className={`relative flex flex-col h-screen transition-all duration-300 
      ${isSidebarCollapsed ? 'w-24' : 'w-64'} 
      bg-gradient-to-r from-[#9b4dca] to-[#f287f2] text-white p-6 border-r-4 border-gray-300 rounded-[5%]`}
    >
      <div className="absolute top-6 right-[-20px] cursor-pointer bg-black text-white rounded-full p-2" 
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
        {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </div>

      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-bold text-center">MVB</h2>
      </div>

      <div className="flex-grow">
        {/* Menu List */}
        {menuItems.map(({ name, icon: Icon, path }, index) => (
          <Link 
            key={index}
            to={path}  // Điều hướng khi nhấn vào mục menu
            className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
            hover:text-black transition-all duration-300 
            ${location.pathname === path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`} // Nổi bật mục khi ở trang hiện tại
          >
            <Icon className={`text-xl ${location.pathname === path ? 'text-white' : ''}`} />
            {!isSidebarCollapsed && <span>{name}</span>} {/* Hiển thị tên mục khi sidebar mở rộng */}
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] hover:text-black hover:rounded-full transition-all duration-300">
          <FaSignOutAlt className="text-xl" />
          {!isSidebarCollapsed && <span>Đăng xuất</span>} {/* Ẩn tên khi sidebar thu gọn */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
