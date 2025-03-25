import { useState } from "react";
import SidebarAdm from "../components/Admin/SidebarAdm"; // Import SidebarAdm

const initialData = [
  {
    id: 1,
    name: "CGV Vincom",
    rooms: [
      { id: 1, name: "Phòng 1", seats: 80, status: "Hoạt động" },
      { id: 2, name: "Phòng 2", seats: 60, status: "Bảo trì" },
    ],
  },
  {
    id: 2,
    name: "Lotte Cinema",
    rooms: [
      { id: 3, name: "Phòng A", seats: 100, status: "Hoạt động" },
    ],
  },
];

const Theaters = () => {
  const [theaters, setTheaters] = useState(initialData);

  const handleToggleStatus = (theaterId, roomId) => {
    setTheaters(prev =>
      prev.map(theater =>
        theater.id === theaterId
          ? {
              ...theater,
              rooms: theater.rooms.map(room =>
                room.id === roomId
                  ? {
                      ...room,
                      status: room.status === "Hoạt động" ? "Bảo trì" : "Hoạt động",
                    }
                  : room
              ),
            }
          : theater
      )
    );
  };

  const handleDeleteRoom = (theaterId, roomId) => {
    setTheaters(prev =>
      prev.map(theater =>
        theater.id === theaterId
          ? {
              ...theater,
              rooms: theater.rooms.filter(room => room.id !== roomId),
            }
          : theater
      )
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdm /> {/* Đặt Sidebar bên trái trang */}

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-semibold mb-6">Quản Lý Rạp Chiếu</h1>

        {/* Nút thêm mới */}
        <div className="mb-4 text-right">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            + Thêm Rạp Chiếu
          </button>
        </div>

        {/* Danh sách rạp */}
        {theaters.map(theater => (
          <div
            key={theater.id}
            className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">{theater.name}</h2>
              <button className="text-blue-500 hover:underline">+ Thêm Phòng</button>
            </div>

            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b-2 border-r-2 border-gray-300 text-left" style={{ width: "20%" }}>Phòng</th>
                  <th className="p-3 border-b-2 border-r-2 border-gray-300 text-center" style={{ width: "20%" }}>Số Chỗ</th>
                  <th className="p-3 border-b-2 border-r-2 border-gray-300 text-center" style={{ width: "30%" }}>Trạng Thái</th>
                  <th className="p-3 border-b-2 border-r-2 border-gray-300 text-center" style={{ width: "30%" }}>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {theater.rooms.map(room => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="p-3 border-t-2 border-b border-r-2 border-gray-300">{room.name}</td>
                    <td className="p-3 border-t-2 border-b border-r-2 border-gray-300 text-center">{room.seats}</td>
                    <td className="p-3 border-t-2 border-b border-r-2 border-gray-300 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          room.status === "Hoạt động"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="p-3 border-t-2 border-b border-gray-300 text-center space-x-2">
                      <button className="text-blue-600 hover:underline">Sửa</button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDeleteRoom(theater.id, room.id)}
                      >
                        Xóa
                      </button>
                      <button
                        className="text-yellow-600 hover:underline"
                        onClick={() => handleToggleStatus(theater.id, room.id)}
                      >
                        {room.status === "Bảo trì" ? "Kích hoạt" : "Bảo trì"}
                      </button>
                    </td>
                  </tr>
                ))}
                {theater.rooms.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-3 text-gray-500">
                      Chưa có phòng chiếu nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Theaters;
