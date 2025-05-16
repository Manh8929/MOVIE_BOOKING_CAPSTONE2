import React, { useState, useEffect } from "react";
import { getAvailableMovies } from "../../services/movieService";
import TrailerModal from "../TrailerModalComponent/TrailerModalComponent";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MoviesSection = () => {
  const [showNowShowing, setShowNowShowing] = useState(true);
  const [moviesNowShowing, setMoviesNowShowing] = useState([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAvailableMovies();
        const nowShowing = data.filter((movie) => movie.status === "now_showing");
        const upcoming = data.filter((movie) => movie.status === "upcoming");
        setMoviesNowShowing(nowShowing);
        setMoviesComingSoon(upcoming);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    fetchMovies();
  }, []);

  const handleBooking = (movie) => {
    if (movie.status === "upcoming") {
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
    } else {
      navigate(`/theaters`);
    }
  };

  return (
    <div className="container mx-auto px-8 py-10">
      {/* Phim Sections */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowNowShowing(true)}
          className={`px-6 py-2 font-semibold rounded-lg transition-transform transform hover:-translate-y-1 ${showNowShowing ? "bg-[#E63946] text-white" : "bg-[#7A1C1C] text-gray-300"}`}
        >
          Phim Đang Chiếu
        </button>
        <button
          onClick={() => setShowNowShowing(false)}
          className={`px-6 py-2 font-semibold rounded-lg transition-transform transform hover:-translate-y-1 ${!showNowShowing ? "bg-[#E63946] text-white" : "bg-[#7A1C1C] text-gray-300"}`}
        >
          Phim Sắp Chiếu
        </button>
      </div>

      {/* Movie List */}
      <MovieListComponent
        title={showNowShowing ? "Phim Đang Chiếu" : "Phim Sắp Chiếu"}
        movies={showNowShowing ? moviesNowShowing : moviesComingSoon}
        handleBooking={handleBooking}
      />
      <ToastContainer />
    </div>
  );
};

const MovieListComponent = ({ title, movies, handleBooking }) => {
  const navigate = useNavigate();
  const [trailerUrl, setTrailerUrl] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white text-center mb-6 uppercase tracking-wide">
        {title}
      </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.movie_id}>
            <div
              className="relative bg-gray-900 p-4 rounded-2xl shadow-lg overflow-hidden group transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/detail-film/${movie.movie_id}`)}
            >
              <img
                src={movie.banner_url}
                alt={movie.title}
                className="w-full h-96 object-cover rounded-md cursor-pointer"
              />

              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-3 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTrailerUrl(movie.trailer_url);
                  }}
                  className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-transform transform hover:-translate-y-3"
                >
                  Trailer
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBooking(movie);
                  }}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:translate-y-3"
                >
                  Đặt vé
                </button>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-xl text-white font-bold truncate">{movie.title}</h3>
                <p className="mt-2 text-gray-400">{movie.duration} phút</p>
                <p className="mt-2 text-gray-400">Khởi chiếu: {new Date(movie.release_date).toLocaleDateString("vi-VN")}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {trailerUrl && <TrailerModal videoUrl={trailerUrl} onClose={() => setTrailerUrl("")} />}
    </div>
  );
};

export default MoviesSection;
