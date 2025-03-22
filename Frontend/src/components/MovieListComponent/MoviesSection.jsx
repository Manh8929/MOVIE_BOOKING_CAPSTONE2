import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import film1 from "../../assets/img/film/phim1.jpg";
import film2 from "../../assets/img/film/phim2.jpg";
import film3 from "../../assets/img/film/phim3.jpg";
import film4 from "../../assets/img/film/phim4.jpg";
import film5 from "../../assets/img/film/phim5.jpg";
import film6 from "../../assets/img/film/phim6.jpg";
import film7 from "../../assets/img/film/phim7.jpg";
import film8 from "../../assets/img/film/phim8.jpg";
import film9 from "../../assets/img/film/phim9.jpg";
import film10 from "../../assets/img/film/phim10.jpg";
import film11 from "../../assets/img/film/phim11.jpg";
import film12 from "../../assets/img/film/phim12.jpg";
import film13 from "../../assets/img/film/phim13.jpg";
import film14 from "../../assets/img/film/phim14.jpg";

const moviesNowShowing = [
    { title: "Sát thủ vô cùng cực", poster: film1, duration: 120, releaseDate: "20/03/2025" },
    { title: "Nhà gia tiên", poster: film2, duration: 98, releaseDate: "05/03/2025" },
    { title: "Sát thủ vô cùng cực", poster: film9, duration: 120, releaseDate: "20/03/2025" },
    { title: "Nhà gia tiên", poster: film5, duration: 98, releaseDate: "05/03/2025" },
    { title: "Sát thủ vô cùng cực", poster: film6, duration: 120, releaseDate: "20/03/2025" },
    { title: "Nhà gia tiên", poster: film7, duration: 98, releaseDate: "05/03/2025" },
    { title: "Sát thủ vô cùng cực", poster: film8, duration: 120, releaseDate: "20/03/2025" },
];

const moviesComingSoon = [
    { title: "Cô gái năm ấy ", poster: film3, duration: 113, releaseDate: "15/05/2025" },
    { title: "Bí kíp luyện rồng", poster: film4, duration: 102, releaseDate: "30/04/2025" },
    { title: "Sát thủ vô cùng cực", poster: film10, duration: 120, releaseDate: "20/03/2025" },
    { title: "Nhà gia tiên", poster: film11, duration: 98, releaseDate: "05/03/2025" },
    { title: "Sát thủ vô cùng cực", poster: film12, duration: 120, releaseDate: "20/03/2025" },
    { title: "Nhà gia tiên", poster: film13, duration: 98, releaseDate: "05/03/2025" },
    { title: "Sát thủ vô cùng cực", poster: film14, duration: 120, releaseDate: "20/03/2025" },
];

const MoviesSection = () => {
    const [showNowShowing, setShowNowShowing] = useState(true);

    return (
        <div className="container mx-auto px-8 py-10">
            {/* Phim Sections */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setShowNowShowing(true)}
                    className={`px-6 py-2 font-semibold rounded-lg transition-transform transform hover:-translate-y-1 ${showNowShowing ? "bg-[#E63946] text-white" : "bg-[#7A1C1C] text-gray-300"
                        }`}
                >
                    Phim Đang Chiếu
                </button>
                <button
                    onClick={() => setShowNowShowing(false)}
                    className={`px-6 py-2 font-semibold rounded-lg transition-transform transform hover:-translate-y-1 ${!showNowShowing ? "bg-[#E63946] text-white" : "bg-[#7A1C1C] text-gray-300"
                        }`}
                >
                    Phim Sắp Chiếu
                </button>
            </div>

            {/* State */}
            <MovieListComponent
                title={showNowShowing ? "Phim Đang Chiếu" : "Phim Sắp Chiếu"}
                movies={showNowShowing ? moviesNowShowing : moviesComingSoon}
            />
        </div>
    );
};

const MovieListComponent = ({ title, movies }) => {
    const navigate = useNavigate();
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
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="relative bg-gray-900 p-4 rounded-2xl shadow-lg overflow-hidden group transition-transform transform hover:scale-105">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-96 object-cover rounded-md"
                            />

                            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-3 transition-opacity duration-300">
                                <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-transform transform hover:-translate-y-3">
                                    Trailer
                                </button>
                                <button
                                    onClick={() => navigate('/booking-movie')}
                                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:translate-y-3">
                                    Đặt vé
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <h3 className="text-xl text-white font-bold truncate">{movie.title}</h3>
                                <p className="mt-2 text-gray-400">{movie.duration} phút</p>
                                <p className="mt-2 text-gray-400">Khởi chiếu: {movie.releaseDate}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};


export default MoviesSection;
