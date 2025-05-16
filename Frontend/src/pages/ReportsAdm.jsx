import { useState } from "react";
import { FaEye } from "react-icons/fa";
import SidebarAdm from "../components/Admin/SidebarAdm";

const Report = () => {
  const [activePage, setActivePage] = useState("reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState([
    { id: 1, name: "Avengers", ticketsSold: 2000, revenue: "50,000,000 VND", showTime: "2023-03-15 đến 2023-03-20" },
    { id: 2, name: "Inception", ticketsSold: 1500, revenue: "40,000,000 VND", showTime: "2023-03-21 đến 2023-03-25" },
    { id: 3, name: "Matrix", ticketsSold: 1800, revenue: "45,000,000 VND", showTime: "2023-03-22 đến 2023-03-27" },
  ]);

  // Hàm để lọc theo tên phim
  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (id) => {
    // Xử lý logic xem
    console.log(`Xem báo cáo có ID: ${id}`);
  };

  return (
    <div className="flex h-screen">
      <SidebarAdm activePage={activePage} setActivePage={setActivePage} />

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Header */}
        <header className="mb-6 flex justify-start items-center">
          <div className="flex items-center ml-6">
            <span className="ml-3 text-xl font-semibold">Quản lý báo cáo</span>
          </div>
        </header> 

        {/* Đường kẻ phân cách */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Tìm kiếm */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên phim..."
            className="p-2 border border-gray-300 rounded-lg"
            style={{ width: '200px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Đường kẻ phân cách */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Bảng báo cáo */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300" style={{ width: '5%' }}>STT</th> 
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Tên Phim</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Tổng Số Vé Bán Được</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Thời Gian Chiếu</th> 
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">Danh Thu</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-300 border-l">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="border-t border-gray-200 hover:bg-gray-100 hover:scale-102 transition-all duration-200">
                <td className="py-3 px-4 text-gray-600 border-r border-gray-300">{report.id}</td>
                <td className="py-3 px-4 text-gray-600 border-r border-gray-300">{report.name}</td>
                <td className="py-3 px-4 text-gray-600 border-r border-gray-300">{report.ticketsSold}</td>
                <td className="py-3 px-4 text-gray-600 border-r border-gray-300">{report.showTime}</td>
                <td className="py-3 px-4 text-gray-600 border-r border-gray-300">{report.revenue}</td>
                <td className="py-3 px-4">
                  <button
                    className="text-blue-500"
                    onClick={() => handleView(report.id)}
                  >
                    <FaEye /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
