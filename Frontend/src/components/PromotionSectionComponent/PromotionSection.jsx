import React from "react";
import promotion1 from "../../assets/img/promotions/promotion1.jpg";
import promotion2 from "../../assets/img/promotions/promotion2.jpg";
import promotion3 from "../../assets/img/promotions/promotion3.jpg";
import promotion4 from "../../assets/img/promotions/promotion4.jpg";
import promotion5 from "../../assets/img/promotions/promotion5.jpg";


const promotions = [
 {
        id: 1,
        title: "KHUYẾN MÃI HẤP DẪN",
        description:
            "Khám phá ngay hàng trăm lợi ích dành cho bạn trong chuyên mục Khuyến mãi & Ưu đãi hấp dẫn của Metiz Cinema.",
        isMain: true,
    },
    {
        id: 2,
        img: promotion1,
        title: "Mua vé Deadpool & Wolverine - Ưu đãi 5%",
    },
    {
        id: 3,
        img: promotion2,
        title: "Mua 1 vé xem phim tặng voucher 20K",
    },
    {
        id: 4,
        img: promotion3,
        title: "Giảm đến 15K khi thanh toán VNPay",
    },
    {
        id: 5,
        img: promotion4,
        title: "Tặng bao lì xì Tết vui như ý",
    },
    {
        id: 6,
        img: promotion5,
        title: "Hạn mức nâng hạng thành viên 2023",
    },
];

const Promotions = () => {
    return (
        <div className="bg-[#f0efe8] p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-center mb-6">KHUYẾN MÃI & ƯU ĐÃI</h2>
            <div className="grid grid-cols-3 gap-4 max-w-[60%] max-h-[60%]">
                {promotions.map((promo) => (
                    <div
                        key={promo.id}
                        className={
                            promo.isMain
                                ? "col-span-3 p-4 border bg-white"
                                : "p-4 border bg-white flex justify-center items-center"
                        }
                    >
                        {promo.isMain ? (
                            <div>
                                <h3 className="text-xl font-bold text-orange-500 mb-2">{promo.title}</h3>
                                <p className="text-gray-700">{promo.description}</p>
                            </div>
                        ) : (
                            <img
                                src={promo.img}
                                alt={promo.title}
                                className="w-[80%] h-[80%] object-cover cursor-pointer transition-transform duration-300 hover:scale-125"
                            />
                        )}
                    </div>
                ))}
                <div className="p-4 border bg-black flex justify-center items-center text-white text-xl font-bold cursor-pointer">
                    + XEM NHIỀU HƠN
                </div>
            </div>
        </div>
    );
};

export default Promotions;