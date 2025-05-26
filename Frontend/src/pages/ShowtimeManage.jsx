import React, { useState, useEffect } from "react";
import Sidebar from "../components/Admin/SidebarAdm";
import { FaPlus, FaEye, FaTrash } from "react-icons/fa";
import * as adminService from "../services/adminService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ShowtimeManage = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newShowtime, setNewShowtime] = useState({
    movie: "",
    room: "",
    time: "",
    price: "",
    status: "scheduled",
  });
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      setError(null);
      try {
        const res = await adminService.getAllShowtimes();
        const resMovies = await adminService.getAdminMovies();
        const resScreens = await adminService.getAllScreens();
        console.log("res", res);
        console.log("resMovies", resMovies);
        console.log("resScreens", resScreens);
        setShowtimes(
          res.data.map((s) => ({
            id: s.showtime_id,
            movie: s.Movie?.title || "N/A",
            room: `${s.Screen?.screen_name || "N/A"} - ${s.Screen?.Theater?.name || "N/A"}`,
            time: s.show_time,
            price: s.ticket_price,
            status: s.status,
          }))
        );
        setMovies(resMovies.movies);
        setScreens(resScreens.screens);
      } catch (err) {
        setError("Lấy dữ liệu thất bại, vui lòng thử lại");
      } finally {
        setLoading(false);
      }
    }
    fetchInitialData();
  }, []);

  const handleAdd = async () => {
    const { movie, room, time, price, status } = newShowtime;
    if (!movie || !room || !time || !price) {
      toast.warning("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const body = {
        movieId: parseInt(movie),
        screenId: parseInt(room),
        show_time: time,
        ticket_price: parseInt(price),
        status,
      };
      const res = await adminService.createShowtime(body);

      const movieObj = movies.find((m) => m.movie_id === parseInt(movie));
      const screenObj = screens.find((r) => r.screen_id === parseInt(room));

      setShowtimes((prev) => [
        ...prev,
        {
          id: res.data.showtime_id,
          movie: movieObj?.title || "N/A",
          room: screenObj
            ? `${screenObj.screen_name} - ${screenObj.Theater?.name || ""}`
            : "N/A",
          time: time,
          price: price,
          status: status,
        },
      ]);

      setNewShowtime({
        movie: "",
        room: "",
        time: "",
        price: "",
        status: "scheduled",
      });
      setModalOpen(false);
      toast.success("Thêm suất chiếu thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Thêm suất chiếu thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xoá?")) return;

    try {
      await adminService.deleteShowtime(id);
      setShowtimes((prev) => prev.filter((item) => item.id !== id));
      toast.success("Xoá suất chiếu thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Xoá suất chiếu thất bại!");
    }
  };

  const handleUpdate = async () => {
    const { movie, room, time, price, status } = newShowtime;

    if (!movie || !room || !time || !price) {
      toast.warning("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const body = {
      movieId: parseInt(movie),
      screenId: parseInt(room),
      show_time: time,
      ticket_price: parseInt(price),
      status,
    };

    try {
      await adminService.updateShowtime(selectedShowtime.id, body);

      const updatedMovie = movies.find((m) => m.movie_id === parseInt(movie));
      const updatedScreen = screens.find((r) => r.screen_id === parseInt(room));

      setShowtimes((prev) =>
        prev.map((s) =>
          s.id === selectedShowtime.id
            ? {
                ...s,
                movie: updatedMovie?.title || "N/A",
                room: updatedScreen
                  ? `${updatedScreen.screen_name} - ${
                      updatedScreen.Theater?.name || ""
                    }`
                  : "N/A",
                time,
                price,
                status,
              }
            : s
        )
      );

      toast.success("Cập nhật suất chiếu thành công!");
      setModalOpen(false);
      setIsEditing(false);
      setSelectedShowtime(null);
      setNewShowtime({
        movie: "",
        room: "",
        time: "",
        price: "",
        status: "scheduled",
      });
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật suất chiếu thất bại!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">
            Quản lý suất chiếu
          </h1>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center gap-2"
            onClick={() => {
              setIsEditing(false); // đang thêm
              setNewShowtime({
                movie: "",
                room: "",
                time: "",
                price: "",
                status: "scheduled",
              });
              setModalOpen(true);
            }}
          >
            <FaPlus /> Thêm suất chiếu
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 text-left">Tên phim</th>
                <th className="p-3 text-left">Phòng</th>
                <th className="p-3 text-left">Thời gian</th>
                <th className="p-3 text-left">Giá vé (VND)</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {showtimes.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3 font-medium">{s.movie}</td>
                  <td className="p-3">{s.room}</td>
                  <td className="p-3">{new Date(s.time).toLocaleString()}</td>
                  <td className="p-3">{Number(s.price).toLocaleString()}</td>
                  <td className="p-3">{s.status}</td>
                  <td className="p-3 text-center space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSelectedShowtime(s);
                        setDetailOpen(true);
                      }}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(s.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      onClick={() => {
                        setSelectedShowtime(s);
                        setIsEditing(true); // đang sửa
                        setNewShowtime({
                          movie:
                            movies.find((m) => m.title === s.movie)?.movie_id ||
                            "",
                          room:
                            screens.find(
                              (r) => r.screen_name === s.room?.split(" - ")[0]
                            )?.screen_id || "",
                          time: new Date(s.time).toISOString().slice(0, 16), // datetime-local format
                          price: s.price,
                          status: s.status,
                        });
                        setModalOpen(true);
                      }}
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Tạo */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Thêm suất chiếu</h2>
              <div className="space-y-3">
                <select
                  className="border w-full px-3 py-2 rounded"
                  value={newShowtime.movie}
                  onChange={(e) =>
                    setNewShowtime({ ...newShowtime, movie: e.target.value })
                  }
                >
                  <option value="">-- Chọn phim --</option>
                  {movies?.map((m) => (
                    <option key={m.movie_id} value={m.movie_id}>
                      {m.title}
                    </option>
                  ))}
                </select>

                <select
                  className="border w-full px-3 py-2 rounded"
                  value={newShowtime.room}
                  onChange={(e) =>
                    setNewShowtime({ ...newShowtime, room: e.target.value })
                  }
                >
                  <option value="">-- Chọn phòng --</option>
                  {screens?.map((r) => (
                    <option key={r.screen_id} value={r.screen_id}>
                      {r.screen_name} - {r.Theater.name}
                    </option>
                  ))}
                </select>
                <input
                  type="datetime-local"
                  className="border w-full px-3 py-2 rounded"
                  value={newShowtime.time}
                  onChange={(e) =>
                    setNewShowtime({ ...newShowtime, time: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="border w-full px-3 py-2 rounded"
                  placeholder="Giá vé"
                  value={newShowtime.price}
                  onChange={(e) =>
                    setNewShowtime({ ...newShowtime, price: e.target.value })
                  }
                />

                <select
                  className="border w-full px-3 py-2 rounded"
                  value={newShowtime.status}
                  onChange={(e) =>
                    setNewShowtime({ ...newShowtime, status: e.target.value })
                  }
                >
                  <option value="scheduled">Đã lên lịch</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="canceled">Đã huỷ</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Huỷ
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={isEditing ? handleUpdate : handleAdd}
                >
                  {isEditing ? "Cập nhật" : "Lưu"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Chi tiết */}
        {detailOpen && selectedShowtime && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Chi tiết suất chiếu</h2>
              <p>
                <strong>Tên phim:</strong> {selectedShowtime.movie}
              </p>
              <p>
                <strong>Phòng:</strong> {selectedShowtime.room}
              </p>
              <p>
                <strong>Thời gian:</strong>{" "}
                {new Date(selectedShowtime.time).toLocaleString()}
              </p>
              <p>
                <strong>Giá vé:</strong>{" "}
                {Number(selectedShowtime.price).toLocaleString()} VND
              </p>
              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => setDetailOpen(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ShowtimeManage;
