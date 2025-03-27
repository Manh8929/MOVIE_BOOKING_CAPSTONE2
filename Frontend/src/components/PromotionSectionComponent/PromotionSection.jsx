import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import promotion1 from "../../assets/img/promotions/promotion1.jpg";
import promotion2 from "../../assets/img/promotions/promotion2.jpg";
import promotion3 from "../../assets/img/promotions/promotion3.jpg";
import promotion4 from "../../assets/img/promotions/promotion4.jpg";
import promotion5 from "../../assets/img/promotions/promotion5.jpg";
import promotion6 from "../../assets/img/promotions/promotion6.jpg";
import promotion7 from "../../assets/img/promotions/promotion7.jpg";
import promotion8 from "../../assets/img/promotions/promotion8.jpg";

const promotions = [
    { id: 1, title: "KHUYẾN MÃI HẤP DẪN", description: "Khám phá ngay hàng trăm lợi ích dành cho bạn trong chuyên mục Khuyến mãi & Ưu đãi hấp dẫn của MVB Cinema.", isMain: true },
    { id: 2, img: promotion1, title: "Mua vé Deadpool & Wolverine - Ưu đãi 5%" },
    { id: 3, img: promotion2, title: "Mua 1 vé xem phim tặng voucher 20K" },
    { id: 4, img: promotion3, title: "Giảm đến 15K khi thanh toán VNPay" },
    { id: 5, img: promotion4, title: "Tặng bao lì xì Tết vui như ý" },
    { id: 6, img: promotion5, title: "Hạn mức nâng hạng thành viên 2023" },
    { id: 7, img: promotion6, title: "MUA VÉ XEM SUẤT CHIẾU SỚM CỦA NGƯỜI MẶT TRỜI" },
    { id: 8, img: promotion7, title: "Giảm giá 30% khi mua combo bắp nước" },
    { id: 9, img: promotion8, title: "Giảm giá 30% khi mua combo bắp nước" },
];

const Promotions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isFullPage = location.pathname === "/promotions"; 

    const [showAll, setShowAll] = useState(isFullPage);
    const displayedPromotions = showAll ? promotions : promotions.slice(0, 7);

    return (
        <div className="bg-[#f0efe8] p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl text-red-600 font-bold text-center mb-6">KHUYẾN MÃI & ƯU ĐÃI</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[90%] lg:max-w-[60%]">
                {displayedPromotions.map((promo) => (
                    <div
                        key={promo.id}
                        className={`p-4 border bg-white flex items-center justify-center ${promo.isMain ? "sm:col-span-2 lg:col-span-3" : ""}`}
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

export default Promotions;
