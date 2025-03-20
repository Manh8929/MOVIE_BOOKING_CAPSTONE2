import { useState } from "react";
import SidebarAdm from "../components/Admin/SidebarAdm"; // Đảm bảo import đúng SidebarAdm

const AddMovieAdm = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdm />

      <div className="flex-1 p-6 bg-white">
        <header className="mb-6 flex justify-end items-center">
          <div className="flex items-center mr-6">
            <div className="w-10 h-10 bg-[#131c28] text-white flex justify-center items-center rounded-full font-semibold">
              ảnh
            </div>
            <span className="ml-3 text-xl font-semibold">Tên adm</span>
          </div>
        </header>

        <div className="border-t border-gray-300 mb-6"></div>

        <div className="flex justify-end mb-6">
          <button className="bg-[#131c28] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1a2636]">
            + Thêm mới
          </button>
        </div>

        <table className="w-full table-auto border-separate border-spacing-0 border border-gray-300">
          <thead>
            <tr>
              <th className="border-b-2 border-r-2 border-gray-400 p-4 text-left">STT</th>
              <th className="border-b-2 border-r-2 border-gray-400 p-4 text-left">Baner Phim</th>
              <th className="border-b-2 border-r-2 border-gray-400 p-4 text-left">Tiêu đề</th>
              <th className="border-b-2 border-r-2 border-gray-400 p-4 text-left">Trạng thái</th>
              <th className="border-b-2 border-gray-400 p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-r border-gray-300 p-4">1</td>
              <td className="border-b border-r border-gray-300 p-4">
                <img src="https://via.placeholder.com/100x150" alt="#####" />
              </td>
              <td className="border-b border-r border-gray-300 p-4">#####</td>
              <td className="border-b border-r border-gray-300 p-4">###</td>
              <td className="border-b border-gray-300 p-4">
                <button className="text-blue-500 mr-2">👁️</button>
                <button className="text-yellow-500 mr-2">✏️</button>
                <button className="text-red-500">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddMovieAdm;
