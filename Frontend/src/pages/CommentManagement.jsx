// import React, { useEffect, useState } from "react";
// import { FaCheckCircle, FaEye, FaTrash } from "react-icons/fa";
// import Sidebar from "../components/Admin/SidebarAdm";
// import { getAllReviewsByAdm, deleteReviewByAdm } from '../services/adminService'; // import api

// const getSentimentColor = (sentiment) => {
//   switch (sentiment) {
//     case "positive":
//       return "text-green-600 bg-green-100";
//     case "neutral":
//       return "text-gray-600 bg-gray-100";
//     case "negative":
//       return "text-red-600 bg-red-100";
//     default:
//       return "";
//   }
// };

// const translateSentiment = (sentiment) => {
//   switch (sentiment) {
//     case "positive":
//       return "Tích cực";
//     case "neutral":
//       return "Trung lập";
//     case "negative":
//       return "Tiêu cực";
//     default:
//       return sentiment;
//   }
// };

// const CommentManagement = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Tooltip state
//   const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllReviewsByAdm();
//         setReviews(data.reviews);
//       } catch (error) {
//         console.error("Lỗi khi lấy danh sách review:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Bạn có chắc muốn xóa đánh giá này?")) return;
//     try {
//       await deleteReviewByAdm(id);
//       setReviews((prev) => prev.filter((r) => r.review_id !== id));
//     } catch (error) {
//       console.error("Lỗi khi xóa review:", error);
//     }
//   };

//   // Mouse event handlers để hiển thị tooltip dưới con trỏ chuột
//   const showTooltip = (e, content) => {
//     const padding = 10;
//     let x = e.clientX + padding;
//     let y = e.clientY + padding;

//     // Giới hạn tooltip không vượt ra ngoài màn hình ngang
//     const maxWidth = 400;
//     if (x + maxWidth > window.innerWidth) {
//       x = e.clientX - maxWidth - padding;
//     }

//     setTooltip({ visible: true, x, y, content });
//   };

//   const hideTooltip = () => {
//     setTooltip({ visible: false, x: 0, y: 0, content: "" });
//   };

//   if (loading) return <div className="p-6">Đang tải dữ liệu...</div>;

//   return (
//     <div className="flex h-screen relative">
//       <Sidebar />

//       <div className="flex-1 p-6 bg-gray-50">
//         <h2 className="text-2xl font-semibold mb-4">Quản lý đánh giá</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border bg-white shadow-sm rounded-lg text-sm">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-3">ID</th>
//                 <th className="p-3">Phim</th>
//                 <th className="p-3">Người dùng</th>
//                 <th className="p-3">Nội dung</th>
//                 <th className="p-3">Ngày đánh giá</th>
//                 <th className="p-3">Cảm xúc</th>
//                 <th className="p-3">Thao tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reviews.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="p-3 text-center text-gray-500">
//                     Không có đánh giá nào
//                   </td>
//                 </tr>
//               )}
//               {reviews.map((r) => (
//                 <tr key={r.review_id} className="border-t hover:bg-gray-50">
//                   <td className="p-3">{r.review_id}</td>
//                   <td className="p-3">{r.Movie?.title || "N/A"}</td>
//                   <td className="p-3">{r.User?.full_name || "N/A"}</td>

//                   <td
//                     className="p-3 max-w-xs truncate cursor-pointer"
//                     onMouseMove={(e) => showTooltip(e, r.comment)}
//                     onMouseLeave={hideTooltip}
//                     title="" // tắt tooltip mặc định
//                   >
//                     {r.comment}
//                   </td>

//                   <td className="p-3">
//                     {new Date(r.review_time).toLocaleDateString()}
//                   </td>
//                   <td className="p-3">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(
//                         r.sentiment
//                       )}`}
//                       title={translateSentiment(r.sentiment)}
//                     >
//                       {translateSentiment(r.sentiment)}
//                     </span>
//                   </td>
//                   <td className="p-3 flex space-x-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-700"
//                       title="Xem chi tiết"
//                       onClick={() => alert("Chức năng xem chi tiết chưa làm")}
//                     >
//                       <FaEye />
//                     </button>
//                     <button
//                       className="text-green-600 hover:text-green-800"
//                       title="Duyệt"
//                       onClick={() => alert("Chức năng duyệt chưa làm")}
//                     >
//                       <FaCheckCircle />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       title="Xóa"
//                       onClick={() => handleDelete(r.review_id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Tooltip hiển thị dưới con trỏ chuột */}
//           {tooltip.visible && (
//             <div
//               style={{
//                 position: "fixed",
//                 top: tooltip.y,
//                 left: tooltip.x,
//                 maxWidth: 400,
//                 maxHeight: 300,
//                 overflow: "auto",
//                 backgroundColor: "white",
//                 padding: "10px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                 borderRadius: "6px",
//                 zIndex: 9999,
//                 whiteSpace: "pre-wrap",
//               }}
//             >
//               {tooltip.content}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentManagement;

// import React, { useEffect, useState } from "react";
// import { FaTrash, FaStar } from "react-icons/fa";
// import Sidebar from "../components/Admin/SidebarAdm";
// import { getAllReviewsByAdm, deleteReviewByAdm } from '../services/adminService';

// const getSentimentColor = (sentiment) => {
//   switch (sentiment) {
//     case "positive":
//       return "text-green-600 bg-green-100";
//     case "neutral":
//       return "text-gray-600 bg-gray-100";
//     case "negative":
//       return "text-red-600 bg-red-100";
//     default:
//       return "";
//   }
// };

// const translateSentiment = (sentiment) => {
//   switch (sentiment) {
//     case "positive":
//       return "Tích cực";
//     case "neutral":
//       return "Trung lập";
//     case "negative":
//       return "Tiêu cực";
//     default:
//       return sentiment;
//   }
// };

// const Stars = ({ count }) => {
//   if (count == null) return <span className="italic text-gray-500">Chưa đánh giá sao</span>;
//   return (
//     <div className="flex space-x-1 text-yellow-400">
//       {[...Array(5)].map((_, i) => (
//         <FaStar key={i} className={i < count ? "opacity-100" : "opacity-30"} />
//       ))}
//     </div>
//   );
// };

// const CommentManagement = () => {
//   const [reviews, setReviews] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(""); // movie_id hoặc title
//   const [loading, setLoading] = useState(true);
//   const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllReviewsByAdm();
//         setReviews(data.reviews);
//       } catch (error) {
//         console.error("Lỗi khi lấy danh sách review:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Bạn có chắc muốn xóa đánh giá này?")) return;
//     try {
//       await deleteReviewByAdm(id);
//       setReviews((prev) => prev.filter((r) => r.review_id !== id));
//     } catch (error) {
//       console.error("Lỗi khi xóa review:", error);
//     }
//   };

//   const showTooltip = (e, content) => {
//     const padding = 10;
//     let x = e.clientX + padding;
//     let y = e.clientY + padding;
//     const maxWidth = 400;
//     if (x + maxWidth > window.innerWidth) {
//       x = e.clientX - maxWidth - padding;
//     }
//     setTooltip({ visible: true, x, y, content });
//   };

//   const hideTooltip = () => {
//     setTooltip({ visible: false, x: 0, y: 0, content: "" });
//   };

//   // Lấy danh sách phim duy nhất có trong reviews (theo movie_id + title)
//   const uniqueMovies = React.useMemo(() => {
//     const map = new Map();
//     reviews.forEach(r => {
//       if (r.Movie) map.set(r.Movie.movie_id, r.Movie.title);
//     });
//     return Array.from(map.entries()); // [[movie_id, title], ...]
//   }, [reviews]);

//   // Lọc theo phim đã chọn (theo movie_id)
//   const filteredReviews = selectedMovie
//     ? reviews.filter((r) => r.Movie?.movie_id === Number(selectedMovie))
//     : reviews;

//   if (loading) return <div className="p-6">Đang tải dữ liệu...</div>;

//   return (
//     <div className="flex h-screen relative">
//       <Sidebar />

//       <div className="flex-1 p-6 bg-gray-50">
//         <h2 className="text-2xl font-semibold mb-4">Quản lý đánh giá</h2>

//         {/* Dropdown lọc phim */}
//         <div className="mb-4 max-w-xs">
//           <select
//             className="w-full border rounded px-4 py-2"
//             value={selectedMovie}
//             onChange={(e) => setSelectedMovie(e.target.value)}
//           >
//             <option value="">-- Tất cả phim --</option>
//             {uniqueMovies.map(([id, title]) => (
//               <option key={id} value={id}>
//                 {title}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border bg-white shadow-sm rounded-lg text-sm">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-3">ID</th>
//                 <th className="p-3">Phim</th>
//                 <th className="p-3">Người dùng</th>
//                 <th className="p-3">Đánh giá sao</th>
//                 <th className="p-3">Nội dung</th>
//                 <th className="p-3">Ngày đánh giá</th>
//                 <th className="p-3">Cảm xúc</th>
//                 <th className="p-3">Thao tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredReviews.length === 0 && (
//                 <tr>
//                   <td colSpan={8} className="p-3 text-center text-gray-500">
//                     Không có đánh giá nào
//                   </td>
//                 </tr>
//               )}
//               {filteredReviews.map((r) => (
//                 <tr key={r.review_id} className="border-t hover:bg-gray-50">
//                   <td className="p-3">{r.review_id}</td>
//                   <td className="p-3">{r.Movie?.title || "N/A"}</td>
//                   <td className="p-3">{r.User?.full_name || "N/A"}</td>

//                   <td className="p-3">
//                     <Stars count={r.rating} />
//                   </td>

//                   <td
//                     className="p-3 max-w-xs truncate cursor-pointer"
//                     onMouseMove={(e) => showTooltip(e, r.comment)}
//                     onMouseLeave={hideTooltip}
//                     title=""
//                   >
//                     {r.comment}
//                   </td>

//                   <td className="p-3">{new Date(r.review_time).toLocaleDateString()}</td>

//                   <td className="p-3">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(
//                         r.sentiment
//                       )}`}
//                       title={translateSentiment(r.sentiment)}
//                     >
//                       {translateSentiment(r.sentiment)}
//                     </span>
//                   </td>

//                   <td className="p-3 flex space-x-2">
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       title="Xóa"
//                       onClick={() => handleDelete(r.review_id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {tooltip.visible && (
//             <div
//               style={{
//                 position: "fixed",
//                 top: tooltip.y,
//                 left: tooltip.x,
//                 maxWidth: 400,
//                 maxHeight: 300,
//                 overflow: "auto",
//                 backgroundColor: "white",
//                 padding: "10px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                 borderRadius: "6px",
//                 zIndex: 9999,
//                 whiteSpace: "pre-wrap",
//               }}
//             >
//               {tooltip.content}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentManagement;
import React, { useEffect, useState } from "react";
import { FaTrash, FaStar } from "react-icons/fa";
import Sidebar from "../components/Admin/SidebarAdm";
import { getAllReviewsByAdm, deleteReviewByAdm } from '../services/adminService';

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case "positive":
      return "text-green-600 bg-green-100";
    case "neutral":
      return "text-gray-600 bg-gray-100";
    case "negative":
      return "text-red-600 bg-red-100";
    default:
      return "";
  }
};

const translateSentiment = (sentiment) => {
  switch (sentiment) {
    case "positive":
      return "Tích cực";
    case "neutral":
      return "Trung lập";
    case "negative":
      return "Tiêu cực";
    default:
      return sentiment;
  }
};

const Stars = ({ count }) => {
  if (count == null) return <span className="italic text-gray-500">Chưa đánh giá sao</span>;
  return (
    <div className="flex space-x-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < count ? "opacity-100" : "opacity-30"} />
      ))}
    </div>
  );
};

const CommentManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getAllReviewsByAdm();
        setReviews(data.reviews);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách review:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa đánh giá này?")) return;
    try {
      await deleteReviewByAdm(id);
      setReviews((prev) => prev.filter((r) => r.review_id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa review:", error);
    }
  };

  const showTooltip = (e, content) => {
    const padding = 10;
    let x = e.clientX + padding;
    let y = e.clientY + padding;
    const maxWidth = 400;
    if (x + maxWidth > window.innerWidth) {
      x = e.clientX - maxWidth - padding;
    }
    setTooltip({ visible: true, x, y, content });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: "" });
  };

  // Lấy danh sách phim duy nhất trong reviews (movie_id + title)
  const uniqueMovies = React.useMemo(() => {
    const map = new Map();
    reviews.forEach(r => {
      if (r.Movie) map.set(r.Movie.movie_id, r.Movie.title);
    });
    return Array.from(map.entries()); // [[movie_id, title], ...]
  }, [reviews]);

  // Lọc reviews theo phim được chọn
  const filteredReviews = selectedMovie
    ? reviews.filter((r) => r.Movie?.movie_id === Number(selectedMovie))
    : reviews;

  if (loading) return <div className="p-6">Đang tải dữ liệu...</div>;

  return (
    <div className="flex h-screen relative">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Quản lý đánh giá</h2>

        <div className="mb-4 max-w-sm flex items-center space-x-4">
          {/* Dropdown lọc phim */}
          <select
            className="flex-grow border rounded px-4 py-2"
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
          >
            <option value="">-- Tất cả phim --</option>
            {uniqueMovies.map(([id, title]) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>

          {/* Hiển thị số đánh giá */}
          <div className="text-gray-700 font-medium whitespace-nowrap">
            {selectedMovie === ""
              ? `Tất cả đánh giá: ${reviews.length}`
              : `Đang hiển thị: ${filteredReviews.length} đánh giá`}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white shadow-sm rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Phim</th>
                <th className="p-3">Người dùng</th>
                <th className="p-3">Đánh giá sao</th>
                <th className="p-3">Nội dung</th>
                <th className="p-3">Ngày đánh giá</th>
                <th className="p-3">Cảm xúc</th>
                <th className="p-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-3 text-center text-gray-500">
                    Không có đánh giá nào
                  </td>
                </tr>
              )}
              {filteredReviews.map((r) => (
                <tr key={r.review_id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{r.review_id}</td>
                  <td className="p-3">{r.Movie?.title || "N/A"}</td>
                  <td className="p-3">{r.User?.full_name || "N/A"}</td>

                  <td className="p-3">
                    <Stars count={r.rating} />
                  </td>

                  <td
                    className="p-3 max-w-xs truncate cursor-pointer"
                    onMouseMove={(e) => showTooltip(e, r.comment)}
                    onMouseLeave={hideTooltip}
                    title=""
                  >
                    {r.comment}
                  </td>

                  <td className="p-3">{new Date(r.review_time).toLocaleDateString()}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(
                        r.sentiment
                      )}`}
                      title={translateSentiment(r.sentiment)}
                    >
                      {translateSentiment(r.sentiment)}
                    </span>
                  </td>

                  <td className="p-3 flex space-x-2">
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                      onClick={() => handleDelete(r.review_id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tooltip.visible && (
            <div
              style={{
                position: "fixed",
                top: tooltip.y,
                left: tooltip.x,
                maxWidth: 400,
                maxHeight: 300,
                overflow: "auto",
                backgroundColor: "white",
                padding: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                zIndex: 9999,
                whiteSpace: "pre-wrap",
              }}
            >
              {tooltip.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentManagement;
