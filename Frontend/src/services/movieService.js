import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getAvailableMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data.movies;
  } catch (error) {
    console.error("Error fetching available movies:", error);
    throw error;
  }
};

export const getMovieDetail = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/movies/${movieId}`);
    return response.data.movie; 
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};