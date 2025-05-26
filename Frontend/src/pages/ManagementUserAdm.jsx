import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import SidebarAdm from "../components/Admin/SidebarAdm";
import * as adminService from "../services/adminService";
import { useMemo } from "react";
const Users = () => {
  const [activePage, setActivePage] = useState("users");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    dob: "",
    gender: "",
    address: "",
    role_id: "",
    email: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await adminService.getAllUsers(token);
      setUsers(res.users);
    } catch (err) {
      toast.error("Lỗi tải danh sách người dùng", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa người dùng này?");
    if (!confirm) return;

    try {
      await adminService.deleteUser(token, id);
      toast.success("Xoá người dùng thành công");
      setUsers(users.filter((user) => user.user_id !== id));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Xoá thất bại");
    }
  };
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      full_name: user.full_name,
      phone_number: user.phone_number || "",
      dob: user.dob,
      email: user.email,
      gender: user.gender,
      address: user.address,
      role_id: user.role_id,
    });
  };
  const handleUpdate = async () => {
    try {
      await adminService.updateUser(token, editingUser.user_id, formData);
      toast.success("Cập nhật thành công");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      toast.error("Cập nhật thất bại", err);
    }
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.phone_number?.toLowerCase().includes(search)
    );
  });

  // chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const getGenderData = (users) => {
    const counts = { male: 0, female: 0, other: 0 };
    users.forEach((u) => {
      if (u.gender) counts[u.gender]++;
    });
    return [
      { name: "Nam", value: counts.male },
      { name: "Nữ", value: counts.female },
      { name: "Khác", value: counts.other },
    ];
  };

  const getProviderData = (users) => {
    const counts = { local: 0, google: 0, facebook: 0 };
    users.forEach((u) => {
      if (u.provider) counts[u.provider]++;
    });
    return [
      { name: "Local", value: counts.local },
      { name: "Google", value: counts.google },
      { name: "Facebook", value: counts.facebook },
    ];
  };

  const getMonthlyRegistrations = (users, selectedYear) => {
    const counts = {};

    users.forEach((user) => {
      const date = new Date(user.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (year === selectedYear) {
        const key = `${month}/${year}`;
        counts[key] = (counts[key] || 0) + 1;
      }
    });

    return Object.keys(counts)
      .sort((a, b) => {
        const [ma] = a.split("/").map(Number);
        const [mb] = b.split("/").map(Number);
        return ma - mb;
      })
      .map((key) => ({ month: key, users: counts[key] }));
  };

  // Lấy các năm có trong dữ liệu
  const years = useMemo(() => {
    const allYears = users.map((u) => new Date(u.createdAt).getFullYear());
    return Array.from(new Set(allYears)).sort((a, b) => b - a);
  }, [users]);

  const [selectedYear, setSelectedYear] = useState(
    years[0] || new Date().getFullYear()
  );

  const data = useMemo(
    () => getMonthlyRegistrations(users, selectedYear),
    [users, selectedYear]
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdm activePage={activePage} setActivePage={setActivePage} />
      {/* Nội dung chính */}
      <div className="max-h-[800px] xl2:max-h-[100vh] w-full overflow-y-auto">
        <div className="flex-1 p-6 bg-gray-50">
          {/* Header */}
          <header className="mb-6 flex justify-start items-center">
            <div className="flex items-center">
              <span className="ml-3 text-xl font-semibold">
                Quản lý người dùng
              </span>
            </div>
          </header>
          {/* chart */}
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Số lượng người dùng đăng ký theo tháng
              </h2>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Tìm kiếm */}
          <div className="mb-6 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, gmail hoặc số điện thoại"
              className="border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-r-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
    <FaSearch className="mr-1" />
  </button> */}
          </div>

          {/* Đường kẻ phân cách */}
          <div className="border-t border-gray-300 mb-6"></div>

          {/* Bảng thông tin người dùng */}
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th
                  className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300"
                  style={{ width: "5%" }}
                >
                  #
                </th>{" "}
                {/* Thu hẹp cột # */}
                <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">
                  Username
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">
                  Gmail
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">
                  SĐT
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">
                  Giới tính
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b border-r border-gray-300">
                  Ngày sinh
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-300">
                  Thời gian đăng ký
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Dữ liệu người dùng */}
              {filteredUsers.map((user, index) => (
                <tr className="border-t border-gray-200 hover:bg-gray-100 hover:scale-102 transition-all duration-200">
                  <td className="py-3 px-4 text-gray-600 border-r border-gray-300">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 text-gray-600 border-r border-gray-300">
                    {user.full_name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 border-r border-gray-300">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-gray-600 border-r border-gray-300">
                    {user.phone_number || "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-600 border-r border-gray-300">
                    {user.gender === "male"
                      ? "Nam"
                      : user.gender === "female"
                      ? "Nữ"
                      : "Khác"}
                  </td>
                  <td className="py-3 px-4 text-gray-600 border-r border-gray-300">
                    {new Date(user.dob).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-3 px-4 text-gray-600 border-r border-gray-300">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-3 px-4 flex gap-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-4">Tỉ lệ giới tính</h2>
              <PieChart width={300} height={300}>
                <Pie
                  data={getGenderData(users)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {getGenderData(users).map((entry, index) => (
                    <Cell
                      key={`cell-gender-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Tỉ lệ loại người dùng
              </h2>
              <PieChart width={300} height={300}>
                <Pie
                  data={getProviderData(users)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {getProviderData(users).map((entry, index) => (
                    <Cell
                      key={`cell-provider-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* Modal update */}
          {editingUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-[600px]">
                <h2 className="text-xl font-bold mb-4">Cập nhật người dùng</h2>
                <div className="mb-3">
                  <label className="block mb-1 text-sm">Họ tên</label>
                  <input
                    className="w-full border p-2 rounded"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1 text-sm">Email</label>
                  <input
                    className="w-full border p-2 rounded"
                    value={formData.email}
                    // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1 text-sm">SĐT</label>
                  <input
                    className="w-full border p-2 rounded"
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1 text-sm">Ngày sinh</label>
                  <input
                    type="date"
                    className="w-full border p-2 rounded"
                    value={formData.dob ? formData.dob.split("T")[0] : ""}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      setFormData({
                        ...formData,
                        dob: selectedDate.toISOString(),
                      }); // Lưu dưới dạng ISO
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-1 text-sm">Địa chỉ</label>
                  <input
                    className="w-full border p-2 rounded"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-around">
                  <div className="mb-3">
                    <label className="block mb-1 text-sm">Giới tính</label>
                    <select
                      className="w-full border p-2 rounded"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1 text-sm">Role</label>
                    <select
                      className="w-full border p-2 rounded"
                      value={formData.role_id}
                      onChange={(e) =>
                        setFormData({ ...formData, role_id: e.target.value })
                      }
                    >
                      <option value="">Chọn vai trò</option>
                      <option value="1">Admin</option>
                      <option value="2">Customer</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
