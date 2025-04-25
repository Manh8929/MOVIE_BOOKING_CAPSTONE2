import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Hàm lấy thông tin user profile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};


// Hàm cập nhật thông tin user profile
// export const updateUserProfile = async (token, data) => {
//   if (!token) {
//     throw new Error("Token is required to update user profile");
//   }

//   try {
//     const response = await axios.put(`${API_URL}/api/user/profile/update`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     throw new Error("Unable to update user profile. Please try again later.");
//   }
// };

export const updateUserProfile = async (token, data) => {
  if (!token) {
    throw new Error("Token is required to update user profile");
  }

  try {
    const response = await axios.put(`${API_URL}/api/user/profile/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Unable to update user profile. Please try again later.");
  }
};