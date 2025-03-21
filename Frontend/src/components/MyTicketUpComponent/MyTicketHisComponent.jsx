import React from 'react'

const MyTicketHisComponent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {/* Ticket Card 1 */}
      <div className="border border-gray-500 rounded-xl p-6 w-full max-w-sm bg-black bg-opacity-40 shadow-lg">
        <div className="mb-6">
          <p className="text-gray-400 text-sm">Date</p>
          <p className="font-semibold mb-4">Mon, 23 Oct 2023</p>

          <p className="text-gray-400 text-sm">Movie Title</p>
          <p className="font-semibold mb-4">SPIDERMAN NO WAY HOME</p>

          <div className="flex justify-between">
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
        <button className="w-full bg-green-300 text-black py-2 rounded-lg hover:bg-green-400">
          Download Ticket
        </button>
      </div>

      {/* Ticket Card 2 */}
      <div className="border border-gray-500 rounded-xl p-6 w-full max-w-sm bg-black bg-opacity-40 shadow-lg">
        <div className="mb-6">
          <p className="text-gray-400 text-sm">Date</p>
          <p className="font-semibold mb-4">Mon, 23 Oct 2023</p>

          <p className="text-gray-400 text-sm">Movie Title</p>
          <p className="font-semibold mb-4">SPIDERMAN NO WAY HOME</p>

          <div className="flex justify-between">
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
        <button className="w-full bg-green-300 text-black py-2 rounded-lg hover:bg-green-400">
          Download Ticket
        </button>
      </div>
    </div>
  );
}

export default MyTicketHisComponent