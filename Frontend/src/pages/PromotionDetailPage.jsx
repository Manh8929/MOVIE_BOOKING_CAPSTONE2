import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import promotions from "../components/PromotionSectionComponent/PromotionData";
import { FaArrowLeft } from "react-icons/fa";

const PromotionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const promotion = promotions.find((promo) => promo.id === Number(id));

    if (!promotion) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <p className="text-center text-red-500 font-bold text-lg">Khuyến mãi không tồn tại</p>
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
            <h2 className="text-3xl font-bold text-red-600 text-center mb-6">{promotion.title}</h2>
            {promotion.img && (
                <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
                    <img src={promotion.img} alt={promotion.title} className="w-full h-full object-cover" />
                </div>
            )}
            <p className="text-gray-700 text-lg leading-relaxed text-center">{promotion.description}</p>
        </div>
    );
};

export default PromotionDetail;