import React, { useState } from "react";
import MyTicketUpComponent from "../components/MyTicketUpComponent/MyTicketUpComponent";
import MyTicketHisComponent from "../components/MyTicketUpComponent/MyTicketHisComponent";

const TicketUpHisPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  return (
    <div className="mt-[80px] w-full, min-h-screen bg-gradient-to-br from-black via-black to-[#4f111e] text-white p-8">
      <div className="flex justify-center mb-20 mt-8">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-full mr-4 ${
            activeTab === "upcoming"
              ? "bg-[#E63946] text-white"
              : "border border-white"
          }`}
        >
         Vé sắp chiếu
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 border rounded-full ${
            activeTab === "history"
              ? "bg-[#E63946] text-white"
              : "border border-white"
          }`}
        >
          Lịch sử đặt vé
        </button>
      </div>
      {activeTab === "upcoming" ? (
        <MyTicketUpComponent />
      ) : (
        <MyTicketHisComponent />
      )}
    </div>
  );
};

export default TicketUpHisPage;
