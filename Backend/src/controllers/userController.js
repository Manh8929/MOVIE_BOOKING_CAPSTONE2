import { getAllShowtimes } from "../services/showtimeService.js";

export const getUserProfile = (req, res) => {
  return res.send("get User successfully");
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