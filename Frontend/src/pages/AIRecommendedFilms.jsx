import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import phim1 from "../assets/img/film/phim1.jpg";
import phim2 from "../assets/img/film/phim2.jpg";
import phim3 from "../assets/img/film/phim3.jpg";
import phim4 from "../assets/img/film/phim4.jpg";
import phim5 from "../assets/img/film/phim5.jpg";
import phim6 from "../assets/img/film/phim6.jpg";

const recommendedMovies = [
    { id: 1, title: "test", genre: "Hành Động, Khoa Học Viễn Tưởng", rating: "C16", image: phim1 },
    { id: 2, title: "test", genre: "Tâm Lý, Kinh Dị", rating: "C18", image: phim2 },
    { id: 3, title: "test", genre: "Phiêu Lưu, Khoa Học Viễn Tưởng", rating: "C16", image: phim3 },
    { id: 4, title: "test", genre: "Hành Động, Khoa Học Viễn Tưởng", rating: "C16", image: phim4 },
    { id: 5, title: "test", genre: "Tâm Lý, Kinh Dị", rating: "C18", image: phim5 },
    { id: 6, title: "test", genre: "Phiêu Lưu, Khoa Học Viễn Tưởng", rating: "C16", image: phim6 },
    { id: 7, title: "test", genre: "Tâm Lý, Kinh Dị", rating: "C18", image: phim5 },
    { id: 8, title: "test", genre: "Phiêu Lưu, Khoa Học Viễn Tưởng", rating: "C16", image: phim6 },
];

const AIRecommendedFilms = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState(recommendedMovies);
    const [preferredGenres, setPreferredGenres] = useState("");

    useEffect(() => {
        const bookingHistory = ["Hành Động", "Khoa Học Viễn Tưởng", "Tâm Lý"];
        setPreferredGenres(bookingHistory.join(", "));
    }, []);

    return (
        <div className="mt-[132px] max-w-[90%] mx-auto px-24 mt-10 bg-[#121212] text-white py-16 rounded-lg mb-[80px]">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
                Đề xuất phim theo sở thích của bạn
            </h2>
            <p className="text-center text-gray-300 mb-8">
                Dựa trên các lần đặt vé trước, chúng tôi nhận thấy bạn yêu thích các thể loại: <span className="text-red-500 font-semibold">{preferredGenres}</span>.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="relative bg-[#1F2937] rounded-lg shadow-lg p-4 transition-transform transform hover:-translate-y-2 cursor-pointer"
                        onClick={() => navigate("/detail-film")}
                    >
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-72 object-cover rounded-lg"
                        />
                        <div className="text-center mt-3">
                            <h3 className="text-lg font-semibold truncate text-white">
                                {movie.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-300">Thể loại: {movie.genre}</p>
                            <p className="mt-1 text-sm text-gray-300">Độ tuổi: {movie.rating}</p>
                            <button
                                onClick={(e) => {
                                    navigate('/booking-movie');
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
            <ToastContainer />
        </div>
    );
};

export default AIRecommendedFilms;