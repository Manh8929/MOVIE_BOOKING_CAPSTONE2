import React from "react";

const MyTicketPage = () => {
  const ticketCode = "ManhDepTraiVaiLong";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-[#4f111e] text-white flex flex-col">
      <h1 className="font-bold text-center mt-36 text-3xl md:text-4xl mb-10">
        Thông tin chi tiết
      </h1>

      <div className="border border-gray-600 rounded-2xl p-8 w-full max-w-xl bg-black bg-opacity-50 mx-auto shadow-2xl backdrop-blur-md">
        <div className="space-y-6">
          <div>
            <p className="text-gray-400 text-sm">Ngày</p>
            <p className="font-semibold text-lg">Mon, 23 Oct 2023</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Tên Phim</p>
            <p className="font-semibold text-lg">SPIDERMAN NO WAY HOME</p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Vé (3)</p>
              <p className="font-semibold text-lg">C8, C9, C10</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Thời gian</p>
              <p className="font-semibold text-lg">14:40</p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Mã vé</p>
            <p className="font-bold text-xl tracking-widest text-yellow-400">
              {ticketCode}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mt-4">
            <div className="p-3 bg-white rounded-xl shadow-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${ticketCode}`}
                alt="QR Code"
                className="rounded"
              />
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button className="w-full bg-[#E63946] hover:bg-[#c12d38] text-white py-3 rounded-xl mt-8 font-semibold transition duration-300">
          Tải xuống
        </button>
      </div>

      {/* Back Button */}
      <button className="mt-10 border border-gray-600 rounded-xl px-10 py-4 hover:bg-[#db767e] hover:text-black transition mx-auto text-lg font-medium">
        Về trang chủ
      </button>
    </div>
  );
};

export default MyTicketPage;
