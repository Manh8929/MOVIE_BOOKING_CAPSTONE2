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
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const deleteUser = async (token, userId) => {
  try {
    await axios.delete(`${API_URL}/api/admin/deleteUsers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUser = async (token, userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/updateUsers/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

/// ---- movie --- ///
export const getAdminMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/movies`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const createAdminMovie = async (formData) => {
  const token = localStorage.getItem("token");

  return await axios.post(
    `${API_URL}/api/admin/movies`,
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

export const deleteAdminMovie = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/admin/movies/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error deleting movie with id ${id}:`, error);
    throw error;
  }
};

/// ---- theaters --- ///
export const getAllTheaters = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/theaters`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching theaters:", error);
    throw error;
  }
};

export const createTheater = async (theaterData) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/theaters`, theaterData, config);
    return response.data;
  } catch (error) {
    console.error("Error creating theater:", error);
    throw error;
  }
};

export const updateTheater = async (id, theaterData) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/theaters/${id}`, theaterData, config);
    return response.data;
  } catch (error) {
    console.error(`Error updating theater with id ${id}:`, error);
    throw error;
  }
};

export const deleteTheater = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/admin/theaters/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error deleting theater with id ${id}:`, error);
    throw error;
  }
};

/// ---- news --- ///
export const addNews = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/news`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error adding news:", error);
    throw error;
  }
};

export const deleteNews = async (newsId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/admin/news/${newsId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
};

// Hàm lấy danh sách phim
export const getMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/movies`);
    return response.data.movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
