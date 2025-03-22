import React from "react";

const MyTicketPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-[#4f111e] text-white flex flex-col ">
      <h1 className="font-bold m-10 mt-36 ml-60 pl-8 text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl">
        Ticket Detail
      </h1>

      <div className="border border-gray-500 rounded-xl p-8 w-full max-w-lg h-[400px] bg-black bg-opacity-40 mx-auto flex flex-col justify-between shadow-lg">
        <div>
          <div className="mb-6">
            <p className="text-gray-400 text-sm">Date</p>
            <p className="font-semibold">Mon, 23 Oct 2023</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-400 text-sm">Movie Title</p>
            <p className="font-semibold">SPIDERMAN NO WAY HOME</p>
          </div>

          <div className="flex justify-between mb-6">
            <div>
              <p className="text-gray-400 text-sm">Ticket (3)</p>
              <p className="font-semibold">C8, C9, C10</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Hours</p>
              <p className="font-semibold">14:40</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-[#7A1C1C] hover:bg-[#E63946] text-white py-3 rounded-lg transition">
          Download Ticket
        </button>
      </div>
      <button className="mt-10 border border-gray-500 rounded-lg px-10 py-4 hover:bg-[#db767e] hover:text-black transition mx-auto">
        Back to Homepage
      </button>
    </div>
  );
};

export default MyTicketPage;
