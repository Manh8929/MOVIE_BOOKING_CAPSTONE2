// services/apiService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const sendMessageToBot = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/api/chatbot`, { message });
    return response.data.reply;
  } catch (error) {
    console.error("Error sending message to bot:", error);
    return "Xin lỗi, tôi không thể phản hồi lúc này.";
  }
};