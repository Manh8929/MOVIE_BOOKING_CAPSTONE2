import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Tạo link thanh toán
 * @param {Object} data - Dữ liệu thanh toán gửi lên server
 * @param {string} data.user_id
 * @param {number} data.amount
 * @param {string[]} data.selectedSeats
 * @param {string} data.showtime_id
 * @param {string} [data.description]
 * @returns {Promise<Object>} - Trả về link thanh toán và các thông tin liên quan
 */
export const createPaymentLink = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/payment/create-payment-link`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo link thanh toán:", error);
    throw error?.response?.data || { message: "Không thể tạo link thanh toán" };
  }
};

/**
 * Cập nhật trạng thái thanh toán
 * @param {Object} data
 * @param {string | number} data.payment_id
 * @param {string} data.status - 'PAID', 'CANCELLED', 'FAILED'...
 * @returns {Promise<Object>}
 */
export const updatePaymentStatus = async (data) => {
  try {
    const token = localStorage.getItem("token"); 

    const response = await axios.post(
      `${API_URL}/payment/update-payment-status`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
    throw (
      error?.response?.data || {
        message: "Không thể cập nhật trạng thái thanh toán",
      }
    );
  }
};
