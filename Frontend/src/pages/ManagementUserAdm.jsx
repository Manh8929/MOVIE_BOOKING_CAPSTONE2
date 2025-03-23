
import { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import icon xóa từ react-icons
import SidebarAdm from "../components/Admin/SidebarAdm"; // Đảm bảo import đúng SidebarAdm

const Users = () => {
  const [activePage, setActivePage] = useState("users"); // Đặt trạng thái active cho trang Users

  const handleDelete = (id) => {
    // Xử lý logic xoá
    console.log(`Xóa người dùng có ID: ${id}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdm activePage={activePage} setActivePage={setActivePage} />

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Header */}
        <header className="mb-6 flex justify-between items-center">
          <div className="ml-auto flex items-center">
            <div className="w-10 h-10 bg-[#131c28] text-white flex justify-center items-center rounded-full font-semibold">
              a
            </div>
            <span className="ml-3 text-xl font-semibold">administrator</span>
          </div>
        </header>

        {/* Đường kẻ phân cách */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Bảng thông tin người dùng */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300" style={{ width: '5%' }}>#</th> {/* Thu hẹp cột # */}
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Username</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Gmail</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">SĐT</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-300">Thời gian đăng ký</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Dữ liệu người dùng */}
            <tr className="border-t border-gray-200 hover:bg-gray-100 hover:scale-102 transition-all duration-200">
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">1</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Username</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">user@example.com</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">123-456-789</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">2023-03-20</td>
              <td className="py-3 px-4">
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(1)} // Gọi hàm xóa khi click
                >
                  <FaTrash /> {/* Icon xóa */}
                </button>
              </td>
            </tr>

            {/* Hàng thứ hai */}
            <tr className="border-t border-gray-200 hover:bg-gray-100 hover:scale-102 transition-all duration-200">
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">2</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Username</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">user2@example.com</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">987-654-321</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">2023-03-21</td>
              <td className="py-3 px-4">
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(2)} // Gọi hàm xóa khi click
                >
                  <FaTrash /> {/* Icon xóa */}
                </button>
              </td>
            </tr>

            {/* Hàng thứ ba */}
            <tr className="border-t border-gray-200 hover:bg-gray-100 hover:scale-102 transition-all duration-200">
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">3</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">Username</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">user3@example.com</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">111-222-333</td>
              <td className="py-3 px-4 text-gray-600 border-r border-gray-300">2023-03-22</td>
              <td className="py-3 px-4">
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(3)} // Gọi hàm xóa khi click
                >
                  <FaTrash /> {/* Icon xóa */}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
