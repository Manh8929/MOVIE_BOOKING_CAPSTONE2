import { useEffect, useState } from "react";
import SidebarAdm from "../components/Admin/SidebarAdm";
import EditMovie from "../components/Admin/EditMovie";
import { getAdminMovies, deleteAdminMovie } from "../services/adminService";

const AddMovieAdm = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); 

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
    console.log("Deleting movie with ID:", id); 
    if (confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      try {
        await deleteAdminMovie(id);
        fetchMovies();
      } catch (error) {
        console.error("Xóa thất bại:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarAdm />

      <div className="flex-1 p-6 bg-white overflow-y-auto">
        <header className="mb-6 flex justify-end items-center">
          <div className="flex items-center mr-6">
            <div className="w-10 h-10 bg-[#131c28] text-white flex justify-center items-center rounded-full font-semibold">
              ảnh
            </div>
            <span className="ml-3 text-xl font-semibold">Tên admin</span>
          </div>
        </header>

        <div className="border-t border-gray-300 mb-6"></div>

        <div className="flex justify-end mb-6">
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
            {movies.map((movie, index) => (
              <tr key={movie._id}>
                <td className="border-b border-r border-gray-300 p-4">
                  {index + 1}
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
                  {movie.status === "now_showing" ? "Đang chiếu" : "Sắp chiếu"}
                </td>
                <td className="border-b border-gray-300 p-4">
                  <button className="text-blue-500 mr-2">👁️</button>
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
      </div>

      {isEditModalOpen && (
        <EditMovie movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default AddMovieAdm;
