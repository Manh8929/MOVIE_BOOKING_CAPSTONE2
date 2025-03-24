import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const newsData = [
    {
        id: 1,
        title: "Avengers 5 chính thức khởi quay!",
        description: "Bộ phim siêu anh hùng được mong chờ nhất sẽ trở lại vào năm 2025.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZM0Yptx6LKKYmOspdCVbXAiwuXYyIYaku-g&s",
        date: "24/03/2025"
    },
    {
        id: 2,
        title: "Top 10 phim đáng xem nhất tháng này",
        description: "Danh sách những bộ phim không thể bỏ lỡ tại rạp trong tháng 3.",
        image: "https://static.gamehub.vn/images/2024/10/22/gamehubvn-avengers-doomsday-an-dinh-ngay-khoi-quay-1.jpg",
        date: "22/03/2025"
    },
    {
        id: 3,
        title: "John Wick 5 có thực sự xảy ra?",
        description: "Sau cái kết đầy cảm xúc của phần 4, liệu Keanu Reeves có tiếp tục?",
        image: "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2023/9/19/keanu-reeves-john-wick-chapter-4-1677167115-16950967850691310563596.jpg",
        date: "20/03/2025"
    }
];

const NewsPage = () => {
    return (
        <div className="mt-[80px] p-8 bg-gradient-to-br from-black via-black to-[#4f111e] min-h-screen">

            <h1 className="text-3xl font-bold text-white text-center flex justify-center items-center gap-2">
                <FaRegNewspaper size={32} /> Tin tức phim ảnh
            </h1>

            <div className="mt-6 max-w-4xl mx-auto">
                {newsData.map((news) => (
                    <div key={news.id} 
                        className="bg-gray-800 p-4 rounded-lg shadow-lg flex mb-6 
                        transition-transform transform hover:scale-110 hover:shadow-xl cursor-pointer border border-gray-700">
                        
                        <img src={news.image} alt={news.title} 
                            className="w-40 h-24 rounded-md object-cover" />
                        
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold text-white">{news.title}</h2>
                            <p className="text-gray-300 text-sm">{news.description}</p>
                            <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
                                <MdDateRange size={16} className="text-gray-300" /> {news.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
