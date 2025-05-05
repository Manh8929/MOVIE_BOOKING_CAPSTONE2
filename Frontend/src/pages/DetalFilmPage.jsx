import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetail } from "../services/movieService";
import FilmImg from "../assets/img/film/phim1.jpg";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const [rating, setRating] = useState(4);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovie(data);
        setRating(data.rating);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  // Reviews processing
  const reviews = movie.reviews || [];
  const positiveKeywords = ["tuyệt vời", "hay", "phải xem", "xuất sắc"];
  const negativeKeywords = ["chán", "buồn ngủ", "tệ"];

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
              <h3 className="text-lg font-semibold">Đánh giá</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl cursor-pointer ${
                      star <= rating / 2 ? "text-yellow-400" : "text-gray-500"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <p className="text-sm m-2">{totalReviews} lượt</p>
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


        {/* Proceed Button */}
        {movie.status !== "upcoming" && (
          <div className="mt-6">
            <button
              onClick={() => navigate("/booking-movie")}
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
            {reviews.length === 0 ? (
              <p className="text-gray-400">Chưa có nhận xét</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-gray-300">{review.comment}</p>
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
