import React from "react";
import { useNavigate } from "react-router-dom";

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-center px-6 overflow-hidden">
      <div className="max-w-xl w-full animate-fade-in">
        {/* Icon with pulse */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/6195/6195696.png"
          alt="Under Construction"
          className="w-40 mx-auto mb-8 animate-pulse"
        />

        <h1 className="text-4xl font-bold mb-6 tracking-wider">
          Chúng tôi đang xây dựng!
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Trang web hiện đang trong quá trình hoàn thiện. Chúng tôi đang nỗ lực
          mang đến cho bạn trải nghiệm tuyệt vời nhất. Vui lòng quay lại sau
          nhé!
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => alert("Cảm ơn bạn đã ghé thăm!")}
            className="px-6 py-3 bg-white text-indigo-500 font-medium rounded-lg shadow-md hover:bg-indigo-500 hover:text-white transition transform hover:scale-105"
          >
            Thông báo cho tôi
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-white text-indigo-500 font-medium rounded-lg shadow-md hover:bg-indigo-500 hover:text-white transition transform hover:scale-105"
          >
            Về trang chủ
          </button>
        </div>
      </div>

      {/* Custom Tailwind Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default UnderConstruction;
