import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getUserPayments } from "../services/userService";
import { getAvailableMovies } from "../services/movieService";
const AIRecommendedFilms = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [preferredGenres, setPreferredGenres] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const token = localStorage.getItem("token");

      if (!currentUser || !token) {
        setMessage("Vui lòng đăng nhập để nhận đề xuất phim!");
        return;
      }

      try {
        const payments = await getUserPayments(currentUser.user_id, token);
        const genres = new Set();
        console.log("Payments data:", payments);

        payments.forEach((payment) => {
          const genreString = payment?.Booking?.Showtime?.Movie?.genre;
          if (genreString) {
            genreString.split(",").map((g) => genres.add(g.trim()));
          }
        });

        const genreList = Array.from(genres);
        if (genreList.length === 0) {
          setMessage(
            "Hiện tại chúng tôi vẫn chưa biết bạn thích phim nào, hãy đặt vé ngay!"
          );
          return;
        }

        setPreferredGenres(genreList.join(", "));

        const allMovies = await getAvailableMovies();
        const filtered = allMovies.filter((movie) => {
          return genreList.some((genre) =>
            movie.genre
              .split(",")
              .map((g) => g.trim())
              .includes(genre)
          );
        });

        setMovies(filtered);
        setMessage(
          `Chúng tôi nhận thấy bạn đã từng đặt các bộ phim thể loại ${genreList.join(
            ", "
          )}. Sau đây là các bộ phim thích hợp với sở thích của bạn.`
        );
      } catch (error) {
        console.error("Error loading recommendations:", error);
        setMessage("Đã xảy ra lỗi khi tải đề xuất.");
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="mt-[132px] max-w-[90%] mx-auto px-24 mt-10 bg-[#121212] text-white py-16 rounded-lg mb-[80px]">
      <h2 className="text-4xl font-bold text-center mb-6 text-white">
        Đề xuất phim theo sở thích của bạn
      </h2>
      <p className="text-center text-gray-300 mb-8">{message}</p>

      {movies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.movie_id}
              className="relative bg-[#1F2937] rounded-lg shadow-lg p-4 transition-transform transform hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate("/detail-film")}
            >
              <img
                src={movie.poster_url || movie.avatar_url}
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
                  Đánh giá: {movie.rating || "N/A"}
                </p>
                <button
                  onClick={(e) => {
                    navigate("/booking-movie");
                    e.stopPropagation();
                  }}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-5 rounded-lg transition-transform transform hover:scale-110 font-semibold"
                >
                  Đặt vé
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AIRecommendedFilms;
