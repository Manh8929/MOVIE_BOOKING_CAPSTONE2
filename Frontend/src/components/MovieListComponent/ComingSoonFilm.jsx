import React, { useEffect, useState } from "react";
import { getAvailableMovies } from "../../services/movieService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import rank1 from "../../assets/img/topMovie/top1.png";
import rank2 from "../../assets/img/topMovie/top2.png";
import rank3 from "../../assets/img/topMovie/top3.png";

import { useNavigate } from "react-router-dom";

const itemsPerPage = 8;

const CommingSoonFilms = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAvailableMovies();
        const sorted = data
          .filter((movie) => movie.status === "upcoming")
          .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)); // Top rating trước
        setMovies(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const currentMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBooking = (movie) => {
    toast.info(
      `Phim "${movie.title}" sắp được công chiếu vào ngày ${new Date(
        movie.release_date
      ).toLocaleDateString("vi-VN")}. Vui lòng chờ đến ngày khởi chiếu để đặt vé!`,
      {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      }
    );
  };

  const getRankIcon = (index) => {
    if (index === 0) return rank1;
    if (index === 1) return rank2;
    if (index === 2) return rank3;
    return null;
  };

  return (
    <div className="max-w-[90%] mx-auto px-6 md:px-24 mt-10 bg-[#121212] text-white py-16 rounded-lg mb-[80px]">
      <h2 className="text-4xl font-bold text-center mb-6 text-white">
        PHIM SẮP CHIẾU
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMovies.map((movie, index) => (
          <div
            onClick={() => navigate(`/detail-film/${movie.movie_id}`)}
            key={movie.movie_id}
            className="relative bg-[#1F2937] rounded-lg shadow-lg p-4 transition-transform transform hover:-translate-y-2 cursor-pointer"
          >
            {getRankIcon(index + (currentPage - 1) * itemsPerPage) && (
              <span className="absolute top-2 right-2">
                <img
                  src={getRankIcon(index + (currentPage - 1) * itemsPerPage)}
                  alt="Rank"
                  className="w-10 h-16"
                />
              </span>
            )}
            <img
              src={movie.banner_url}
              alt={movie.title}
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className="text-center mt-3">
              <h3 className="text-lg font-semibold truncate text-white">
                {movie.title}
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Thể loại: {movie.genre}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                {movie.duration} phút | {movie.rating}/10
              </p>
              <p className="mt-1 text-sm text-gray-300">
                Khởi chiếu:{" "}
                {new Date(movie.release_date).toLocaleDateString("vi-VN")}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBooking(movie);
                }}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-5 rounded-lg transition-transform transform hover:scale-110 font-semibold"
              >
                ĐẶT VÉ
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          className={`px-5 py-2 rounded transition-transform transform hover:-translate-y-1 font-bold ${
            currentPage === 1
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-[#E63946] text-white"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Trước
        </button>

        <span className="text-lg font-semibold">
          {currentPage} / {totalPages}
        </span>

        <button
          className={`px-5 py-2 rounded transition-transform transform hover:-translate-y-1 font-bold ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-[#E63946] text-white"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Sau
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CommingSoonFilms;
