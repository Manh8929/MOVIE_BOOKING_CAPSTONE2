import axios from "axios";

const token = localStorage.getItem("token");
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
};


/// ---- User --- ///
export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về danh sách người dùng
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
export const deleteUser = async (token, userId) => {
  try {
    await axios.delete(`${API_URL}/api/admin/deleteUsers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User deleted successfully"); // Thông báo thành công
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
export const updateUser = async (token, userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/updateUsers/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về thông tin người dùng đã cập nhật
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

/// ---- movie --- ///
// Lấy danh sách phim
export const getAdminMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/movies`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Tạo phim mới
export const createAdminMovie = async (formData) => {
  const token = localStorage.getItem("token"); 

  return await axios.post(
    "http://localhost:5000/api/admin/movies",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, 
    }
  );
};
// Cập nhật phim theo ID
export const updateAdminMovie = async (id, movieData) => {
  const token = localStorage.getItem("token");

  return await axios.put(
    `${API_URL}/api/admin/movies/${id}`,
    movieData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
};


// Xóa phim theo ID
export const deleteAdminMovie = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/admin/movies/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting movie with id ${id}:`, error);
    throw error;
  }
};


/// ---- theaters --- ///

// Lấy danh sách tất cả rạp
export const getAllTheaters = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/theaters`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching theaters:", error);
    throw error;
  }
};

// Thêm rạp mới
export const createTheater = async (theaterData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/theaters`,
      theaterData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error creating theater:", error);
    throw error;
  }
};

// Cập nhật thông tin rạp
export const updateTheater = async (id, theaterData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/admin/theaters/${id}`,
      theaterData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating theater with id ${id}:`, error);
    throw error;
  }
};

// Xóa rạp
export const deleteTheater = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/admin/theaters/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting theater with id ${id}:`, error);
    throw error;
  }
};
//--------------quản lý ghế-------------------//

// Lấy tất cả ghế
export const getAllSeats = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/viewAll-seats`, config);
    return response.data; 
  } catch (error) {
    console.error("Error fetching all seats:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Cập nhật ghế
export const updateSeat = async (id, seatData) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/seats/${id}`, seatData, config);
    return response.data;
  } catch (error) {
    console.error("Error updating seat:", error);
    throw error;
  }
};

// Tạo ghế tự động
export const createSeats = async (showtime_id, screen_id, total_seats) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/create-seats`, { showtime_id, screen_id,total_seats }, config);
    return response.data;
  } catch (error) {
    console.error("Error creating seats:", error);
    throw error;
  }
};

/// ---- Screen --- ///
export const getAllScreens = async (token) => {
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