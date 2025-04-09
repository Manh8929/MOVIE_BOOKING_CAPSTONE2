import userService from "../services/userService.js";
import { getAllShowtimes, getShowtimesByDate } from "../services/showtimeService.js";

// GET user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    // Gọi service để lấy thông tin người dùng
    const userProfile = await userService.getUserProfile(userId);

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Trả về thông tin người dùng
    return res.json({
      user: userProfile,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error while fetching user profile" });
  }
};

// GET Showtime
export const getAllShowtime = async (req, res, next) => {
  try {
    const data = await getAllShowtimes();
    res.status(200).json({
      message: "Lấy danh sách lịch chiếu thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// GET Showtime follow date
export const getShowtimeByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Thiếu ngày chiếu (date)" });
    }

    const data = await getShowtimesByDate(date);
    res.status(200).json({
      message: `Lịch chiếu ngày ${date}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};
