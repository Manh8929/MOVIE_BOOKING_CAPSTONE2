import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PromotionsData from "./PromotionData";

const PromotionsSection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isFullPage = location.pathname === "/promotions";

    const [showAll, setShowAll] = useState(isFullPage);
    const displayedPromotions = showAll ? PromotionsData : PromotionsData.slice(0, 7);

    return (
        <div className="bg-[#f0efe8] p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl text-red-600 font-bold text-center mb-6">KHUYẾN MÃI & ƯU ĐÃI</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[90%] lg:max-w-[60%]">
                {displayedPromotions.map((promo) => (
                    <div
                        key={promo.id}
                        className={`p-4 border bg-white flex items-center justify-center cursor-pointer ${promo.isMain ? "sm:col-span-2 lg:col-span-3" : ""}`}
                        onClick={() => navigate(`/promotions/${promo.id}`)}
                    >
                        {promo.isMain ? (
                            <div>
                                <h3 className="text-xl font-bold text-orange-500 mb-2">{promo.title}</h3>
                                <p className="text-gray-700">{promo.description}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <img
                                    src={promo.img}
                                    alt={promo.title}
                                    className="w-[80%] h-[80%] object-cover cursor-pointer transition-transform duration-300 hover:scale-125"
                                />
                                <p className="text-center mt-2 font-semibold text-gray-800">{promo.title}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {!showAll && (
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
