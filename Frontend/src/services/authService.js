import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Hàm register user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    console.log("User registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
// Hàm login user
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
