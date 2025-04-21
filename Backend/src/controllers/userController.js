import userService from "../services/userService.js";
import { getAllShowtimes, getShowtimesByDate } from "../services/showtimeService.js";
import { updateUserProfileSchema } from "../helpers/joi_schema.js";

// GET user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const userProfile = await userService.getUserProfile(userId);

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

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

// PUT update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { error, value } = updateUserProfileSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: messages });
    }

    const updatedUser = await userService.updateUserProfile(userId, value);

    return res.json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while updating profile" });
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
