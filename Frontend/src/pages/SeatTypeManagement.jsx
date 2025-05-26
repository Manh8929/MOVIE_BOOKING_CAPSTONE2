import React, { useEffect, useState } from "react";
import Sidebar from "../components/Admin/SidebarAdm";
import * as adminService from "../services/adminService";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const SeatTypeManagement = () => {
  const [seatTypes, setSeatTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSeatType, setNewSeatType] = useState({ name: "", price: "" });
  const [editModal, setEditModal] = useState(false);
  const [selectedSeatType, setSelectedSeatType] = useState(null);

  const fetchSeatTypes = async () => {
    setLoading(true);
    try {
      const data = await adminService.getSeatTypes();
      console.log("data", data);
      setSeatTypes(data.seatTypes);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tải loại ghế");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeatTypes();
  }, []);

  const handleCreate = async () => {
    if (!newSeatType.name || !newSeatType.price) {
      return toast.warning("Điền đầy đủ thông tin");
    }
    try {
      await adminService.createSeatType(newSeatType);
      toast.success("Tạo thành công");
      setNewSeatType({ name: "", price: "" });
      fetchSeatTypes();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tạo");
    }
  };

  const handleUpdate = async () => {
    try {
      await adminService.updateSeatType(selectedSeatType.seat_type_id, {
        name: selectedSeatType.name,
        price: selectedSeatType.price,
      });
      toast.success("Cập nhật thành công");
      setEditModal(false);
      fetchSeatTypes();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi cập nhật");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xoá loại ghế này?")) return;
    try {
      await adminService.deleteSeatType(id);
      toast.success("Đã xoá thành công");
      fetchSeatTypes();
    } catch (err) {
      console.error(err);
      toast.error("Xoá thất bại");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Quản lý loại ghế</h1>

        <div className="flex gap-4 items-center mb-6">
          <select
            className="border px-3 py-2 rounded"
            value={newSeatType.name}
            onChange={(e) =>
              setNewSeatType({ ...newSeatType, name: e.target.value })
            }
          >
            <option value="">-- Chọn loại --</option>
            <option value="regular">Ghế thường</option>
            <option value="vip">Ghế VIP</option>
            <option value="couple">Ghế đôi</option>
            {/* <option value="disabled">Ghế người khuyết tật</option> */}
          </select>
          <input
            placeholder="Giá"
            type="number"
            className="border px-3 py-2 rounded"
            value={newSeatType.price}
            onChange={(e) =>
              setNewSeatType({ ...newSeatType, price: e.target.value })
            }
          />
          <button onClick={handleCreate} className="btn-primary">
            ➕ Thêm
          </button>
        </div>

        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Tên loại</th>
              <th className="px-4 py-2 text-left">Giá</th>
              <th className="px-4 py-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {seatTypes.map((s) => (
              <tr key={s.seat_type_id} className="border-t">
                <td className="px-4 py-2 capitalize">{s.name}</td>
                <td className="px-4 py-2">
                  {Number(s.price).toLocaleString()}₫
                </td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedSeatType(s);
                      setEditModal(true);
                    }}
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(s.seat_type_id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal cập nhật */}
        {editModal && selectedSeatType && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">Chỉnh sửa loại ghế</h2>
              <input
                className="w-full mb-3 px-3 py-2 border rounded"
                value={selectedSeatType.name}
                onChange={(e) =>
                  setSelectedSeatType({
                    ...selectedSeatType,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="number"
                className="w-full mb-3 px-3 py-2 border rounded"
                value={selectedSeatType.price}
                onChange={(e) =>
                  setSelectedSeatType({
                    ...selectedSeatType,
                    price: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-3">
                <button onClick={() => setEditModal(false)}>Huỷ</button>
                <button onClick={handleUpdate} className="btn-primary">
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    </div>
  );
};

export default SeatTypeManagement;
