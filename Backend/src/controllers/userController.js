import userService from "../services/userService.js";
import db from "../models";

exports.getUserProfile = async (req, res) => {
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
