import React from "react";
import { FaCheckCircle, FaEye, FaStar, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Admin/SidebarAdm";


const reviews = [
  {
    movie: "Venom: Kẻ Thù Cuối Cùng",
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Phim rất hay, hiệu ứng đẹp...",
    date: "2023-10-15",
    status: "Đã duyệt",
    emotion: "Tích cực",
  },
  {
    movie: "Quỷ Nhập Tràng",
    user: "Trần Thị B",
    rating: 3,
    comment: "Phim khá hay nhưng cốt truyện...",
    date: "2023-10-14",
    status: "Chờ duyệt",
    emotion: "Tích cực",
  },
  {
    movie: "Venom: Kẻ Thù Cuối Cùng",
    user: "Lê Văn C",
    rating: 2,
    comment: "Phim không hay như kỳ vọng...",
    date: "2023-10-13",
    status: "Từ chối",
    emotion: "Tiêu cực",
  },
  {
    movie: "Joker: Folie à Deux",
    user: "Phạm Thị D",
    rating: 4,
    comment: "Tuyệt vời! Một kiệt tác điện ảnh...",
    date: "2023-10-12",
    status: "Đã duyệt",
    emotion: "Tích cực",
  },
  {
    movie: "Dune: Part Two",
    user: "Hoàng Văn E",
    rating: 5,
    comment: "Phim rất hay, hiệu ứng đẹp...",
    date: "2023-10-11",
    status: "Chờ duyệt",
    emotion: "Tích cực",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Đã duyệt":
      return "text-green-600 bg-green-100";
    case "Chờ duyệt":
      return "text-blue-600 bg-blue-100";
    case "Từ chối":
      return "text-red-600 bg-red-100";
    default:
      return "";
  }
};

const getEmotionColor = (emotion) => {
  switch (emotion) {
    case "Tích cực":
      return "text-green-600 bg-green-100";
    case "Tiêu cực":
      return "text-red-600 bg-red-100";
    default:
      return "";
  }
};

const Stars = ({ count }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < count ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.235 3.813a1 1 0 00.95.69h4.012c.969 0 1.371 1.24.588 1.81l-3.24 2.354a1 1 0 00-.364 1.118l1.236 3.813c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.241 2.353c-.784.57-1.838-.197-1.539-1.118l1.235-3.813a1 1 0 00-.364-1.118L2.85 9.24c-.783-.57-.38-1.81.588-1.81h4.012a1 1 0 00.95-.69l1.235-3.813z" />
      </svg>
    ))}
  </div>
);

const CommentManagement = () => {
  return (
        <div className="flex h-screen">
            <Sidebar  />

    <div className="flex-1 p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Quản lý đánh giá</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white shadow-sm rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Phim</th>
              <th className="p-3">Người dùng</th>
              <th className="p-3">Đánh giá</th>
              <th className="p-3">Nội dung</th>
              <th className="p-3">Ngày</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Cảm xúc</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{r.movie}</td>
                <td className="p-3">{r.user}</td>
                <td className="p-3">
                  <FaStar count={r.rating} />
                </td>
                <td className="p-3 truncate max-w-xs" title={r.comment}>
                  {r.comment}
                </td>
                <td className="p-3">{r.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getEmotionColor(
                      r.emotion
                    )}`}
                  >
                    {r.emotion}
                  </span>
                </td>
                <td className="p-3 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEye  />
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <FaCheckCircle />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </div>
    //   {/* Sidebar */}
  );
};

export default CommentManagement;
