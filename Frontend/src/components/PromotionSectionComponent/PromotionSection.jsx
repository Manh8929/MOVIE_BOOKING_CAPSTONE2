import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAvailablPromotion } from "../../services/userService";
const PromotionsSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFullPage = location.pathname === "/promotions";

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const mainPromotion = {
    promo_id: 0,
    title: "KHUYẾN MÃI HẤP DẪN",
    description:
      "Khám phá ngay hàng trăm lợi ích dành cho bạn trong chuyên mục Khuyến mãi & Ưu đãi hấp dẫn của MVB Cinema. Từ những chương trình giảm giá vé xem phim đến những combo bắp nước siêu tiết kiệm, chúng tôi luôn mang đến những ưu đãi tốt nhất cho bạn. Đừng bỏ lỡ cơ hội nhận những phần quà giá trị và các ưu đãi cực hấp dẫn mỗi ngày!",
    isMain: true,
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getAvailablPromotion();
        console.log("Dữ liệu khuyến mãi:", data);
        setPromotions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi tải khuyến mãi:", error);
        setPromotions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Đang tải khuyến mãi...</div>;
  }

  const additionalPromos = isFullPage ? promotions : promotions.slice(0, 6);
  const allPromos = [mainPromotion, ...additionalPromos];

  return (
    <div className="bg-[#f0efe8] p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl text-red-600 font-bold text-center mb-6">
        KHUYẾN MÃI & ƯU ĐÃI
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[90%] lg:max-w-[60%]">
        {allPromos.map((promo) => (
          <div
            key={promo.promo_id}
            className={`p-4 border bg-white flex items-center justify-center cursor-pointer ${
              promo.isMain ? "sm:col-span-2 lg:col-span-3" : ""
            }`}
            onClick={() => navigate(`/promotions/${promo.promo_id}`)}
          >
            {promo.isMain ? (
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-2">
                  {promo.title}
                </h3>
                <p className="text-gray-700">{promo.description}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={promo.image_url}
                  alt={promo.title}
                  className="w-[80%] h-[80%] object-cover cursor-pointer transition-transform duration-300 hover:scale-125"
                />
                <p className="text-center mt-2 font-semibold text-gray-800">
                  {promo.title}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!isFullPage && promotions.length > 6 && (
        <button
          className="p-4 border bg-black text-white text-xl font-bold cursor-pointer mt-4 hover:bg-gray-800"
          onClick={() => navigate("/promotions")}
        >
          + XEM NHIỀU HƠN
        </button>
      )}
    </div>
  );
};

export default PromotionsSection;
