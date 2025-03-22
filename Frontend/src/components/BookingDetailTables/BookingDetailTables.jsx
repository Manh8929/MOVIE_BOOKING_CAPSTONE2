import React from "react";
import { useNavigate } from "react-router-dom";
const BookingDetailTables = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen p-6 text-white flex justify-center items-center bg-gradient-to-r from-black via-black to-[rgb(118,20,39)] shadow-lg">
            <div className="w-[100%] sm:w-[60%] min-h-[660px] bg-black border-white border-double border-8 p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center mb-6">Thông tin đặt vé</h1>
                <fieldset className="border-dashed border-2 border-white p-6 rounded min-h-[460px] w-full text-center">
                    <legend className="text-2xl font-bold">Nội Dung Thanh Toán</legend>
                    <div className="mt-[4%] space-y-3 text-xl">
                        <p><strong>Phim:</strong> Tiến Mạnh bị kick khỏi nhóm (T18)</p>
                        <p className="mt-6"><strong>Ngày:</strong> 27/03/2025</p>
                        <p className="mt-6"><strong>Thời gian:</strong> 22:10 - 23:52</p>
                        <p className="mt-6"><strong>Ghế:</strong> G09</p>
                        <p className="mt-6"><strong>Số vé:</strong> <span id="counter">1</span></p>
                        <p className="mt-6"><strong>Tổng tiền:</strong> <span id="total">65.000</span> VNĐ</p>
                    </div>
                </fieldset>
                <button 
                    type="submit" 
                    onClick={() => navigate("/payment")}
                    className="mt-6 bg-red-600 px-8 py-3 rounded-lg text-white font-semibold hover:bg-red-700 transition-transform transform hover:-translate-y-3"
                >
                    Tiếp Tục
                </button>
            </div>
        </div>
    );
};

export default BookingDetailTables;
