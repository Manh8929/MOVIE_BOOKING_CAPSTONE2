const { Op } = require("sequelize");
const db = require("../models"); // import tất cả models

export const getAllShowtimes = async () => {
  try {
    const showtimes = await db.Showtime.findAll({
      include: [db.Movie, {
          model: db.Screen, 
          include: [db.Theater]
        }],
    });
    return showtimes;
  } catch (err) {
    console.error("Lỗi lấy showtime:", err);
    throw err;
  }
};

// lấy showtime theo ngày
export const getShowtimesByDate = async (date) => {
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

// Thêm lịch chiếu
export const createShowtime = async (body) => {
  try {
    // Kiểm tra nếu không có status thì báo lỗi
    if (!body.status) {
      throw new Error("Thiếu trường status");
    }

    const newShowtime = await db.Showtime.create({
      movie_id: body.movieId,
      screen_id: body.screenId,
      show_time: new Date(body.show_time),
      ticket_price: body.ticket_price,
      status: body.status|| "scheduled",
    });

    return newShowtime;
  } catch (error) {
    console.error("Lỗi tạo lịch chiếu:", error);
    throw error;
  }
};

// Cập nhật lịch chiếu
export const updateShowtime = async (id, body) => {
  try {
    const showtime = await db.Showtime.findByPk(id);
    if (!showtime) {
      throw new Error("Không tìm thấy lịch chiếu");
    }

    showtime.movie_id = body.movieId || showtime.movie_id;
    showtime.screen_id = body.screenId || showtime.screen_id;
    showtime.show_time = body.show_time ? new Date(body.show_time) : showtime.show_time;
    showtime.ticket_price = body.ticket_price || showtime.ticket_price;
    showtime.status = body.status || showtime.status;

    await showtime.save();
    return showtime;
  } catch (error) {
    console.error("Lỗi cập nhật lịch chiếu:", error);
    throw error;
  }
};

// Xoá lịch chiếu
export const deleteShowtime = async (id) => {
  try {
    const showtime = await db.Showtime.findByPk(id);
    if (!showtime) {
      throw new Error("Không tìm thấy lịch chiếu");
    }

    await showtime.destroy();
    return true;
  } catch (error) {
    console.error("Lỗi xoá lịch chiếu:", error);
    throw error;
  }
};

