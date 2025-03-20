// // src/components/Sidebar.jsx
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
// } from "react-icons/fa"; // Import các icon

// const Sidebar = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // state thu gọn sidebar

//   // Danh sách menu động
//   const menuItems = [
//     { name: "Movies", icon: FaFilm },
//     { name: "Theaters", icon: FaTheaterMasks },
//     { name: "Users", icon: FaUsers },
//     { name: "Orders", icon: FaBoxOpen },
//     { name: "Report", icon: FaChartBar }
//   ];

//   return (
//     <div 
//       className={`relative flex flex-col h-screen transition-all duration-300 
//       ${isSidebarCollapsed ? 'w-24' : 'w-64'} 
//       bg-gradient-to-r from-[#9b4dca] to-[#f287f2] text-white p-6 border-r-4 border-gray-300`} // Sidebar giữ nguyên góc
//     >
//       {/* Nút thu gọn Sidebar */}
//       <div className="absolute top-6 right-[-20px] cursor-pointer bg-black text-white rounded-full p-2" 
//         onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
//         {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
//       </div>

//       {/* Logo MVB */}
//       <div className="flex justify-center items-center mb-6">
//         <h2 className="text-2xl font-bold text-center">MVB</h2>
//       </div>

//       {/* Danh sách menu */}
//       <div className="flex-grow">
//         {menuItems.map(({ name, icon: Icon }, index) => (
//           <div 
//             key={index} 
//             className="flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//             hover:text-black hover:rounded-full transition-all duration-300"
//           >
//             <Icon className="text-xl" />
//             {!isSidebarCollapsed && <span>{name}</span>}
//           </div>
//         ))}
//       </div>

//       {/* Đăng xuất (nằm riêng biệt ở cuối sidebar) */}
//       <div className="mt-auto">
//         <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
//         hover:text-black hover:rounded-full transition-all duration-300">
//           <FaSignOutAlt className="text-xl" />
//           {!isSidebarCollapsed && <span>Đăng xuất</span>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// src/components/Sidebar.jsx
import { useState } from "react";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaFilm, 
  FaUsers, 
  FaTheaterMasks, 
  FaBoxOpen, 
  FaChartBar, 
  FaSignOutAlt 
} from "react-icons/fa"; // Import các icon

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // state thu gọn sidebar
  const [activeItem, setActiveItem] = useState(0); // Đặt mặc định là "Phim" (mục đầu tiên)

  // Danh sách menu động
  const menuItems = [
    { name: "Phim", icon: FaFilm }, // Movies -> Phim
    { name: "Rạp Chiếu", icon: FaTheaterMasks }, // Theaters -> Rạp Chiếu
    { name: "Người Dùng", icon: FaUsers }, // Users -> Người Dùng
    { name: "Đơn Hàng", icon: FaBoxOpen }, // Orders -> Đơn Hàng
    { name: "Báo Cáo", icon: FaChartBar } // Report -> Báo Cáo
  ];

  // Hàm xử lý chọn mục
  const handleItemClick = (index) => {
    setActiveItem(index); // Đánh dấu mục đang chọn
  };

  return (
    <div 
      className={`relative flex flex-col h-screen transition-all duration-300 
      ${isSidebarCollapsed ? 'w-16' : 'w-64'} 
      bg-gradient-to-r from-[#9b4dca] to-[#f287f2] text-white p-6 border-r-4 border-gray-300 rounded-[5%]`} // Sidebar giữ nguyên góc
    >
      {/* Nút thu gọn Sidebar */}
      <div className="absolute top-6 right-[-20px] cursor-pointer bg-black text-white rounded-full p-2" 
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
        {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </div>

      {/* Logo MVB */}
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-bold text-center">MVB</h2>
      </div>

      {/* Danh sách menu */}
      <div className="flex-grow">
        {menuItems.map(({ name, icon: Icon }, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
            hover:text-black transition-all duration-300 
            ${activeItem === index ? 'bg-[#4a148c] text-white rounded-lg' : 'hover:rounded-full'}`} 
            onClick={() => handleItemClick(index)} // Gọi hàm khi click vào mục
          >
            <Icon className={`text-xl ${activeItem === index ? 'text-white' : ''}`} /> {/* Sáng lên khi active */}
            {!isSidebarCollapsed && <span>{name}</span>}
          </div>
        ))}
      </div>

      {/* Đăng xuất (nằm riêng biệt ở cuối sidebar) */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-[#d1d5db] 
        hover:text-black hover:rounded-full transition-all duration-300">
          <FaSignOutAlt className="text-xl" />
          {!isSidebarCollapsed && <span>Đăng xuất</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
