import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Hàm lấy thông tin user profile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin user profile
export const updateUserProfile = async (token, data) => {
  if (!token) {
    throw new Error("Token is required to update user profile");
  }

  try {
    const response = await axios.put(
      `${API_URL}/api/user/profile/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Unable to update user profile. Please try again later.");
  }
};

// Hàm lấy danh sách tin tức
export const getNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/new/news`);
    return response.data; // trả về dữ liệu tin tức
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw new Error("Không thể tải tin tức. Vui lòng thử lại.");
  }
};

// Hàm lấy tin tức theo ID
export const getNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/new/news/${id}`);
    return response.data; // trả về tin tức chi tiết theo ID
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    throw new Error("Không thể tải tin tức chi tiết. Vui lòng thử lại.");
  }
};

// Hàm lấy danh sách phim
export const getMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data.movies; // trả về dữ liệu danh sách phim
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; // ném lỗi ra ngoài để xử lý khi cần
  }
};

// xem rạp chiếu
export const getAvailableTheaters = async () => {
  try {
    const response = await axios.get(`${API_URL}/theaters`);
    return response.data.theaters;
  } catch (error) {
    console.error("Error fetching available theaters:", error);
    throw error;
  }
};

// xem comment
export const getAvailableComment = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/review/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

//
export const postReview = async (token, reviewData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/user/review`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const deleteReview = async (token, reviewId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/user/review/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};


// Hàm gọi API phân tích sentiment
export const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/api/sentiment`, { text });
    return response.data; // { score: ..., magnitude: ... }
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw error;
  }
};
// promotion
export const getAvailablPromotion = async () => {
  try {
    const response = await axios.get(`${API_URL}/promotion`);
    return response.data;
  } catch (error) {
    console.error("Error fetching available promotion:", error);
    throw error;
  }
};


export const getTheatersByMovie = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/theaters-by-movie?movieId=${movieId}`);
    return response.data.theaters;
  } catch (error) {
    console.error("Error fetching available theaters-by-movie:", error);
    throw error;
  }
};

export const getShowtimesByMovieTheaterDate = async (movieId, theaterId, date) => {
  try {
    const response = await axios.get(`${API_URL}/showtime/showtimes-by-date-and-theater`, {
      params: { movieId, theaterId, date },
    });
    return response.data.showtimes;
  } catch (error) {
    console.error("Error fetching showtimes by movie, theater and date:", error);
    throw error;
  }
};


export const getSeatsByShowtime = async (showtimeId) => {
  try {
    const response = await axios.get(`${API_URL}/seats/${showtimeId}`);
    return response.data.seats;
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};


// ========== SEAT TYPE ========== //

// Lấy tất cả loại ghế
export const getSeatTypes = async () => {
  const res = await axios.get(`${API_URL}/view-price`);
  return res.data;
};

// Hàm lấy danh sách thanh toán của user (chỉ completed)
export const getUserPayments = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/payment/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.payments; 
  } catch (error) {
    console.error("Error fetching user payments:", error);
    throw error;
  }
};
