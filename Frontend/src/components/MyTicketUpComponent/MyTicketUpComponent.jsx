import React from 'react'

const MyTicketUpComponent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {/* Ticket Card */}
      <div className="border border-gray-500 rounded-xl p-6 w-full max-w-sm bg-black bg-opacity-40 flex flex-col justify-between shadow-lg">
        <div>
          <p className="text-gray-400 text-sm mb-1">Date</p>
          <p className="font-semibold mb-4">Mon, 23 Oct 2023</p>

          <p className="text-gray-400 text-sm mb-1">Movie Title</p>
          <p className="font-semibold mb-4">SPIDERMAN NO WAY HOME</p>

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
        <button className="w-full bg-[#7A1C1C] hover:bg-[#E63946] text-white py-2 rounded-lg">
          Download Ticket
        </button>
      </div>

      {/* Ticket Card 2 */}
      <div className="border border-gray-500 rounded-xl p-6 w-full max-w-sm bg-black bg-opacity-40 flex flex-col justify-between shadow-lg">
        <div>
          <p className="text-gray-400 text-sm mb-1">Date</p>
          <p className="font-semibold mb-4">Tue, 23 Dec 2023</p>

          <p className="text-gray-400 text-sm mb-1">Movie Title</p>
          <p className="font-semibold mb-4">POLIS EVO 3</p>

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
        <button className="w-full bg-[#7A1C1C] hover:bg-[#E63946] text-white py-2 rounded-lg">
          Download Ticket
        </button>
      </div>

      {/* Ticket Card 3 */}
      <div className="border border-gray-500 rounded-xl p-6 w-full max-w-sm bg-black bg-opacity-40 flex flex-col justify-between shadow-lg">
        <div>
          <p className="text-gray-400 text-sm mb-1">Date</p>
          <p className="font-semibold mb-4">Mon, 23 Oct 2023</p>

          <p className="text-gray-400 text-sm mb-1">Movie Title</p>
          <p className="font-semibold mb-4">SPIDERMAN NO WAY HOME</p>

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
        <button className="w-full bg-[#7A1C1C] hover:bg-[#E63946] text-white py-2 rounded-lg">
          Download Ticket
        </button>
      </div>
    </div>
  );
}

export default MyTicketUpComponent