import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList
} from "recharts";

import { getAllPayments } from "../services/adminService";
import SidebarAdm from "../components/Admin/SidebarAdm";

const ManagerPayment = () => {
  const [activePage, setActivePage] = useState("managerPayment");
  const [payments, setPayments] = useState([]);
  const [bookingSearch, setBookingSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPayments();
        const completed =
          data.payments?.filter((p) => p.payment_status === "completed") || [];
        // Tính số lượng giao dịch hoàn tất theo user
        const userCountMap = {};
        completed.forEach((p) => {
          const email = p.User?.email;
          if (email) {
            userCountMap[email] = (userCountMap[email] || 0) + 1;
          }
        });

        // Convert sang mảng và lấy top 5
        const sortedUsers = Object.entries(userCountMap)
          .map(([email, count]) => ({ email, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setTopUsers(sortedUsers);
        setPayments(data.payments || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thanh toán:", error);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const bookingIdMatch = payment.booking_id
      .toString()
      .includes(bookingSearch.trim());
    const emailMatch = payment.User?.email
      ?.toLowerCase()
      .includes(emailSearch.trim().toLowerCase());

    return bookingIdMatch && emailMatch;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarAdm activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
          {/* Thanh tìm kiếm nâng cao */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tìm theo mã Booking
              </label>
              <input
                type="text"
                placeholder="Nhập mã booking"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tìm theo email người dùng
              </label>
              <input
                type="text"
                placeholder="Nhập email người dùng"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={emailSearch}
                onChange={(e) => setEmailSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Bảng thanh toán */}
          <div className="overflow-auto max-h-[75vh]">
            {filteredPayments.length === 0 ? (
              <p className="text-gray-700">Không có dữ liệu thanh toán.</p>
            ) : (
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 border">Mã booking</th>
                    <th className="px-4 py-2 border">Phương thức</th>
                    <th className="px-4 py-2 border">Trạng thái</th>
                    <th className="px-4 py-2 border">Số tiền</th>
                    <th className="px-4 py-2 border">QR Code</th>
                    <th className="px-4 py-2 border">Thời gian chiếu</th>
                    <th className="px-4 py-2 border">Rạp</th>
                    <th className="px-4 py-2 border">Màn hình</th>
                    <th className="px-4 py-2 border">Ghế</th>
                    <th className="px-4 py-2 border">Họ tên</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Số điện thoại</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => {
                    const {
                      booking_id,
                      payment_method,
                      payment_status,
                      amount,
                      Booking,
                      User,
                    } = payment;

                    const seats =
                      Booking?.BookingSeats?.map(
                        (bs) => bs.Seat?.seat_number
                      ).join(", ") || "Chưa có";

                    const theaterName =
                      Booking?.Showtime?.Screen?.Theater?.name || "Chưa có";
                    return (
                      <tr key={payment.payment_id} className="text-center">
                        <td className="px-4 py-2 border">{booking_id}</td>
                        <td className="px-4 py-2 border">{payment_method}</td>
                        <td className="px-4 py-2 border">
                          {payment_status === "pending"
                            ? "Đang chờ"
                            : payment_status === "completed"
                            ? "Hoàn tất"
                            : payment_status === "failed"
                            ? "Thất bại"
                            : payment_status}
                        </td>
                        <td className="px-4 py-2 border">
                          {Number(amount).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>

                        <td className="px-4 py-2 border">{Booking?.qr_code}</td>
                        <td className="px-4 py-2 border">
                          {Booking?.Showtime?.show_time
                            ? new Date(
                                Booking.Showtime.show_time
                              ).toLocaleString()
                            : "Chưa có"}
                        </td>
                        <td className="px-4 py-2 border">{theaterName}</td>
                        <td className="px-4 py-2 border">
                          {Booking?.Showtime?.Screen?.screen_name || "Chưa có"}
                        </td>
                        <td className="px-4 py-2 border">{seats}</td>
                        <td className="px-4 py-2 border">{User?.full_name}</td>
                        <td className="px-4 py-2 border">{User?.email}</td>
                        <td className="px-4 py-2 border">
                          {User?.phone_number || "Chưa có"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* Biểu đồ Top 5 người dùng thanh toán nhiều nhất */}
        {topUsers.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md my-6">
            <h2 className="text-lg font-semibold mb-4">
              Top 5 người dùng mua vé nhiều nhất
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topUsers}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="email" type="category" width={250} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                  formatter={(value, name) => [
                    `${value} lượt`,
                    "Số lượt thanh toán",
                  ]}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 10, 10, 0]}>
                  <LabelList dataKey="count" position="right" fill="#000" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerPayment;
