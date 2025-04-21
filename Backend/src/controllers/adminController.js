import { createShowtime, updateShowtime, deleteShowtime } from "../services/showtimeService.js";

export const getAllUsers = (req, res) => {
  res.status(200).json({ message: "Admin can view all users" });
};

export const getUserProfile = (req, res) => {
  res.status(200).json({ message: "User can view their profile" });
};

// API Add lịch chiếu
export const createShowtimeController = async (req, res, next) => {
  try {
    const result = await createShowtime(req.body);
    res.status(201).json({
      message: "Tạo lịch chiếu thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// API Update lịch chiếu
export const updateShowtimeController = async (req, res, next) => {
  try {
    const result = await updateShowtime(req.params.id, req.body);
    res.status(200).json({
      message: "Cập nhật lịch chiếu thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// API Delete lịch chiếu
export const deleteShowtimeController = async (req, res, next) => {
  try {
    await deleteShowtime(req.params.id);
    res.status(200).json({
      message: "Xoá lịch chiếu thành công",
    });
  } catch (error) {
    next(error);
  }
};
