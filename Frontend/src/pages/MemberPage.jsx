import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTicketAlt, FaHeart } from "react-icons/fa";

const benefits = [
  "Có cơ hội nhận được những voucher hấp dẫn",
  "Tham gia các sự kiện điện ảnh độc quyền",
];

const MemberPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    return (
      <div className="mt-[80px] bg-gradient-to-br from-black via-black to-[#4f111e] min-h-screen flex flex-col items-center justify-center p-8 text-white text-center">
        <FaHeart size={50} className="text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">CẢM ƠN BẠN ĐÃ TIN TƯỞNG MVB CINEMA!</h1>
        <p className="text-lg max-w-2xl">
          Chúng tôi rất biết ơn vì sự đồng hành của bạn. Chúc bạn có những trải nghiệm điện ảnh thật tuyệt vời và đầy cảm xúc cùng MVB Cinema!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-[80px] bg-gradient-to-br from-black via-black to-[#4f111e] min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-white mb-6 flex justify-center items-center gap-2">
        <FaTicketAlt size={32} className="text-red-500" /> QUYỀN LỢI THÀNH VIÊN MVB CINEMA
      </h1>

      <p className="text-center text-gray-300 max-w-3xl mx-auto">
        Trở thành thành viên của <span className="text-red-500 font-semibold">MVB Cinema</span> ngay hôm nay để tận hưởng những ưu đãi độc quyền, giảm giá hấp dẫn và trải nghiệm điện ảnh tuyệt vời!
      </p>

      <div className="mt-6 max-w-3xl mx-auto bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaTicketAlt size={24} className="text-red-500" /> Quyền lợi của bạn:
        </h2>
        <ul className="text-gray-300 text-lg">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 mb-2">
              <FaCheckCircle size={20} className="text-green-400" /> {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/registration")}
          className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-900 transition-transform transform hover:-translate-y-3">
          ĐĂNG KÝ NGAY
        </button>
      </div>
    </div>
  );
};

export default MemberPage;
