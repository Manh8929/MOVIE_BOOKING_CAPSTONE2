import { useState } from "react";
import SidebarAdm from "../components/Admin/SidebarAdm"; // Đảm bảo import đúng SidebarAdm

const Orders = () => {
  const [activePage, setActivePage] = useState("orders"); // Đặt trạng thái active cho trang Orders

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdm activePage={activePage} setActivePage={setActivePage} /> {/* Truyền activePage vào SidebarAdm */}

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-gray-50"> {/* Đặt margin-left là 0 để bảng sát với Sidebar */}
        {/* Header */}
        <header className="mb-6 flex justify-between items-center">
          {/* Tên admin nằm bên phải */}
          <div className="ml-auto flex items-center">
            <div className="w-10 h-10 bg-[#131c28] text-white flex justify-center items-center rounded-full font-semibold">
              ảnh
            </div>
            <span className="ml-3 text-xl font-semibold">Tên admin</span>
          </div>
        </header>

        {/* Đường kẻ phân cách */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Bảng thông tin đơn hàng */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">#</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Tên Người Dùng</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Phim</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Thông Tin Đặt Vé</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Trạng Thái</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-300 border-l">Hành Động</th> {/* Thêm border-l để tạo đường kẻ ngăn cách */}
            </tr>
          </thead>
          <tbody>
            {/* Dữ liệu đơn hàng */}
            <tr className="border-t border-gray-200 hover:bg-gray-100 hover:scale-102 transition-all duration-200">
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">1</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Bích Phương=))</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Avengers</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Đặt vào ngày 20 tháng 3</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Đã xác nhận</td>
              <td className="py-3 px-4 border-l">
                <button className="text-blue-500">Xem</button>
              </td>
            </tr>

            {/* Hàng thứ hai */}
            <tr className="border-t border-gray-200 hover:bg-gray-100 hover:scale-102 transition-all duration-200">
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">2</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Sơn Tùng MTP</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Inception</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Đặt vào ngày 21 tháng 3</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Đang chờ xác nhận</td>
              <td className="py-3 px-4 border-l">
                <button className="text-blue-500">Xem</button>
              </td>
            </tr>

            {/* Hàng thứ ba */}
            <tr className="border-t border-gray-200 hover:bg-gray-100 hover:scale-102 transition-all duration-200">
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">3</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">J97</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">The Matrix</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Đặt vào ngày 22 tháng 3</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Đã hủy</td>
              <td className="py-3 px-4 border-l">
                <button className="text-blue-500">Xem</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;