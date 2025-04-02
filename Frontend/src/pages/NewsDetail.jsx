import { useNavigate, useParams } from "react-router-dom";
import newsData from "../components/News/NewData";
import { MdDateRange } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

const NewsDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const news = newsData.find((item) => item.id === parseInt(id));

    if (!news) {
        return (
            <div className="mt-[80px] flex justify-center items-center min-h-screen">
                <span className="text-3xl text-red-600">Tin tức không tồn tại</span>
            </div>
        );
    }

    return (
        <div className="mt-[80px] p-8 bg-gradient-to-br from-black via-black to-[#4f111e] min-h-screen flex flex-col items-center">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-red-600 hover:text-red-300 mb-4 self-start ml-8"
            >
                <FaArrowLeft className="mr-2" />
                Quay lại
            </button>

            <h1 className="text-4xl font-bold text-white mb-4 text-center">{news.title}</h1>

            <img
                src={news.image}
                alt={news.title}
                className="w-full max-w-2xl h-auto rounded-lg shadow-lg border border-gray-600"
            />

            <p className="text-gray-400 mt-4 flex items-center gap-2 text-lg">
                <MdDateRange size={22} className="text-gray-300" /> {news.date}
            </p>

            <div className="mt-4 max-w-2xl px-4 text-gray-300 text-lg text-center leading-relaxed 
                overflow-y-auto max-h-[150px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {news.description}
            </div>
        </div>
    );
};

export default NewsDetail;
