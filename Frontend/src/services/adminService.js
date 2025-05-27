import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const getToken = () => localStorage.getItem("token");

const getConfig = (contentType = "application/json") => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
    "Content-Type": contentType,
  },
  withCredentials: true, // nếu cần gửi cookie, auth
});

/// ---- User --- ///
export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/admin/getAllUsers`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/admin/deleteUsers/${userId}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/admin/updateUsers/${userId}`,
      userData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật user:", error);
    throw error;
  }
};

/// ---- Movie --- ///
export const getAdminMovies = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/admin/movies`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy phim:", error);
    throw error;
  }
};

export const createAdminMovie = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/movies`,
      formData,
      getConfig("multipart/form-data")
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo phim:", error);
    throw error;
  }
};

export const updateAdminMovie = async (id, movieData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/admin/movies/${id}`,
      movieData,
      getConfig("multipart/form-data")
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật phim:", error);
    throw error;
  }
};

export const deleteAdminMovie = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/admin/movies/${id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa phim với id ${id}:`, error);
    throw error;
  }
};

/// ---- Theaters --- ///
export const getAllTheaters = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/admin/theaters`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách rạp:", error);
    throw error;
  }
};

export const createTheater = async (theaterData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/theaters`,
      theaterData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo rạp:", error);
    throw error;
  }
};

export const updateTheater = async (id, theaterData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/admin/theaters/${id}`,
      theaterData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật rạp với id ${id}:`, error);
    throw error;
  }
};

export const deleteTheater = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/admin/theaters/${id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa rạp với id ${id}:`, error);
    throw error;
  }
};

/// ---- Screens --- ///
export const getAllScreens = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/admin/screens`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng chiếu:", error);
    throw error;
  }
};

export const createScreen = async (screenData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/screens`,
      screenData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo phòng chiếu:", error);
    throw error;
  }
};

export const updateScreen = async (id, screenData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/admin/screens/${id}`,
      screenData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật phòng chiếu với id ${id}:`, error);
    throw error;
  }
};

export const deleteScreen = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/admin/screens/${id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa phòng chiếu với id ${id}:`, error);
    throw error;
  }
};

/// ---- News --- ///
export const addNews = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/news`,
      data,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm tin tức:", error);
    throw error;
  }
};

export const deleteNews = async (newsId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/admin/news/${newsId}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa tin tức:", error);
    throw error;
  }
};
//--------------quản lý ghế-------------------//

// Lấy tất cả ghế
export const getAllSeats = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/admin/viewAll-seats`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all seats:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Cập nhật ghế
export const updateSeat = async (id, seatData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/admin/seats/${id}`,
      seatData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating seat:", error);
    throw error;
  }
};

// Tạo ghế tự động
export const createSeats = async (showtime_id, screen_id, total_seats) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/create-seats`,
      { showtime_id, screen_id, total_seats },
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating seats:", error);
    throw error;
  }
};

//xóa ghế
export const deleteSeat = async (seatId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/admin/seats/${seatId}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa ghế:", error);
    throw error;
  }
};

// Xoá nhiều ghế
export const deleteSeatsBulk = async (seatIds) => {
  try {
    const response = await axios.delete(`${API_URL}/api/admin/delete-many`, {
      data: { seatIds },
      ...getConfig(),
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa nhiều ghế:", error);
    throw error;
  }
};

//select Screen
export const getAllSelectScreens = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/screens`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data.screens; // Trả về mảng screens
  } catch (error) {
    console.error("Lỗi khi gọi API getAllScreens:", error);
    throw error;
  }
};

export const fetchShowtimes = async () => {
  try {
    const res = await axios.get(`${API_URL}/showtime/showtimes`);
    return res.data.data; // Lấy danh sách lịch chiếu
  } catch (err) {
    console.error("Lỗi lấy lịch chiếu:", err);
    throw err;
  }
};

export const getUpcomingShowtimes = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/admin/upcoming`, getConfig());
    return res.data; // Lấy danh sách lịch chiếu
  } catch (err) {
    console.error("Lỗi lấy lịch chiếu:", err);
    throw err;
  }
};

// ========== SEAT TYPE ========== //

// Lấy tất cả loại ghế
export const getSeatTypes = async () => {
  const res = await axios.get(`${API_URL}/api/admin/price`, getConfig());
  return res.data;
};

// Tạo mới loại ghế
export const createSeatType = async (data) => {
  const res = await axios.post(
    `${API_URL}/api/admin/create-price`,
    data,
    getConfig()
  );
  return res.data;
};

// Cập nhật loại ghế
export const updateSeatType = async (id, data) => {
  const res = await axios.put(
    `${API_URL}/api/admin/update-price/${id}`,
    data,
    getConfig()
  );
  return res.data;
};

// Xoá loại ghế
export const deleteSeatType = async (id) => {
  const res = await axios.delete(
    `${API_URL}/api/admin/delete-price/${id}`,
    getConfig()
  );
  return res.data;
};
// Xoá nhiều loại ghế
export const deleteSeatTypesBulk = async (seatTypeIds) => {
  const res = await axios.delete("/api/admin/seat-types/delete-many", {
    data: { seatTypeIds }, // body truyền vào đây
    ...getConfig(), // headers (ví dụ auth token)
  });
  return res.data;
};

// Lấy danh sách promotion
export const getAllPromotions = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/admin/promotion`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách promotion:", error);
    throw error;
  }
};

// Tạo promotion mới
export const createPromotion = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/promotion`,
      formData,
      getConfig("multipart/form-data")
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo promotion:", error);
    throw error;
  }
};

// Cập nhật promotion theo id
export const updatePromotion = async (id, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/admin/promotion/${id}`,
      formData,
      getConfig("multipart/form-data")
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật promotion:", error);
    throw error;
  }
};

// Xoá promotion theo id
export const deletePromotion = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/admin/promotion/${id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa promotion với id ${id}:`, error);
    throw error;
  }
};

/// ---- Showtime --- ///

export const getAllShowtimes = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/admin/showtime-all`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách showtimes:", error);
    throw error;
  }
};

export const createShowtime = async (data) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/admin/showtimes`,
      data,
      getConfig()
    );
    return res.data;
  } catch (err) {
    console.error("Lỗi createShowtime:", err);
    throw err;
  }
};

export const updateShowtime = async (id, data) => {
  try {
    const res = await axios.put(
      `${API_URL}/api/admin/showtimes/${id}`,
      data,
      getConfig()
    );
    return res.data;
  } catch (err) {
    console.error("Lỗi updateShowtime:", err);
    throw err;
  }
};

export const deleteShowtime = async (id) => {
  try {
    const res = await axios.delete(
      `${API_URL}/api/admin/showtimes/${id}`,
      getConfig()
    );
    return res.data;
  } catch (err) {
    console.error("Lỗi deleteShowtime:", err);
    throw err;
  }
};

export const deleteMultipleShowtimes = async (ids) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/delete-multiple`,
      { ids },
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa các suất chiếu đã chọn:", error);
    throw error;
  }
};
