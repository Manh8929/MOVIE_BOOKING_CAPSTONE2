import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAvailablPromotion } from "../services/userService";
import { FaArrowLeft } from "react-icons/fa";

const PromotionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const promotions = await getAvailablPromotion();
        const found = promotions.find((promo) => promo.promo_id === Number(id));
        setPromotion(found);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải khuyến mãi:", err);
        setError("Không thể tải khuyến mãi.");
        setLoading(false);
      }
    };

    fetchPromotion();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <p className="text-center text-gray-600 font-semibold text-lg">
          Đang tải khuyến mãi...
        </p>
      </div>
    );
  }

  if (error || !promotion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <p className="text-center text-red-500 font-bold text-lg">
          {error || "Khuyến mãi không tồn tại"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-red-600 hover:text-red-300 mb-4 self-start ml-8"
      >
        <FaArrowLeft className="mr-2" />
        Quay lại
      </button>
      <h2 className="text-3xl font-bold text-red-600 text-center mb-6">
        {promotion.title}
      </h2>
      {promotion.image_url && (
        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
          {promotion.image_url && (
            <div className="w-full max-w-4xl h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-6 mx-auto">
              <img
                src={promotion.image_url}
                alt={promotion.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}
      <p className="text-gray-700 text-lg leading-relaxed text-center">
        {promotion.description}
      </p>
    </div>
  );
};

export default PromotionDetail;
