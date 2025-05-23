import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import {
  getAllTheaters,
  updateTheater,
  createTheater,
  deleteTheater,
} from "../services/adminService";
import SidebarAdm from "../components/Admin/SidebarAdm";
import ManageScreen from "../components/Admin/ManageScreen";

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [expandedTheaterId, setExpandedTheaterId] = useState(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [totalScreens, setTotalScreens] = useState(0);
  const [contact, setContact] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTheaters = theaters.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(theaters.length / itemsPerPage);

  const fetchTheaters = async () => {
    try {
      const data = await getAllTheaters();
      const theatersArray = Array.isArray(data) ? data : data.theaters || [];
      setTheaters(theatersArray);
    } catch (error) {
      console.error("Không thể tải danh sách rạp:", error);
      setTheaters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidPhoneNumber = (phone) => {
      // Loại bỏ khoảng trắng và dấu gạch ngang
      const cleaned = phone.replace(/[\s\-]/g, '');

      // Kiểm tra định dạng:
      // - Bắt đầu bằng 0
      // - Tiếp theo 9-10 chữ số (tổng cộng 10 hoặc 11 chữ số)
      return /^0\d{9,10}$/.test(cleaned);
    };


    if (!name || !location || !contact) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (!isValidPhoneNumber(contact)) {
      toast.error("Số điện thoại không hợp lệ! (phải bắt đầu bằng số 0 và có 10 chữ số)");
      toast.error(
        "Số điện thoại không hợp lệ!"
      );
      return;
    }

    setLoading(true);
    try {
      const theaterData = {
        name,
        location,
        contact,
        total_screens: totalScreens,
      };

      if (selectedTheater) {
        const updated = await updateTheater(selectedTheater.theater_id, theaterData);
        toast.success("Cập nhật rạp thành công!");
        setTheaters((prev) =>
          prev.map((t) => (t.theater_id === updated.theater_id ? updated : t))
        );
      } else {
        const created = await createTheater(theaterData);
        toast.success("Tạo rạp thành công!");
        setTheaters((prev) => [...prev, created]);
      }

      setName("");
      setLocation("");
      setTotalScreens(0);
      setContact("");
      setSelectedTheater(null);
      setShowForm(false);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (theater) => {
    setSelectedTheater(theater);
    setName(theater.name);
    setLocation(theater.location);
    setContact(theater.contact);
    setShowForm(true);
    setExpandedTheaterId(theater.theater_id);
  };

  const handleEditTheater = (theater) => {
    handleViewDetail(theater);
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const updated = await updateTheater(id, { status: newStatus });
      toast.success(`Cập nhật trạng thái thành công: ${newStatus}`);
      setTheaters((prev) =>
        prev.map((t) =>
          t.theater_id === id ? { ...t, status: updated.status } : t
        )
      );
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái!", error);
    }
  };

  const handleDeleteTheater = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa rạp này không?")) {
      try {
        await deleteTheater(id);
        setTheaters((prev) => prev.filter((t) => t.theater_id !== id));
        toast.success("Xóa thành công");
      } catch (error) {
        toast.error("Lỗi khi xóa rạp:", error);
      }
    }
  };

  const toggleDetail = (theater) => {
    if (expandedTheaterId === theater.theater_id) {
      setExpandedTheaterId(null);
    } else {
      setExpandedTheaterId(theater.theater_id);
    }
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <SidebarAdm />
      <div className="flex-1 p-6 bg-gray-50">
        <header className="mb-6 flex justify-start items-center">
          <div className="flex items-center ml-6">
            <span className="ml-3 text-xl font-semibold">Quản lý rạp chiếu phim</span>
          </div>
        </header>

        <div className="border-t border-gray-300 mb-6"></div>

        <div className="mb-4 text-right">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm
              ? selectedTheater
                ? "– Sửa Rạp Chiếu"
                : "– Thêm Rạp Chiếu"
              : "+ Thêm Rạp Chiếu"}
          </button>
        </div>

        {showForm && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {selectedTheater ? "Cập nhật Rạp Chiếu" : "Thêm Rạp Chiếu"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên Rạp</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tổng số phòng chiếu</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={totalScreens}
                  onChange={(e) => setTotalScreens(Number(e.target.value))}
                  min="1"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Số điện thoại liên hệ</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full p-2 bg-blue-600 text-white rounded-lg ${loading && "opacity-50 cursor-not-allowed"
                  }`}
                disabled={loading}
              >
                {loading
                  ? selectedTheater
                    ? "Đang cập nhật..."
                    : "Đang tạo..."
                  : selectedTheater
                    ? "Cập nhật Rạp Chiếu"
                    : "Tạo Rạp Chiếu"}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p>Đang tải...</p>
        ) : theaters.length === 0 ? (
          <p className="text-gray-500">Chưa có rạp nào</p>
        ) : (
          currentTheaters.map((theater) => (
            <div
              key={theater.id}
              className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <button
                    className="text-blue-500 hover:text-blue-700 hover:underline focus:outline-none"
                    onClick={() => handleViewDetail(theater)}
                  >
                    Xem chi tiết
                  </button>
                  <h2 className="text-xl font-semibold text-gray-800">{theater.name}</h2>
                </div>
                <div className="space-x-3">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 hover:underline focus:outline-none"
                    onClick={() => handleEditTheater(theater)}
                  >
                    Sửa
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 hover:underline focus:outline-none"
                    onClick={() => handleDeleteTheater(theater.theater_id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
              <button
                onClick={() => toggleDetail(theater)}
                className={`px-4 mb-2 py-2 rounded-md font-semibold transition duration-300 ${expandedTheaterId === theater.theater_id
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
              >
                {expandedTheaterId === theater.theater_id
                  ? "Ẩn"
                  : "Xem phòng chiếu"}
              </button>

              {expandedTheaterId === theater.theater_id && (
                <div className="mt-4">
                  <ManageScreen theaterId={theater.theater_id} />
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>
                  <h3 className="mb-2 text-black text-base">Địa điểm: {theater.location}</h3>
                  <p className="italic">Tổng số phòng chiếu: {theater.total_screens}</p>
                </div>
                <p
                  className={`italic ${theater.status === "active"
                    ? "text-green-600"
                    : theater.status === "maintenance"
                      ? "text-yellow-600"
                      : "text-red-600"
                    }`}
                >
                  Trạng thái:{" "}
                  {theater.status === "active"
                    ? "Hoạt động"
                    : theater.status === "maintenance"
                      ? "Bảo trì"
                      : "Ngừng hoạt động"}
                </p>
              </div>

              <div className="mt-2 space-x-2">
                {theater.status !== "active" && (
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleChangeStatus(theater.theater_id, "active")}
                  >
                    Kích hoạt
                  </button>
                )}
                {theater.status !== "maintenance" && (
                  <button
                    className="text-yellow-600 hover:underline"
                    onClick={() => handleChangeStatus(theater.theater_id, "maintenance")}
                  >
                    Bảo trì
                  </button>
                )}
                {theater.status !== "inactive" && (
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleChangeStatus(theater.theater_id, "inactive")}
                  >
                    Ngừng hoạt động
                  </button>
                )}
              </div>
            </div>
          ))
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-md border ${currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Theaters;
