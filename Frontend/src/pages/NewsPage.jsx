import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { newsData } from "../components/News/NewData";

const NewsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="mt-[80px] p-8 bg-gradient-to-br from-black via-black to-[#4f111e] min-h-screen">
            <h1 className="text-3xl font-bold text-white text-center flex justify-center items-center gap-2">
                <FaRegNewspaper size={32} /> Tin tức phim ảnh
            </h1>
            <div className="mt-6 max-w-4xl mx-auto">
                {newsData.map((news) => (
                    <div 
                        key={news.id}
                        onClick={() => navigate(`/news/${news.id}`)}
                        className="bg-gray-800 p-4 rounded-lg shadow-lg flex mb-6 
                        transition-transform transform hover:scale-110 hover:shadow-xl cursor-pointer border border-gray-700"
                    >
                        <img src={news.image} alt={news.title} 
                            className="w-40 h-24 rounded-md object-cover" />
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold text-white">{news.title}</h2>
                            <p className="text-gray-300 text-sm">
                                {news.description.length > 150 ? `${news.description.slice(0, 150)}...` : news.description}
                            </p>
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
