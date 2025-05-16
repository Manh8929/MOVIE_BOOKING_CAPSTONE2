import React, { useEffect, useState } from "react";
import Sidebar from "../components/Admin/SidebarAdm";
import { FaEdit, FaTrash } from "react-icons/fa";
import * as adminService from "../services/adminService";

const SeatsManagement = () => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterShowtime, setFilterShowtime] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [screens, setScreens] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [newSeats, setNewSeats] = useState({
    screen_id: "",
    showtime_id: "",
    total_seats: "",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const data = await adminService.getAllScreens(token);
        console.log("scre", data);
        setScreens(data);
      } catch (err) {
        console.error("Không thể tải danh sách phòng chiếu", err);
      }
    };

    fetchScreens();
  }, [token]);

  const handleScreenChange = (e) => {
    const selectedId = e.target.value;
    const selectedScreen = screens.find(
      (s) => String(s.screen_id) === selectedId
    );

    setNewSeats({
      ...newSeats,
      screen_id: selectedId,
      total_seats: selectedScreen ? selectedScreen.total_seats : "",
    });
  };

  useEffect(() => {
    const loadShowtimes = async () => {
      try {
        const data = await adminService.fetchShowtimes(); // gọi API thật
        setShowtimes(data);
      } catch (error) {
        console.error("Không thể load lịch chiếu", error);
      }
    };

    loadShowtimes();
  }, []);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllSeats(); // Gọi API để lấy danh sách ghế
      console.log("data", data);
      setSeats(data);
    } catch (error) {
      console.error("Lỗi khi tải ghế:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("selectedSeat", selectedSeat);

  const handleCreateSeats = async () => {
    if (!newSeats.screen_id || !newSeats.showtime_id || !newSeats.total_seats) {
      return alert("Vui lòng chọn đầy đủ thông tin.");
    }
    try {
      const res = await adminService.createSeats(
        newSeats.showtime_id,
        newSeats.screen_id,
        newSeats.total_seats
      ); // Gọi API để tạo ghế
      console.log("res", res);
      alert("Tạo ghế thành công.");
      setModalOpen(false);
      fetchSeats(); // Tải lại danh sách ghế
    } catch (error) {
      console.error("Lỗi khi tạo ghế:", error);
    }
  };

  const toggleSeatAvailability = (seatIndex) => {
    const updated = [...seats];
    updated[seatIndex].is_available = !updated[seatIndex].is_available;
    setSeats(updated);
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const filteredSeats = filterShowtime
    ? seats.filter((s) => s.showtime_id === filterShowtime)
    : seats;
  const openEditModal = (seat) => {
    setSelectedSeat(seat);
    setEditModalOpen(true);
  };
  const handleUpdateSeat = async () => {
    try {
      await adminService.updateSeat(selectedSeat.seat_id, selectedSeat); // Gọi API để cập nhật ghế
      alert("Đã cập nhật ghế.");
      setEditModalOpen(false);
      fetchSeats();
    } catch (error) {
      console.error("Lỗi khi cập nhật ghế:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Quản lý ghế</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="font-bold py-3 px-6 rounded-md border-2 border-gray-400 text-lg"
          >
            ➕ Tạo ghế
          </button>
        </div>

        {/* Bộ lọc */}
        <div className="mb-4 flex gap-4 items-center">
          <input
            type="text"
            placeholder="Lọc theo showtime_id"
            className="border px-3 py-2 rounded-md"
            value={filterShowtime}
            onChange={(e) => setFilterShowtime(e.target.value)}
          />
          <button
            onClick={() => setFilterShowtime("")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Xóa lọc
          </button>
        </div>

        {/* Bảng ghế */}
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <table className="w-full bg-white shadow rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Số ghế</th>
                <th className="px-4 py-2 text-left">Loại</th>
                <th className="px-4 py-2 text-left">Giá</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredSeats.map((seat, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{seat.seat_number}</td>
                  <td className="px-4 py-2 capitalize">{seat.seat_type}</td>
                  <td className="px-4 py-2">{seat.price.toLocaleString()}₫</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        seat.is_available
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {seat.is_available ? "Còn trống" : "Đã đặt"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-3">
                    <button
                      title="Chỉnh sửa"
                      onClick={() => openEditModal(seat)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      title="Xoá"
                      onClick={() => {
                        if (window.confirm("Bạn có chắc muốn xoá ghế này?")) {
                          alert("Đã xoá ghế (giả lập)");
                          fetchSeats();
                        }
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* MODAL tạo ghế */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
              <h2 className="text-xl font-semibold mb-4">Tạo ghế tự động</h2>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Phòng chiếu</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={newSeats.screen_id}
                  onChange={handleScreenChange}
                >
                  <option value="">-- Chọn phòng chiếu --</option>
                  {screens.map((screen) => (
                    <option key={screen.screen_id} value={screen.screen_id}>
                      {screen.screen_name} - {screen.screen_type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Showtime</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={newSeats.showtime_id}
                  onChange={(e) =>
                    setNewSeats({ ...newSeats, showtime_id: e.target.value })
                  }
                >
                  <option value="">Chọn suất chiếu</option>
                  {showtimes.map((s) => (
                    <option key={s.showtime_id} value={s.showtime_id}>
                      {s.Movie?.title} -{" "}
                      {new Date(s.show_time).toLocaleString("vi-VN")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Số lượng ghế</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={newSeats.total_seats}
                  readOnly // chỉ đọc vì tự set
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button variant="outline" onClick={() => setModalOpen(false)}>
                  Hủy
                </button>
                <button onClick={handleCreateSeats}>Tạo</button>
              </div>

              {/* Close icon (X) */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-lg"
              >
                &times;
              </button>
            </div>
          </div>
        )}
        {/* MODAL UPDATE GHẾ */}
        {editModalOpen && selectedSeat && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
              <h2 className="text-xl font-semibold mb-4">
                Cập nhật ghế {selectedSeat.seat_number}
              </h2>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Loại ghế</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedSeat.seat_type}
                  onChange={(e) =>
                    setSelectedSeat({
                      ...selectedSeat,
                      seat_type: e.target.value,
                    })
                  }
                >
                  <option value="regular">Regular</option>
                  <option value="vip">VIP</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Giá</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={selectedSeat.price}
                  onChange={(e) =>
                    setSelectedSeat({
                      ...selectedSeat,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Trạng thái</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedSeat.is_available ? "1" : "0"}
                  onChange={(e) =>
                    setSelectedSeat({
                      ...selectedSeat,
                      is_available: e.target.value === "1",
                    })
                  }
                >
                  <option value="1">Còn trống</option>
                  <option value="0">Đã đặt</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                >
                  Hủy
                </button>
                <button onClick={handleUpdateSeat}>Lưu thay đổi</button>
              </div>

              <button
                onClick={() => setEditModalOpen(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-lg"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatsManagement;
