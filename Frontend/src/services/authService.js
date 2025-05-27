import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Hàm register user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
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


// Gửi yêu cầu reset password (quên mật khẩu)
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Error during forgot password:", error);
    throw error;
  }
};

// Đặt lại mật khẩu với token
export const resetPassword = async (data) => {
  // data: { token, newPassword, confirmPassword }
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, data);
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};