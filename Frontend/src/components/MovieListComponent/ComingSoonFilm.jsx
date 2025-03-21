import React, { useState } from 'react';
import film1 from "../../assets/img/film/phim8.jpg";
import film2 from "../../assets/img/film/phim9.jpg";
import film3 from "../../assets/img/film/phim10.jpg";
import film4 from "../../assets/img/film/phim11.jpg";
import film5 from "../../assets/img/film/phim12.jpg";
import film6 from "../../assets/img/film/phim13.jpg";
import film7 from "../../assets/img/film/phim14.jpg";
import rank1 from "../../assets/img/topMovie/top1.png";
import rank2 from "../../assets/img/topMovie/top2.png";
import rank3 from "../../assets/img/topMovie/top3.png";

const commingSoonMovies = [
    { id: 1, title: "Quỷ Nhập Tràng (T18)", genre: "Kinh Dị", duration: "120 phút", rating: "C18", releaseDate: "05-03-2025", image: film1, rank: rank1 },
    { id: 2, title: "Nhà Gia Tiến (T18)", genre: "Hài, Gia Đình", duration: "117 phút", rating: "C18", releaseDate: "21-02-2025", image: film2, rank: rank2 },
    { id: 3, title: "(Lồng Tiếng) Sát Thủ Vô Cùng Cực", genre: "Hài", duration: "107 phút", rating: "C16", releaseDate: "12-03-2025", image: film3, rank: rank3 },
    { id: 4, title: "Lạc Trôi (P)", genre: "Hoạt Hình", duration: "85 phút", rating: "P", releaseDate: "07-03-2025", image: film4 },
    { id: 5, title: "Anh Không Đau (T18)", genre: "Hành Động", duration: "N/A", rating: "T18", releaseDate: "19-03-2025", image: film5 },
    { id: 6, title: "Mickey 17 (T18)", genre: "Phiêu Lưu", duration: "N/A", rating: "T18", releaseDate: "N/A", image: film6 },
    { id: 7, title: "Tiếng Vọng Kinh Hoàng", genre: "Kinh Dị", duration: "N/A", rating: "N/A", releaseDate: "14-03-2025", image: film7 },
];
const itemsPerPage = 8;

const CommingSoonFilms = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(commingSoonMovies.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovies = commingSoonMovies.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="max-w-[90%] mx-auto px-24 mt-10 bg-[#121212] text-white py-16 rounded-lg mb-[80px]">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">PHIM ĐANG CHIẾU</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentMovies.map((movie) => (
                    <div key={movie.id} className="relative bg-[#1F2937] rounded-lg shadow-lg p-4 transition-transform transform hover:-translate-y-2 cursor-pointer">
                        {movie.rank && (
                            <span className="absolute top-2 right-2">
                                <img src={movie.rank} alt="Rank" className="w-10 h-16" />
                            </span>
                        )}
                        <img src={movie.image} alt={movie.title} className="w-full h-72 object-cover rounded-lg" />
                        <div className="text-center mt-3">
                            <h3 className="text-lg font-semibold truncate text-white">{movie.title}</h3>
                            <p className="mt-1 text-sm text-gray-300">Thể loại: {movie.genre}</p>
                            <p className="mt-1 text-sm text-gray-300">{movie.duration} | {movie.rating}</p>
                            <p className="mt-1 text-sm text-gray-300">Khởi chiếu: {movie.releaseDate}</p>
                            <button className="mt-3 bg-green-600 text-white text-sm py-2 px-5 rounded-lg transition-transform transform hover:scale-110 font-semibold">
                                ĐẶT VÉ
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8 space-x-4">
                <button
                    className={`px-5 py-2 rounded transition-transform transform hover:-translate-y-1 font-bold ${currentPage === 1 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-yellow-500 text-black hover:bg-yellow-400"}`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Trước
                </button>

                <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>

                <button
                    className={`px-5 py-2 rounded transition-transform transform hover:-translate-y-1 font-bold ${currentPage === totalPages ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-yellow-500 text-black hover:bg-yellow-400"}`}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Sau
                </button>
            </div>
        </div>
    );
};

export default CommingSoonFilms;
