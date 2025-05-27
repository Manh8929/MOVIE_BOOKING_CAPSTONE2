import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import SidebarAdm from "../components/Admin/SidebarAdm";
import { getAllPayments } from "../services/adminService";

// Import recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Report = () => {
  const [activePage, setActivePage] = useState("reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPayments();
        const completedPayments = data.payments.filter(
          (payment) => payment.payment_status === "completed"
        );

        const revenueByMovie = {};

        completedPayments.forEach((item) => {
          const title =
            item?.Booking?.Showtime?.Movie?.title || "Không xác định";
          const amount = parseInt(item.amount);

          if (revenueByMovie[title]) {
            revenueByMovie[title] += amount;
          } else {
            revenueByMovie[title] = amount;
          }
        });

        const mappedReports = Object.entries(revenueByMovie).map(
          ([name, revenue]) => ({
            name,
            revenue,
            revenueFormatted: `${revenue.toLocaleString("vi-VN")} VND`,
          })
        );

        setReports(mappedReports);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu payment:", err);
      }
    };

    fetchPayments();
  }, []);

  // Lọc theo search
  const filteredReports = reports.filter((report) =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lấy top 5 phim có doanh thu cao nhất (theo filteredReports)
  const top5Movies = [...filteredReports]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const handleView = (id) => {
    console.log(`Xem báo cáo có ID: ${id}`);
  };

  return (
    <div className="flex h-screen">
      <SidebarAdm activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 p-6 bg-gray-50">
        <header className="mb-6 flex justify-start items-center">
          <div className="flex items-center ml-6">
            <span className="ml-3 text-xl font-semibold">Quản lý báo cáo</span>
          </div>
        </header>

        <div className="border-t border-gray-300 mb-6"></div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên phim..."
            className="p-2 border border-gray-300 rounded-lg"
            style={{ width: "300px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="border-t border-gray-300 mb-6"></div>
        <h2 className="text-2xl font-semibold mb-4">Top 5 phim có doanh thu cao nhất</h2>

        {/* Chart hiển thị top 5 */}
        <div style={{ width: "100%", height: 300, marginBottom: 40 }}>
          <ResponsiveContainer>
            <BarChart
              data={top5Movies}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip
                formatter={(value) => value.toLocaleString("vi-VN") + " VND"}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bảng báo cáo */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">Tên phim</th>
              <th className="py-3 px-6 text-left">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-6">{report.name}</td>
                <td className="py-2 px-6">{report.revenueFormatted}</td>
              </tr>
            ))}
            {filteredReports.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-400">
                  Không có báo cáo nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
