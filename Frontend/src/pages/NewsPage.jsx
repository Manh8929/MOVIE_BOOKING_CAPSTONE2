import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { getNews } from "../services/userService";

const NewsPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // số tin cần hiện
    const navigate = useNavigate();

    useEffect(() => {
        getNews()
            .then((data) => {
                setNewsData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching news data:", error);
                setError("Không thể tải tin tức. Vui lòng thử lại.");
                setLoading(false);
            });
    }, []);
    //    // Lọc tin tức chỉ với category là "specific"
    // useEffect(() => {
    //     getNews()
    //         .then((data) => {
    //             // Lọc tin tức chỉ với category là "specific"
    //             const filteredNews = data.filter((news) => news.category === "specific");
    //             setNewsData(filteredNews); // storing the filtered data in state
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching news data:", error);
    //             setError("Không thể tải tin tức. Vui lòng thử lại.");
    //             setLoading(false);
    //         });
    // }, []);

    const indexOfLastNews = currentPage * pageSize;
    const indexOfFirstNews = indexOfLastNews - pageSize;
    const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);

    // next trang kế tiếp
    const nextPage = () => {
        if (currentPage < Math.ceil(newsData.length / pageSize)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // pre trang trước
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return <div className="text-white text-center">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="text-white text-center">{error}</div>;
    }

    return (
        <div className="mt-[80px] p-8 bg-gradient-to-br from-black via-black to-[#4f111e] min-h-screen">
            <h1 className="text-3xl font-bold text-white text-center flex justify-center items-center gap-2">
                <FaRegNewspaper size={32} /> Tin tức phim ảnh
            </h1>
            <div className="mt-6 max-w-4xl mx-auto">
                {currentNews.map((news) => (
                    <div
                        key={news.news_id}
                        onClick={() => navigate(`/news/${news.news_id}`)}
                        className="bg-gray-800 p-4 rounded-lg shadow-lg flex mb-6 
                        transition-transform transform hover:scale-110 hover:shadow-xl cursor-pointer border border-gray-700"
                    >
                        <img
                            src={news.image_url}
                            alt={news.title}
                            className="w-40 h-24 rounded-md object-cover"
                        />
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold text-white">{news.title}</h2>
                            <p className="text-gray-300 text-sm">
                                {news.content.length > 150 ? `${news.content.slice(0, 150)}...` : news.content}
                            </p>
                            <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
                                <MdDateRange size={16} className="text-gray-300" /> {new Date(news.published_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={prevPage}
                    className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
                    disabled={currentPage === 1}
                >
                    Trước
                </button>

                <span className="text-white">
                    Trang {currentPage} / {Math.ceil(newsData.length / pageSize)}
                </span>

                <button
                    onClick={nextPage}
                    className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
                    disabled={currentPage === Math.ceil(newsData.length / pageSize)}
                >
                    Sau
                </button>
            </div>

        </div>
    );
};

export default NewsPage;
