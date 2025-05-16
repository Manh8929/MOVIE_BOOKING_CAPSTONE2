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
    const response = await axios.get(`${API_URL}/api/admin/getAllUsers`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/admin/deleteUsers/${userId}`, getConfig());
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
    const response = await axios.get(`${API_URL}/api/admin/movies`, getConfig());
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
    const response = await axios.delete(`${API_URL}/api/admin/movies/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa phim với id ${id}:`, error);
    throw error;
  }
};

/// ---- Theaters --- ///
export const getAllTheaters = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/theaters`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách rạp:", error);
    throw error;
  }
};

export const createTheater = async (theaterData) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/theaters`, theaterData, getConfig());
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo rạp:", error);
    throw error;
  }
};

export const updateTheater = async (id, theaterData) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/theaters/${id}`, theaterData, getConfig());
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật rạp với id ${id}:`, error);
    throw error;
  }
};

export const deleteTheater = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/admin/theaters/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa rạp với id ${id}:`, error);
    throw error;
  }
};

/// ---- Screens --- ///
export const getAllScreens = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/screens`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng chiếu:", error);
    throw error;
  }
};

export const createScreen = async (screenData) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/screens`, screenData, getConfig());
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo phòng chiếu:", error);
    throw error;
  }
};

export const updateScreen = async (id, screenData) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/screens/${id}`, screenData, getConfig());
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật phòng chiếu với id ${id}:`, error);
    throw error;
  }
};

export const deleteScreen = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/admin/screens/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa phòng chiếu với id ${id}:`, error);
    throw error;
  }
};

/// ---- News --- ///
export const addNews = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/news`, data, getConfig());
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm tin tức:", error);
    throw error;
  }
};

export const deleteNews = async (newsId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/admin/news/${newsId}`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa tin tức:", error);
    throw error;
  }
};
