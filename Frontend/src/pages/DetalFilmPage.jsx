// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { FaTrashAlt } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate, useParams } from "react-router-dom";

// import FilmImg from "../assets/img/film/phim1.jpg";
// import { getMovieDetail } from "../services/movieService";
// import {
//   getAvailableComment,
//   postReview,
//   deleteReview,
//   analyzeSentiment,
// } from "../services/userService";

// const sentimentDisplayMap = {
//   positive: "Tích cực",
//   neutral: "Trung lập",
//   negative: "Tiêu cực",
// };

// const MovieDetail = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const navigate = useNavigate();
//   const [comments, setComments] = useState([]);
//   const [userComment, setUserComment] = useState("");
//   const [userRating, setUserRating] = useState(null);
//   const [showRatingConfirm, setShowRatingConfirm] = useState(false);
//   const userInfo = JSON.parse(localStorage.getItem("currentUser"));

//   useEffect(() => {
//     const fetchMovieDetail = async () => {
//       try {
//         const data = await getMovieDetail(id);
//         setMovie(data);
//       } catch (err) {
//         console.error("Lỗi khi lấy thông tin phim:", err);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await getAvailableComment(id);
//         setComments(response);
//       } catch (error) {
//         console.error("Lỗi khi lấy nhận xét:", error);
//       }
//     };

//     fetchMovieDetail();
//     fetchComments();
//   }, [id]);

//   const forbiddenWords = [
//     "địt", "đụ", "cặc", "lồn", "buồi", "clgt", "vãi lồn", "fuck", "shit", "bitch",
//     "asshole", "motherfucker", "dmm", "fml", "đĩ", "điếm", "kiếp", "cmm", "dm",
//     "dcm", "dkm", "cđm", "đcm",
//   ];

//   const specialCharacterRegex = /[~`!@#$%^&*()+={}\[\];:'"<>/?\\|]/g;

//   const containsForbiddenWords = (text) => {
//     return forbiddenWords.some((word) => text.toLowerCase().includes(word));
//   };

//   const containsSpecialCharacters = (text) => {
//     return specialCharacterRegex.test(text);
//   };

//   const submitReview = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const sentimentResult = await analyzeSentiment(userComment);
//       const score = sentimentResult.score;

//       let sentimentLabel = "neutral";
//       if (score >= 0.25) sentimentLabel = "positive";
//       else if (score <= -0.25) sentimentLabel = "negative";

//       const reviewData = {
//         movie_id: parseInt(id, 10),
//         comment: userComment,
//         user_id: userInfo.user_id,
//         sentiment: sentimentLabel,
//         rating: userRating,
//       };

//       await postReview(token, reviewData);
//       toast.success("Gửi nhận xét thành công!");

//       const updatedComments = await getAvailableComment(id);
//       setComments(updatedComments);
//       setUserComment("");
//       setUserRating(null);
//     } catch (error) {
//       toast.error("Gửi nhận xét thất bại, vui lòng thử lại.");
//       console.error("Lỗi khi gửi nhận xét:", error);
//     }
//   };

//   const handlePostComment = () => {
//     if (!localStorage.getItem("token")) {
//       toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
//       return;
//     }
//     if (!userComment.trim()) {
//       toast.error("Vui lòng nhập nội dung nhận xét");
//       return;
//     }
//     if (!userInfo || !userInfo.user_id) {
//       toast.error("Không tìm thấy thông tin người dùng");
//       return;
//     }
//     if (containsForbiddenWords(userComment)) {
//       toast.error("Nội dung nhận xét chứa từ ngữ không phù hợp");
//       return;
//     }
//     if (containsSpecialCharacters(userComment)) {
//       toast.error("Không được sử dụng kí tự đặc biệt trong nhận xét");
//       return;
//     }

//     if (userRating === null) {
//       setShowRatingConfirm(true);
//     } else {
//       submitReview();
//     }
//   };

//   const handleDeleteComment = async (reviewId) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Bạn cần đăng nhập để xoá nhận xét");
//       return;
//     }

//     const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá nhận xét này không?");
//     if (!confirmDelete) return;

//     try {
//       await deleteReview(token, reviewId);
//       toast.success("Xoá nhận xét thành công!");

//       const updatedComments = await getAvailableComment(id);
//       setComments(updatedComments);
//     } catch (error) {
//       toast.error("Không thể xoá nhận xét. Vui lòng thử lại.");
//       console.error("Lỗi khi xoá nhận xét:", error);
//     }
//   };

//   const RatingConfirmModal = () => (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={() => setShowRatingConfirm(false)}
//     >
//       <div
//         className="bg-white rounded-lg p-6 max-w-sm w-full"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h3 className="text-lg font-semibold mb-4 text-black">Bạn chưa đánh giá số sao</h3>
//         <p className="mb-6 text-black">
//           Bạn có muốn tiếp tục gửi nhận xét mà không đánh giá sao không?
//         </p>
//         <div className="flex justify-end space-x-4">
//           <button
//             className="px-4 py-2 border rounded hover:bg-gray-100 text-black"
//             onClick={() => setShowRatingConfirm(false)}
//             type="button"
//           >
//             Quay lại đánh giá
//           </button>
//           <button
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             onClick={() => {
//               setShowRatingConfirm(false);
//               submitReview();
//             }}
//             type="button"
//           >
//             Tiếp tục bỏ qua
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (!movie) return <div>Đang tải...</div>;

//   const positiveReviews = comments.filter((c) => c.sentiment === "positive").length;
//   const negativeReviews = comments.filter((c) => c.sentiment === "negative").length;
//   const totalReviews = positiveReviews + negativeReviews; // chỉ tính positive + negative

//   const positivePercentage = totalReviews ? ((positiveReviews / totalReviews) * 100).toFixed(1) : 0;
//   const negativePercentage = totalReviews ? ((negativeReviews / totalReviews) * 100).toFixed(1) : 0;

//   return (
//     <div className="mt-[80px] min-h-screen bg-gradient-to-r from-red-900 to-black text-white p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">{movie.title}</h1>

//         <div className="flex gap-6">
//           <img
//             src={movie.poster_url || FilmImg}
//             alt="Poster phim"
//             className="w-48 h-72 rounded-lg shadow-lg"
//           />

//           <div className="flex-1 space-y-2">
//             <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
//             <p className="text-sm italic text-gray-300">{movie.description}</p>
//             <p className="text-sm text-gray-400">{movie.detailed_description}</p>

//             <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm text-gray-300">
//               <div><span className="font-semibold">Thời gian:</span> {movie.duration} phút</div>
//               <div><span className="font-semibold">Thể loại:</span> {movie.genre}</div>
//               <div><span className="font-semibold">Khởi chiếu:</span> {new Date(movie.release_date).toLocaleDateString()}</div>
//               <div><span className="font-semibold">Đạo diễn:</span> {movie.director}</div>
//               <div><span className="font-semibold">Diễn viên:</span> {movie.actors}</div>
//               <div><span className="font-semibold">Ngôn ngữ:</span> {movie.language}</div>
//             </div>

//             <div className="mt-4">
//               <h3 className="text-lg font-semibold">Đánh giá trung bình</h3>
//               <div className="flex items-center">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span
//                     key={star}
//                     className={`text-3xl ${star <= (movie.average_rating / 2 || 0) ? "text-yellow-400" : "text-gray-500"}`}
//                   >
//                     ★
//                   </span>
//                 ))}
//                 <span className="ml-2 text-sm text-gray-300">
//                   ({Number(movie.average_rating || 0).toFixed(1)}/10)
//                 </span>
//               </div>
//             </div>

//             <div className="mt-4">
//               <h3 className="text-lg font-semibold">Tổng hợp đánh giá</h3>
//               <p className="text-green-400">Tích cực: {positivePercentage}% ({positiveReviews} lượt)</p>
//               <p className="text-red-400">Tiêu cực: {negativePercentage}% ({negativeReviews} lượt)</p>
//             </div>
//           </div>
//         </div>

//         {movie.trailer_url && (
//           <div className="mt-10">
//             <h3 className="text-xl font-semibold mb-4">Trailer</h3>
//             <div className="aspect-w-16 aspect-h-9">
//               <iframe
//                 src={movie.trailer_url}
//                 title="Trailer phim"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-96 rounded-lg shadow-lg"
//               />
//             </div>
//           </div>
//         )}

//         {movie.status !== "upcoming" && (
//           <div className="mt-6">
//             <button
//               onClick={() => navigate("/theaters", { state: { movie } })}
//               className="px-6 py-3 bg-[#E63946] text-white rounded-lg text-lg font-semibold hover:bg-transparent hover:border-gray-400 hover:border"
//             >
//               Đặt vé
//             </button>
//           </div>
//         )}

//         <div className="mt-8">
//           <h3 className="text-lg font-semibold">Đánh Giá của người xem</h3>
//           <div className="mt-4 space-y-4">
//             {comments.length === 0 ? (
//               <p className="text-gray-400">Chưa có nhận xét</p>
//             ) : (
//               comments.map((review, index) => (
//                 <div key={index} className="bg-gray-800 p-4 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={review.User?.avatar || "default-avatar.png"}
//                       alt="Avatar"
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <h4 className="font-semibold">
//                       {review.User?.full_name || "Người dùng ẩn danh"}
//                     </h4>
//                   </div>
//                   <div className="flex justify-between mt-2 items-center">
//                     <p className="text-gray-300">{review.comment}</p>
//                     <span
//                       className={`ml-4 px-2 py-1 rounded text-sm font-semibold ${review.sentiment === "positive"
//                           ? "bg-green-600 text-green-100"
//                           : review.sentiment === "negative"
//                             ? "bg-red-600 text-red-100"
//                             : "bg-gray-600 text-gray-100"
//                         }`}
//                     >
//                       {sentimentDisplayMap[review.sentiment] || review.sentiment}
//                     </span>
//                     {userInfo?.user_id === review.user_id && (
//                       <button
//                         onClick={() => handleDeleteComment(review.review_id)}
//                         className="text-red-400 hover:text-red-600 ml-4"
//                         title="Xoá nhận xét"
//                       >
//                         <FaTrashAlt />
//                       </button>
//                     )}
//                   </div>
//                   {review.rating !== null && (
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <span
//                           key={star}
//                           className={`text-xl ${star <= review.rating ? "text-yellow-400" : "text-gray-500"
//                             }`}
//                         >
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Thêm nhận xét của bạn</h3>

//           <div className="flex items-center space-x-1 mb-2 cursor-pointer select-none">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span
//                 key={star}
//                 onClick={() => setUserRating(star)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") setUserRating(star);
//                 }}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`${star} sao`}
//                 className={`text-3xl ${star <= userRating ? "text-yellow-400" : "text-gray-600"
//                   } hover:text-yellow-500`}
//               >
//                 ★
//               </span>
//             ))}
//           </div>

//           <textarea
//             placeholder="Viết nhận xét..."
//             className="w-full p-3 rounded-lg bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
//             rows={4}
//             value={userComment}
//             onChange={(e) => setUserComment(e.target.value)}
//           />
//           <button
//             onClick={handlePostComment}
//             className="mt-3 px-5 py-2 bg-[#E63946] rounded-lg text-white font-semibold hover:bg-red-700"
//           >
//             Gửi nhận xét
//           </button>
//         </div>
//       </div>

//       {showRatingConfirm && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={() => setShowRatingConfirm(false)}
//         >
//           <div
//             className="bg-white rounded-lg p-6 max-w-sm w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 className="text-lg font-semibold mb-4 text-black">Bạn chưa đánh giá số sao</h3>
//             <p className="mb-6 text-black">
//               Bạn có muốn tiếp tục gửi nhận xét mà không đánh giá sao không?
//             </p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 className="px-4 py-2 border rounded hover:bg-gray-100 text-black"
//                 onClick={() => setShowRatingConfirm(false)}
//                 type="button"
//               >
//                 Quay lại đánh giá
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 onClick={() => {
//                   setShowRatingConfirm(false);
//                   submitReview();
//                 }}
//                 type="button"
//               >
//                 Tiếp tục bỏ qua
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieDetail;
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

import FilmImg from "../assets/img/film/phim1.jpg";
import { getMovieDetail } from "../services/movieService";
import {
  getAvailableComment,
  postReview,
  deleteReview,
  analyzeSentiment,
} from "../services/userService";

const sentimentDisplayMap = {
  positive: "Tích cực",
  neutral: "Trung lập",
  negative: "Tiêu cực",
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(null);
  const [showRatingConfirm, setShowRatingConfirm] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin phim:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getAvailableComment(id);
        setComments(response);
      } catch (error) {
        console.error("Lỗi khi lấy nhận xét:", error);
      }
    };

    fetchMovieDetail();
    fetchComments();
  }, [id]);

  // Tính điểm trung bình dựa trên comments có rating
  const ratedComments = comments.filter(
    (c) => c.rating !== null && c.rating !== undefined
  );
  const averageRating = ratedComments.length
    ? ratedComments.reduce((sum, c) => sum + c.rating, 0) / ratedComments.length
    : 0;

  const forbiddenWords = [
    "địt", "đụ", "cặc", "lồn", "buồi", "clgt", "vãi lồn", "fuck", "shit", "bitch",
    "asshole", "motherfucker", "dmm", "fml", "đĩ", "điếm", "kiếp", "cmm", "dm",
    "dcm", "dkm", "cđm", "đcm",
  ];

  const specialCharacterRegex = /[~`!@#$%^&*()+={}\[\];:'"<>/?\\|]/g;

  const containsForbiddenWords = (text) => {
    return forbiddenWords.some((word) => text.toLowerCase().includes(word));
  };

  const containsSpecialCharacters = (text) => {
    return specialCharacterRegex.test(text);
  };

  const submitReview = async () => {
    const token = localStorage.getItem("token");
    try {
      const sentimentResult = await analyzeSentiment(userComment);
      const score = sentimentResult.score;

      let sentimentLabel = "neutral";
      if (score >= 0.25) sentimentLabel = "positive";
      else if (score <= -0.25) sentimentLabel = "negative";

      const reviewData = {
        movie_id: parseInt(id, 10),
        comment: userComment,
        user_id: userInfo.user_id,
        sentiment: sentimentLabel,
        rating: userRating,
      };

      await postReview(token, reviewData);
      toast.success("Gửi nhận xét thành công!");

      const updatedComments = await getAvailableComment(id);
      setComments(updatedComments);
      setUserComment("");
      setUserRating(null);
    } catch (error) {
      toast.error("Gửi nhận xét thất bại, vui lòng thử lại.");
      console.error("Lỗi khi gửi nhận xét:", error);
    }
  };

  const handlePostComment = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
      return;
    }
    if (!userComment.trim()) {
      toast.error("Vui lòng nhập nội dung nhận xét");
      return;
    }
    if (!userInfo || !userInfo.user_id) {
      toast.error("Không tìm thấy thông tin người dùng");
      return;
    }
    if (containsForbiddenWords(userComment)) {
      toast.error("Nội dung nhận xét chứa từ ngữ không phù hợp");
      return;
    }
    if (containsSpecialCharacters(userComment)) {
      toast.error("Không được sử dụng kí tự đặc biệt trong nhận xét");
      return;
    }

    if (userRating === null) {
      setShowRatingConfirm(true);
    } else {
      submitReview();
    }
  };

  const handleDeleteComment = async (reviewId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn cần đăng nhập để xoá nhận xét");
      return;
    }

    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xoá nhận xét này không?"
    );
    if (!confirmDelete) return;

    try {
      await deleteReview(token, reviewId);
      toast.success("Xoá nhận xét thành công!");

      const updatedComments = await getAvailableComment(id);
      setComments(updatedComments);
    } catch (error) {
      toast.error("Không thể xoá nhận xét. Vui lòng thử lại.");
      console.error("Lỗi khi xoá nhận xét:", error);
    }
  };

  const RatingConfirmModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowRatingConfirm(false)}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-black">
          Bạn chưa đánh giá số sao
        </h3>
        <p className="mb-6 text-black">
          Bạn có muốn tiếp tục gửi nhận xét mà không đánh giá sao không?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100 text-black"
            onClick={() => setShowRatingConfirm(false)}
            type="button"
          >
            Quay lại đánh giá
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => {
              setShowRatingConfirm(false);
              submitReview();
            }}
            type="button"
          >
            Tiếp tục bỏ qua
          </button>
        </div>
      </div>
    </div>
  );

  if (!movie) return <div>Đang tải...</div>;

  const positiveReviews = comments.filter((c) => c.sentiment === "positive").length;
  const negativeReviews = comments.filter((c) => c.sentiment === "negative").length;
  const totalReviews = positiveReviews + negativeReviews; // chỉ tính positive + negative

  const positivePercentage = totalReviews
    ? ((positiveReviews / totalReviews) * 100).toFixed(1)
    : 0;
  const negativePercentage = totalReviews
    ? ((negativeReviews / totalReviews) * 100).toFixed(1)
    : 0;

  return (
    <div className="mt-[80px] min-h-screen bg-gradient-to-r from-red-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{movie.title}</h1>

        <div className="flex gap-6">
          <img
            src={movie.poster_url || FilmImg}
            alt="Poster phim"
            className="w-48 h-72 rounded-lg shadow-lg"
          />

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
            <p className="text-sm italic text-gray-300">{movie.description}</p>
            <p className="text-sm text-gray-400">{movie.detailed_description}</p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm text-gray-300">
              <div>
                <span className="font-semibold">Thời gian:</span> {movie.duration} phút
              </div>
              <div>
                <span className="font-semibold">Thể loại:</span> {movie.genre}
              </div>
              <div>
                <span className="font-semibold">Khởi chiếu:</span>{" "}
                {new Date(movie.release_date).toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Đạo diễn:</span> {movie.director}
              </div>
              <div>
                <span className="font-semibold">Diễn viên:</span> {movie.actors}
              </div>
              <div>
                <span className="font-semibold">Ngôn ngữ:</span> {movie.language}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Đánh giá trung bình</h3>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl ${
                      star <= averageRating ? "text-yellow-400" : "text-gray-500"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-300">
                  ({Number(averageRating * 2).toFixed(1)}/10)
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Tổng hợp đánh giá</h3>
              <p className="text-green-400">
                Tích cực: {positivePercentage}% ({positiveReviews} lượt)
              </p>
              <p className="text-red-400">
                Tiêu cực: {negativePercentage}% ({negativeReviews} lượt)
              </p>
            </div>
          </div>
        </div>

        {movie.trailer_url && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Trailer</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={movie.trailer_url}
                title="Trailer phim"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-96 rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}

        {movie.status !== "upcoming" && (
          <div className="mt-6">
            <button
              onClick={() => navigate("/theaters", { state: { movie } })}
              className="px-6 py-3 bg-[#E63946] text-white rounded-lg text-lg font-semibold hover:bg-transparent hover:border-gray-400 hover:border"
            >
              Đặt vé
            </button>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Đánh Giá của người xem</h3>
          <div className="mt-4 space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-400">Chưa có nhận xét</p>
            ) : (
              comments.map((review, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.User?.avatar || "default-avatar.png"}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <h4 className="font-semibold">
                      {review.User?.full_name || "Người dùng ẩn danh"}
                    </h4>
                  </div>
                  <div className="flex justify-between mt-2 items-center">
                    <p className="text-gray-300">{review.comment}</p>
                    {/* <span
                      className={`ml-4 px-2 py-1 rounded text-sm font-semibold ${
                        review.sentiment === "positive"
                          ? "bg-green-600 text-green-100"
                          : review.sentiment === "negative"
                          ? "bg-red-600 text-red-100"
                          : "bg-gray-600 text-gray-100"
                      }`}
                    >
                      {sentimentDisplayMap[review.sentiment] || review.sentiment}
                    </span> */}
                    {userInfo?.user_id === review.user_id && (
                      <button
                        onClick={() => handleDeleteComment(review.review_id)}
                        className="text-red-400 hover:text-red-600 ml-4"
                        title="Xoá nhận xét"
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                  {review.rating !== null && (
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-xl ${
                            star <= review.rating
                              ? "text-yellow-400"
                              : "text-gray-500"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Thêm nhận xét của bạn</h3>

          <div className="flex items-center space-x-1 mb-2 cursor-pointer select-none">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setUserRating(star)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setUserRating(star);
                }}
                role="button"
                tabIndex={0}
                aria-label={`${star} sao`}
                className={`text-3xl ${
                  star <= userRating ? "text-yellow-400" : "text-gray-600"
                } hover:text-yellow-500`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Viết nhận xét..."
            className="w-full p-3 rounded-lg bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={4}
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
          <button
            onClick={handlePostComment}
            className="mt-3 px-5 py-2 bg-[#E63946] rounded-lg text-white font-semibold hover:bg-red-700"
          >
            Gửi nhận xét
          </button>
        </div>
      </div>

      {showRatingConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowRatingConfirm(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4 text-black">
              Bạn chưa đánh giá số sao
            </h3>
            <p className="mb-6 text-black">
              Bạn có muốn tiếp tục gửi nhận xét mà không đánh giá sao không?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 border rounded hover:bg-gray-100 text-black"
                onClick={() => setShowRatingConfirm(false)}
                type="button"
              >
                Quay lại đánh giá
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  setShowRatingConfirm(false);
                  submitReview();
                }}
                type="button"
              >
                Tiếp tục bỏ qua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;