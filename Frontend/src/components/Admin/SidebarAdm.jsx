// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';  // Import Link và useLocation từ React Router
// import { 
//   FaChevronLeft, 
//   FaChevronRight, 
//   FaFilm, 
//   FaUsers, 
//   FaTheaterMasks, 
//   FaBoxOpen, 
//   FaChartBar, 
//   FaSignOutAlt 
// } from 'react-icons/fa';

// const Sidebar = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const location = useLocation();  // Lấy thông tin đường dẫn hiện tại

//   // List menu
//   const menuItems = [
//     { name: "Phim", icon: FaFilm, path: "/AddMovieAdm" },
//     { name: "Rạp Chiếu", icon: FaTheaterMasks, path: "/theatersadm" }, 
//     { name: "Người Dùng", icon: FaUsers, path: "/managementuseradm" }, 
//     { name: "Đơn Hàng", icon: FaBoxOpen, path: "/oderflimadm" },
//     { name: "Báo Cáo", icon: FaChartBar, path: "/ReportsAdm" }
//   ];

//   return (
//     <div 
//       className={`relative flex flex-col h-screen transition-all duration-300 
//       ${isSidebarCollapsed ? 'w-24' : 'w-64'} 
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
//         {/* Menu List */}
//         {menuItems.map(({ name, icon: Icon, path }, index) => (
//           <Link 
//             key={index}
//             to={path}  // Điều hướng khi nhấn vào mục menu
//             className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//             hover:text-black transition-all duration-300 
//             ${location.pathname === path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`} // Nổi bật mục khi ở trang hiện tại
//           >
//             <Icon className={`text-xl ${location.pathname === path ? 'text-white' : ''}`} />
//             {!isSidebarCollapsed && <span>{name}</span>} {/* Hiển thị tên mục khi sidebar mở rộng */}
//           </Link>
//         ))}
//       </div>

//       <div className="mt-auto">
//         <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] hover:text-black hover:rounded-full transition-all duration-300">
//           <FaSignOutAlt className="text-xl" />
//           {!isSidebarCollapsed && <span>Đăng xuất</span>} {/* Ẩn tên khi sidebar thu gọn */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';  // Import Link và useLocation từ React Router
// import { 
//   FaChevronLeft, 
//   FaChevronRight, 
//   FaFilm, 
//   FaUsers, 
//   FaTheaterMasks, 
//   FaBoxOpen, 
//   FaChartBar, 
//   FaSignOutAlt, 
//   FaCaretDown, 
//   FaCaretUp,
//   FaNewspaper, 
//   FaTags,
//   FaPollH
// } from 'react-icons/fa';

// const Sidebar = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [isContentDropdownOpen, setIsContentDropdownOpen] = useState(false);  // Quản lý dropdown "Quản lý nội dung"
//   const location = useLocation();  // Lấy thông tin đường dẫn hiện tại

//   // List menu
//   const menuItems = [
//     { name: "Phim", icon: FaFilm, path: "/AddMovieAdm" },
//     { name: "Rạp Chiếu", icon: FaTheaterMasks, path: "/theatersadm" }, 
//     { name: "Người Dùng", icon: FaUsers, path: "/managementuseradm" }, 
//     { name: "Đơn Hàng", icon: FaBoxOpen, path: "/oderflimadm" },
//     { name: "Báo Cáo", icon: FaChartBar, path: "/ReportsAdm" },
//     {
//       name: "Quản Lý", 
//       icon: FaPollH, 
//       path: "#",
//       dropdown: true, // Dropdown item
//       subMenu: [
//         { name: "Quản Lý Tin Tức", icon: FaNewspaper, path: "/newsManagement" },
//         { name: "Quản Lý Khuyến Mãi", icon: FaTags, path: "/promotionManagement" }
//       ]
//     }
//   ];

//   // Toggle dropdown menu "Quản Lý Nội Dung"
//   const toggleDropdown = () => {
//     setIsContentDropdownOpen(!isContentDropdownOpen);
//   };

//   return (
//     <div 
//       className={`relative flex flex-col h-screen transition-all duration-300 
//       ${isSidebarCollapsed ? 'w-24' : 'w-64'} 
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
//         {/* Menu List */}
//         {menuItems.map(({ name, icon: Icon, path, dropdown, subMenu }, index) => (
//           <div key={index}>
//             {/* Nếu là menu dropdown (Quản lý nội dung) */}
//             {dropdown ? (
//               <div>
//                 <div
//                   onClick={toggleDropdown}
//                   className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//                   hover:text-black transition-all duration-300 
//                   ${location.pathname === path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
//                 >
//                   <Icon className={`text-xl ${location.pathname === path ? 'text-white' : ''}`} />
//                   {!isSidebarCollapsed && <span>{name}</span>}
//                   <span className="ml-2">
//                     {isContentDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
//                   </span>
//                 </div>

//                 {/* Dropdown menu */}
//                 {isContentDropdownOpen && (
//                   <div className="ml-6">
//                     {subMenu.map((item, index) => (
//                       <Link
//                         key={index}
//                         to={item.path}
//                         className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//                         hover:text-black transition-all duration-300 
//                         ${location.pathname === item.path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
//                       >
//                         <item.icon className="text-xl" /> {/* Hiển thị icon cho các mục con */}
//                         <span>{item.name}</span>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               // Mục menu bình thường (không phải dropdown)
//               <Link 
//                 to={path}  // Điều hướng khi nhấn vào mục menu
//                 className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//                 hover:text-black transition-all duration-300 
//                 ${location.pathname === path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
//               >
//                 <Icon className={`text-xl ${location.pathname === path ? 'text-white' : ''}`} />
//                 {!isSidebarCollapsed && <span>{name}</span>} {/* Hiển thị tên mục khi sidebar mở rộng */}
//               </Link>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-auto">
//         <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] hover:text-black hover:rounded-full transition-all duration-300">
//           <FaSignOutAlt className="text-xl" />
//           {!isSidebarCollapsed && <span>Đăng xuất</span>} {/* Ẩn tên khi sidebar thu gọn */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';  // Import Link và useLocation từ React Router
// import { 
//   FaChevronLeft, 
//   FaChevronRight, 
//   FaFilm, 
//   FaUsers, 
//   FaTheaterMasks, 
//   FaBoxOpen, 
//   FaChartBar, 
//   FaSignOutAlt, 
//   FaCaretDown, 
//   FaCaretUp,
//   FaNewspaper, 
//   FaTags,
//   FaPollH
// } from 'react-icons/fa';

// const Sidebar = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [isContentDropdownOpen, setIsContentDropdownOpen] = useState(false);  // Quản lý dropdown "Quản lý nội dung"
//   const location = useLocation();  // Lấy thông tin đường dẫn hiện tại

//   // List menu
//   const menuItems = [
//     { name: "Phim", icon: FaFilm, path: "/AddMovieAdm" },
//     { name: "Rạp Chiếu", icon: FaTheaterMasks, path: "/theatersadm" }, 
//     { name: "Người Dùng", icon: FaUsers, path: "/managementuseradm" }, 
//     { name: "Đơn Hàng", icon: FaBoxOpen, path: "/oderflimadm" },
//     { name: "Báo Cáo", icon: FaChartBar, path: "/ReportsAdm" },
//     {
//       name: "Quản Lý", 
//       icon: FaPollH, 
//       path: "#",
//       dropdown: true, // Dropdown item
//       subMenu: [
//         { name: "Q.Lý Tin Tức", icon: FaNewspaper, path: "/newsManagement" },
//         { name: "Q.Lý Khuyến Mãi", icon: FaTags, path: "/promotionManagement" }
//       ]
//     }
//   ];

//   // Toggle dropdown menu "Quản Lý"
//   const toggleDropdown = () => {
//     if (!isSidebarCollapsed) {
//       setIsContentDropdownOpen(!isContentDropdownOpen);  // Chỉ toggle khi sidebar không thu gọn
//     }
//   };

//   return (
//     <div 
//       className={`relative flex flex-col h-screen transition-all duration-300 
//       ${isSidebarCollapsed ? 'w-24' : 'w-64'} 
//       bg-gradient-to-r from-[#9b4dca] to-[#f287f2] text-white p-6 border-r-4 border-gray-300 rounded-[5%]`}
//     >
//       <div className="absolute top-6 right-[-20px] cursor-pointer bg-black text-white rounded-full p-2" 
//         onClick={() => {
//           setIsSidebarCollapsed(!isSidebarCollapsed);
//           setIsContentDropdownOpen(false);  // Đóng dropdown khi thu gọn sidebar
//         }}>
//         {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
//       </div>

//       <div className="flex justify-center items-center mb-6">
//         <h2 className="text-2xl font-bold text-center">MVB</h2>
//       </div>

//       <div className="flex-grow">
//         {/* Menu List */}
//         {menuItems.map(({ name, icon: Icon, path, dropdown, subMenu }, index) => (
//           <div key={index}>
//             {/* Nếu là menu dropdown (Quản lý nội dung) */}
//             {dropdown ? (
//               <div>
//                 <div
//                   onClick={toggleDropdown}
//                   className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//                   hover:text-black transition-all duration-300 
//                   ${location.pathname === path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
//                 >
//                   <Icon className={`text-xl ${location.pathname === path ? 'text-white' : ''}`} />
//                   {!isSidebarCollapsed && <span>{name}</span>}
//                   <span className="ml-2">
//                     {isContentDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
//                   </span>
//                 </div>

//                 {/* Dropdown menu */}
//                 {isContentDropdownOpen && (
//                   <div className="ml-6">
//                     {subMenu.map((item, index) => (
//                       <Link
//                         key={index}
//                         to={item.path}
//                         className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//                         hover:text-black transition-all duration-300 
//                         ${location.pathname === item.path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
//                       >
//                         <item.icon className="text-xl" /> {/* Hiển thị icon cho các mục con */}
//                         <span>{item.name}</span>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               // Mục menu bình thường (không phải dropdown)
//               <Link 
//                 to={path}  // Điều hướng khi nhấn vào mục menu
//                 className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//                 hover:text-black transition-all duration-300 
//                 ${location.pathname === path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
//               >
//                 <Icon className={`text-xl ${location.pathname === path ? 'text-white' : ''}`} />
//                 {!isSidebarCollapsed && <span>{name}</span>} {/* Hiển thị tên mục khi sidebar mở rộng */}
//               </Link>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-auto">
//         <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] hover:text-black hover:rounded-full transition-all duration-300">
//           <FaSignOutAlt className="text-xl" />
//           {!isSidebarCollapsed && <span>Đăng xuất</span>} {/* Ẩn tên khi sidebar thu gọn */}
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
  FaSignOutAlt, 
  FaPollH,
  FaNewspaper, 
  FaTags
} from 'react-icons/fa';

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();  // Lấy thông tin đường dẫn hiện tại

  // List menu
  const menuItems = [
    { name: "Phim", icon: FaFilm, path: "/AddMovieAdm" },
    { name: "Rạp Chiếu", icon: FaTheaterMasks, path: "/theatersadm" }, 
    { name: "Người Dùng", icon: FaUsers, path: "/managementuseradm" }, 
    { name: "Đơn Hàng", icon: FaBoxOpen, path: "/oderflimadm" },
    { name: "Báo Cáo", icon: FaChartBar, path: "/ReportsAdm" },
    { name: "Quản Lý Tin Tức", icon: FaNewspaper, path: "/newsmanageadm" }, // Quản lý tin tức
    { name: "Quản Lý Khuyến Mãi", icon: FaTags, path: "/promotionmanagement" } // Quản lý khuyến mãi
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div 
      className={`relative flex flex-col h-screen transition-all duration-300 
      ${isSidebarCollapsed ? 'w-24' : 'w-64'} 
      bg-gradient-to-r from-[#9b4dca] to-[#f287f2] text-white p-6 border-r-4 border-gray-300 rounded-[5%]`}
    >
      <div className="absolute top-6 right-[-20px] cursor-pointer bg-black text-white rounded-full p-2" 
        onClick={toggleSidebar}>
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
            ${location.pathname === path ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`}
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
