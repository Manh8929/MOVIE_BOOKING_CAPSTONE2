import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import SidebarAdm from "../components/Admin/SidebarAdm";
import MovieDetailModal from "../components/Admin/MovieDetailModal";
import ManagerMovies from "../components/Admin/ManagerMovies";
import { getAdminMovies, deleteAdminMovie } from "../services/adminService";
const AddMovieAdm = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [viewingMovie, setViewingMovie] = useState(null);

  // search phim
  const [searchTerm, setSearchTerm] = useState("");
  
  // không phân biệt chữ có dấu hay ko
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filteredMovies = movies.filter((movie) =>
    removeVietnameseTones(movie.title).includes(
      removeVietnameseTones(searchTerm)
    )
  );

  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const fetchMovies = async () => {
    try {
      const data = await getAdminMovies();
      console.log("Movies data:", data);

      if (Array.isArray(data.movies)) {
        setMovies(data.movies);
      } else {
        console.error(
          "Dữ liệu không chứa thuộc tính movies hoặc movies không phải là mảng!"
        );
        setMovies([]);
      }
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const openModal = (movie = null) => {
    setSelectedMovie(movie);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedMovie(null);
    fetchMovies();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa phim này?");
    if (!confirmed) return;
  
    try {
      await deleteAdminMovie(id);
      toast.success("Xóa phim thành công!");
      fetchMovies();
    } catch (error) {
      toast.error("Xóa phim thất bại!");
      console.error("Xóa thất bại:", error);
    }
  };
  

  return (
    <div className="flex h-screen">
      <SidebarAdm />

      <div className="flex-1 p-6 bg-white overflow-y-auto">
        <header className="mb-6 flex justify-start items-center">
          <div className="flex items-center ml-6">
            <span className="ml-3 text-xl font-semibold">Quản lý phim</span>
          </div>
        </header>


        <div className="border-t border-gray-300 mb-6"></div>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Tìm phim theo tên..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-full px-4 py-2 w-1/3"
          />

          <button
            className="bg-[#131c28] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1a2636]"
            onClick={() => openModal()}
          >
            + Thêm mới
          </button>
        </div>

        <table className="w-full table-auto border-separate border-spacing-0 border border-gray-300">
          <thead>
            <tr>
              <th className="border-b-2 border-r-2 border-gray-400 p-4 text-left">
                STT
              </th>
              <th className="border-b-2 border-r-2 border-gray-400 p-4 text-left">
                Banner Phim
              </th>
              <th className="border-b-2 border-r-2 border-gray-400 p-4 text-left">
                Tiêu đề
              </th>
              <th className="border-b-2 border-r-2 border-gray-400 p-4 text-left">
                Trạng thái
              </th>
              <th className="border-b-2 border-gray-400 p-4 text-left">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMovies.map((movie, index) => (
              <tr key={movie._id}>
                <td className="border-b border-r border-gray-300 p-4">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="border-b border-r border-gray-300 p-4">
                  <img
                    src={
                      movie.banner_url || "https://via.placeholder.com/100x150"
                    }
                    alt={movie.title}
                    className="w-[100px] h-auto"
                  />
                </td>
                <td className="border-b border-r border-gray-300 p-4">
                  {movie.title}
                </td>
                <td className="border-b border-r border-gray-300 p-4">
                  {movie.status === "now_showing"
                    ? "Đang chiếu"
                    : movie.status === "upcoming"
                    ? "Sắp chiếu"
                    : movie.status === "ended"
                    ? "Đã ngừng chiếu"
                    : "Không xác định"}
                </td>
                <td className="border-b border-gray-300 p-4">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => setViewingMovie(movie)}
                  >
                    👁️
                  </button>
                  <button
                    className="text-yellow-500 mr-2"
                    onClick={() => openModal(movie)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(movie.movie_id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {movies.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border rounded-full ${
                  currentPage === i + 1
                    ? "bg-[#131c28] text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <ManagerMovies movie={selectedMovie} onClose={closeModal} />
      )}
      {viewingMovie && (
        <MovieDetailModal
          movie={viewingMovie}
          onClose={() => setViewingMovie(null)}
        />
      )}
    </div>
  );
};

export default AddMovieAdm;
