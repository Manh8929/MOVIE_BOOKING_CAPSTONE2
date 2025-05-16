import React, { useEffect, useState } from "react";
import {
  getAllScreens,
  createScreen,
  updateScreen,
  deleteScreen,
} from "../../services/adminService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const screenTypes = ["2D", "3D", "IMAX"];

const ManageScreen = ({ theaterId }) => {
  const [screens, setScreens] = useState([]);
  const [formData, setFormData] = useState({
    screen_name: "",
    total_seats: "",
    screen_type: screenTypes[0],
    status: "available",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchScreens();
  }, [theaterId]);

  const fetchScreens = async () => {
    try {
      const data = await getAllScreens();
      const filteredScreens = data.screens.filter(
        (screen) => screen.theater_id === theaterId
      );
      setScreens(filteredScreens);
    } catch (err) {
      toast.error("Lỗi khi lấy danh sách phòng chiếu");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, theater_id: theaterId };

    console.log(formData)

    if (formData.total_seats <= 0) {
      toast.error("Sức chứa phải là số nguyên dương lớn hơn 0");
      return;
    }

    try {
      if (isEdit) {
        await updateScreen(editingId, payload);
        toast.success("Cập nhật phòng chiếu thành công");
      } else {
        await createScreen(payload);
        toast.success("Thêm phòng chiếu thành công");
      }

      resetForm();
      fetchScreens();
    } catch (err) {
      toast.error("Lỗi khi thêm/cập nhật phòng chiếu");
      console.error(err);
    }
  };

  const handleEdit = (screen) => {
    setFormData({
      screen_name: screen.screen_name,
      total_seats: screen.total_seats,
      screen_type: screen.screen_type || screenTypes[0],
      status: screen.status || "available",
    });
    setIsEdit(true);
    setEditingId(screen.screen_id);
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa phòng chiếu này không?")) {
      try {
        await deleteScreen(id);
        toast.success("Xóa phòng chiếu thành công");
        fetchScreens();
      } catch (err) {
        toast.error("Lỗi khi xóa phòng chiếu");
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      screen_name: "",
      total_seats: "",
      screen_type: screenTypes[0],
      status: "available",
    });
    setIsEdit(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <ToastContainer />

      <h2 className="text-xl font-semibold mb-4">
        Danh sách phòng chiếu của rạp
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="screen_name"
          value={formData.screen_name}
          placeholder="Tên phòng chiếu"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="number"
          name="total_seats"
          value={formData.total_seats}
          placeholder="Sức chứa"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />
        <select
          name="screen_type"
          value={formData.screen_type}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {screenTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="available">Đang hoạt động</option>
          <option value="maintenance">Bảo trì</option>
          <option value="unavailable">Đóng cửa</option>
        </select>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEdit ? "Cập nhật phòng chiếu" : "Thêm phòng chiếu"}
          </button>
        </div>
      </form>

      {/* Danh sách */}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Sức chứa</th>
            <th className="p-2 border">Loại</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {screens.length > 0 ? (
            screens.map((screen, idx) => (
              <tr key={screen.screen_id}>
                <td className="p-2 border text-center">{idx + 1}</td>
                <td className="p-2 border">{screen.screen_name}</td>
                <td className="p-2 border text-center">{screen.total_seats}</td>
                <td className="p-2 border text-center">{screen.screen_type}</td>
                <td className="p-2 border text-center">
                  {screen.status === "available"
                    ? "Đang hoạt động"
                    : screen.status === "maintenance"
                      ? "Bảo trì"
                      : screen.status === "unavailable"
                        ? "Đóng cửa"
                        : screen.status}
                </td>

                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(screen)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(screen.screen_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                Không có phòng chiếu nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScreen;
