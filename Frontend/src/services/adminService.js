import axios from "axios";

const token = localStorage.getItem("token");
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
};

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
