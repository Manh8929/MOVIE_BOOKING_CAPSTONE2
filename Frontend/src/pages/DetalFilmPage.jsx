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
} from "../services/userService";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getAvailableComment(id);
        console.log("FULL RESPONSE:", response);
        setComments(response);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchMovieDetail();
    fetchComments();
  }, [id]);

  const forbiddenWords = [
    "địt",
    "đụ",
    "cặc",
    "lồn",
    "buồi",
    "clgt",
    "vãi lồn",
    "fuck",
    "shit",
    "bitch",
    "asshole",
    "motherfucker",
    "dmm",
    "fml",
    "đĩ",
    "điếm",
    "kiếp",
    "cmm",
    "dm",
    "dcm",
    "dkm",
    "cđm",
    "đcm"
  ];

  const specialCharacterRegex = /[~`!@#$%^&*()+={}\[\];:'"<>/?\\|]/g;

  const containsForbiddenWords = (text) => {
    return forbiddenWords.some((word) => text.toLowerCase().includes(word));
  };

  const containsSpecialCharacters = (text) => {
    return specialCharacterRegex.test(text);
  };

  const handlePostComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
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

    try {
      const reviewData = {
        movie_id: parseInt(id, 10),
        comment: userComment,
        sentiment: "positive",
        user_id: userInfo.user_id,
      };

      await postReview(token, reviewData);
      toast.success("Gửi nhận xét thành công!");

      const updatedComments = await getAvailableComment(id);
      setComments(updatedComments);
      setUserComment("");
    } catch (error) {
      toast.error("Gửi nhận xét thất bại, vui lòng thử lại.");
      console.error("Error posting comment:", error);
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

      // Cập nhật lại danh sách comment
      const updatedComments = await getAvailableComment(id);
      setComments(updatedComments);
    } catch (error) {
      toast.error("Không thể xoá nhận xét. Vui lòng thử lại.");
      console.error("Error deleting comment:", error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  // Reviews processing
  const reviews = comments || [];
  const positiveKeywords = [
    // 🇻🇳 Tiếng Việt phổ thông
    "tuyệt vời",
    "rất hay",
    "xuất sắc",
    "phải xem",
    "cảm động",
    "ấn tượng",
    "hấp dẫn",
    "mãn nhãn",
    "hay",
    "kịch tính",
    "đáng xem",
    "cuốn",
    "tình tiết hay",
    "hài hước",
    "sáng tạo",
    "lôi cuốn",
    "tạo cảm hứng",
    "gây xúc động",
    "rất đỉnh",

    // Gen Z Việt
    "đỉnh kout",
    "xịn xò",
    "cháy",
    "nức nở",
    "hết nước chấm",
    "đỉnh của chóp",
    "best",
    "gắt",
    "khum thể tin nổi",
    "iu quá",
    "nghệ thật",
    "tấu hài",
    "bùng nổ",
    "bốc lửa",
    "cưng xỉu",
    "trùm cuối",
    "đậm đà bản sắc",
    "đáng đồng tiền bát gạo",
    "xịn mịn",

    // 🇺🇸 English (formal + informal)
    "awesome",
    "great",
    "excellent",
    "must watch",
    "masterpiece",
    "touching",
    "exciting",
    "emotional",
    "amazing",
    "worth it",
    "loved it",
    "heartwarming",
    "funny",
    "engaging",
    "inspiring",
    "mind-blowing",
    "cool",
    "unique",
    "brilliant",

    // English Gen Z / Slang
    "fire",
    "banger",
    "goat",
    "lit",
    "dope",
    "next level",
    "slaps",
    "vibes",
    "on point",
    "chef's kiss",
    "peak",
    "10/10",
    "💯",
    "🔥",
    "😍",
    "🤩",
    "👏",
    "👌",
  ];

  const negativeKeywords = [
    // 🇻🇳 Tiếng Việt phổ thông
    "chán",
    "tệ",
    "buồn ngủ",
    "dở",
    "nhàm chán",
    "thiếu muối",
    "vô vị",
    "không cảm xúc",
    "xem xong quên luôn",
    "lỗi",
    "cẩu thả",
    "rời rạc",
    "thiếu logic",
    "diễn dở",
    "thiếu chiều sâu",
    "quá nhanh",
    "quá dài",
    "ngủ gật",
    "xàm",

    // Gen Z Việt
    "toang",
    "flop",
    "xỉu ngang",
    "tụt mood",
    "fail",
    "rác",
    "chán đời",
    "xàm xí",
    "lươn lẹo",
    "mất vibe",
    "ngáo",
    "nghe mệt",
    "xàm ghê",
    "khó nuốt",
    "xỉn",
    "ghẻ",
    "tạch",
    "khoai",

    // 🇺🇸 English (formal + informal)
    "boring",
    "bad",
    "terrible",
    "lame",
    "weak",
    "poor",
    "slow",
    "predictable",
    "not worth it",
    "mediocre",
    "unrealistic",
    "flat",
    "shallow",
    "cringe",
    "forgettable",
    "overrated",
    "underwhelming",
    "dragging",
    "messy",
    "cliché",

    // English Gen Z / Slang
    "mid",
    "trash",
    "sleepy",
    "flop",
    "dry",
    "snoozefest",
    "yawn",
    "👎",
    "😴",
    "💤",
    "🤮",
    "🙄",
    "😑",
    "😬",
  ];

  const positiveReviews = reviews.filter((r) =>
    positiveKeywords.some((word) => r.comment.toLowerCase().includes(word))
  ).length;

  const negativeReviews = reviews.filter((r) =>
    negativeKeywords.some((word) => r.comment.toLowerCase().includes(word))
  ).length;

  const totalReviews = reviews.length;
  const positivePercentage = ((positiveReviews / totalReviews) * 100).toFixed(
    1
  );
  const negativePercentage = ((negativeReviews / totalReviews) * 100).toFixed(
    1
  );

  return (
    <div className="mt-[80px] min-h-screen bg-gradient-to-r from-red-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{movie.title}</h1>

        <div className="flex gap-6">
          {/* Movie Poster */}
          <img
            src={movie.poster_url || FilmImg}
            alt="Movie Poster"
            className="w-48 h-72 rounded-lg shadow-lg"
          />

          {/* Movie Info */}
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
            <p className="text-sm italic text-gray-300">{movie.description}</p>
            <p className="text-sm text-gray-400">
              {movie.detailed_description}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm text-gray-300">
              <div>
                <span className="font-semibold">Thời gian:</span>{" "}
                {movie.duration} phút
              </div>
              <div>
                <span className="font-semibold">Thể loại:</span> {movie.genre}
              </div>
              <div>
                <span className="font-semibold">Khởi chiếu:</span>{" "}
                {new Date(movie.release_date).toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Đạo diễn:</span>{" "}
                {movie.director}
              </div>
              <div>
                <span className="font-semibold">Diễn viên:</span> {movie.actors}
              </div>
              <div>
                <span className="font-semibold">Ngôn ngữ:</span>{" "}
                {movie.language}
              </div>
            </div>

            {/* Rating System */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Đánh giá trung bình</h3>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl ${
                      star <= (movie.average_rating / 2 || 0)
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-300">
                  ({Number(movie.average_rating || 0).toFixed(1)}/10)
                </span>
              </div>
            </div>

            {/* Reviews Summary */}
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
        {/* trailler */}
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
              ></iframe>
            </div>
          </div>
        )}

        {/* Proceed Button */}
        {movie.status !== "upcoming" && (
          <div className="mt-6">
            <button
              onClick={() => navigate("/theaters",{ state: { movie } })}
              className="px-6 py-3 bg-[#E63946] text-white rounded-lg text-lg font-semibold hover:bg-transparent hover:border-gray-400 hover:border"
            >
              Đặt vé
            </button>
          </div>
        )}

        {/* User Reviews */}
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
                      src={`${review.User?.avatar || "default-avatar.png"}`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <h4 className="font-semibold">
                      {review.User?.full_name || "Người dùng ẩn danh"}
                    </h4>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-gray-300">{review.comment}</p>
                    {userInfo?.user_id === review.user_id && (
                      <button
                        onClick={() => handleDeleteComment(review.review_id)}
                        className="text-red-400 hover:text-red-600"
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

        {/* Form gửi nhận xét */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Thêm nhận xét của bạn</h3>
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
    </div>
  );
};

export default MovieDetail;
