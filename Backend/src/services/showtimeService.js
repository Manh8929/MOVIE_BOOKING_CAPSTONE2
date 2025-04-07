const { Op } = require("sequelize");
const db = require("../models"); // import tất cả models

const getAllShowtimes = async () => {
  try {
    const showtimes = await db.Showtime.findAll({
      include: [db.Movie, db.Screen], // kết nối với Movie và Screen
    });
    return showtimes;
  } catch (err) {
    console.error("Lỗi lấy showtime:", err);
    throw err; // ném lỗi cho controller xử lý
  }
};

// lấy showtime theo ngày
const getShowtimesByDate = async (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  try {
    const showtimes = await db.Showtime.findAll({
      where: {
        show_time: {
          [Op.between]: [start, end],
        },
      },
      include: [db.Movie, db.Screen],
      order: [["show_time", "ASC"]],
    });
    return showtimes;
  } catch (err) {
    console.error("Lỗi lọc showtime theo ngày:", err);
    throw err;
  }
};

module.exports = {
  getAllShowtimes,
  getShowtimesByDate,
};