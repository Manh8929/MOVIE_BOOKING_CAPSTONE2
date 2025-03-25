import React, { useState } from "react";
import NowShowing from "../components/MovieListComponent/NowShowingFilm";
import ComingSoon from "../components/MovieListComponent/ComingSoonFilm";

const ViewAllFilm = () => {
    const [activeTab, setActiveTab] = useState("now-showing"); 
    return (
      <div className="mt-[80px] w-full flex flex-col items-center bg-gradient-to-br from-black via-black to-[#4f111e]">
        <div className="flex gap-4 my-4">
          <button
            className={`px-4 py-2 rounded transition-transform transform hover:-translate-y-1 ${
              activeTab === "now-showing"
                ? "bg-[#E63946] text-white"
                : "bg-[#7A1C1C] text-gray-300"
            }`}
            onClick={() => setActiveTab("now-showing")}
          >
            Phim Đang Chiếu
          </button>
          <button
            className={`px-4 py-2 rounded transition-transform transform hover:-translate-y-1 ${
              activeTab === "coming-soon"
                ? "bg-[#E63946] text-white"
                : "bg-[#7A1C1C] text-gray-300"
            }`}
            onClick={() => setActiveTab("coming-soon")}
          >
            Phim Sắp Chiếu
          </button>
        </div>

        {/* Hiển thị danh sách phim dựa trên state */}
        {activeTab === "now-showing" ? <NowShowing /> : <ComingSoon />}
      </div>
    );
};

export default ViewAllFilm;
