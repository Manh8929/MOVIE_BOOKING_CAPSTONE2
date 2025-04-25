import axios from "axios";

const token = localStorage.getItem("token"); 
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const config = {
  headers: {
    Authorization: `Bearer ${token}`, 
    Accept: 'application/json',
  }
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
export const createAdminMovie = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/movies`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
};

// Cập nhật phim theo ID
export const updateAdminMovie = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/movies/${id}`, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error updating movie with id ${id}:`, error);
    throw error;
  }
};

// Xóa phim theo ID
export const deleteAdminMovie = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/admin/movies/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error deleting movie with id ${id}:`, error);
    throw error;
  }
};
