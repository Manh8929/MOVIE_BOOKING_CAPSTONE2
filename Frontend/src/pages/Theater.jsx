import React, { useEffect, useState } from "react";
import { getTheatersByMovie } from "../services/userService";
import { useLocation, useNavigate } from "react-router-dom";

const Theater = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  console.log("location", location);
  const { movie } = location.state || {};
  console.log("movie", movie);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchTheaters = async () => {
      if (!movie?.movie_id) {
        setError("Không tìm thấy thông tin phim.");
        setLoading(false);
        return;
      }

      try {
        const data = await getTheatersByMovie(movie.movie_id);
        console.log("data", data);
        setTheaters(data);
      } catch (err) {
        setError("Không thể tải danh sách rạp.");
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, [movie]);

  const handleSelectTheater = (theater) => {
    localStorage.setItem("selectedTheaterId", theater.theater_id);
    localStorage.setItem("selectedTheaterName", theater.name);
    localStorage.setItem("selectedMovieId", movie.movie_id); // Lưu cả movie_id
    navigate("/booking-movie", { state: { movie, theater } }); // truyền cả movie & theater
  };

  if (loading)
    return (
      <p className="text-center text-lg text-gray-500">
        Đang tải danh sách rạp...
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-900 to-black">
      <div className="max-w-3xl w-full p-6 bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          Chọn Rạp Chiếu
        </h2>
        {theaters.length > 0 ? (
          <ul className="space-y-4">
            {theaters.map((theater) => (
              <li
                key={theater.theater_id}
                onClick={() => handleSelectTheater(theater)}
                className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-800 cursor-pointer transition duration-200"
              >
                <p className="text-2xl font-semibold text-white">
                  {theater.name}
                </p>
                <p className="text-gray-300">{theater.location}</p>
                <p className="text-gray-400 text-sm">
                  Liên hệ: {theater.contact}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">
            Không có rạp chiếu cho phim này.
          </p>
        )}
      </div>
    </div>
  );
};

export default Theater;
