const { Op } = require("sequelize");
const db = require("../models"); // import tất cả models
import moment from "moment-timezone";

export const getAllShowtimes = async () => {
  try {
    const showtimes = await db.Showtime.findAll({
      include: [
        db.Movie,
        {
          model: db.Screen,
          include: [db.Theater],
        },
      ],
    });
    return showtimes;
  } catch (err) {
    console.error("Lỗi lấy showtime:", err);
    throw err;
  }
};

// lấy showtime theo ngày
export const getShowtimesByDate = async (date) => {
  const now = moment().tz("Asia/Ho_Chi_Minh");
  const selectedDate = moment.tz(date, "Asia/Ho_Chi_Minh");

  let start, end;

  if (now.isSame(selectedDate, "day")) {
    start = now.startOf("minute").toDate();
  } else {
    // Ngày khác => lấy từ 00:00
    start = selectedDate.startOf("day").toDate();
  }

  end = selectedDate.endOf("day").toDate();

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
    const { movieId, screenId, show_time, ticket_price, status } = body;

    if (!movieId || !screenId || !show_time || !ticket_price || !status) {
      throw new Error("Thiếu một hoặc nhiều trường bắt buộc");
    }

    if (!moment(show_time, moment.ISO_8601, true).isValid()) {
      throw new Error("Định dạng show_time không hợp lệ");
    }

    const newStart = moment.tz(show_time, "Asia/Ho_Chi_Minh");
    const now = moment.tz("Asia/Ho_Chi_Minh");
    if (newStart.isBefore(now)) {
      throw new Error("Không thể tạo lịch chiếu trong quá khứ");
    }
    // Lấy thông tin phim để biết thời lượng
    const movie = await db.Movie.findByPk(movieId);
    if (!movie) throw new Error("Không tìm thấy phim");

    const newEnd = moment(newStart).add(movie.duration, "minutes");

    // Lấy tất cả lịch chiếu khác cùng screen
    const existingShowtimes = await db.Showtime.findAll({
      where: {
        screen_id: screenId,
      },
      include: [
        {
          model: db.Movie,
          attributes: ["duration"],
        },
      ],
    });

    for (const show of existingShowtimes) {
      const existingStart = moment(show.show_time);
      const existingEnd = moment(existingStart).add(
        show.Movie.duration,
        "minutes"
      );

      const isOverlapping =
        existingStart.isBefore(newEnd) && existingEnd.isAfter(newStart);

      if (isOverlapping) {
        throw new Error("Lịch chiếu bị trùng thời gian với lịch khác");
      }
    }

    // Tạo lịch chiếu mới nếu hợp lệ
    const newShowtime = await db.Showtime.create({
      movie_id: movieId,
      screen_id: screenId,
      show_time: newStart.toDate(),
      ticket_price,
      status,
    });

    return newShowtime;
  } catch (error) {
    console.error("Lỗi tạo lịch chiếu:", { body, error });
    throw error;
  }
};

// Cập nhật lịch chiếu
export const updateShowtime = async (id, body) => {
  try {
    const showtime = await db.Showtime.findByPk(id, {
      include: [
        {
          model: db.Movie,
          attributes: ["duration"],
        },
      ],
    });

    if (!showtime) {
      throw new Error("Không tìm thấy lịch chiếu");
    }

    const movieId = body.movieId || showtime.movie_id;
    const screenId = body.screenId || showtime.screen_id;
    const ticketPrice = body.ticket_price || showtime.ticket_price;
    const status = body.status || showtime.status;

    const newStart = body.show_time
      ? moment.tz(body.show_time, "Asia/Ho_Chi_Minh")
      : moment(showtime.show_time);
    if (newStart.isBefore(moment.tz("Asia/Ho_Chi_Minh"))) {
      throw new Error("Không thể cập nhật lịch chiếu về thời gian quá khứ");
    }
    if (
      body.show_time &&
      !moment(body.show_time, moment.ISO_8601, true).isValid()
    ) {
      throw new Error("Định dạng show_time không hợp lệ");
    }
    const movie = await db.Movie.findByPk(movieId);
    if (!movie) throw new Error("Không tìm thấy phim");

    const newEnd = moment(newStart).add(movie.duration, "minutes");
    const existingShowtimes = await db.Showtime.findAll({
      where: {
        screen_id: screenId,
        showtime_id: { [Op.ne]: id },
      },
      include: [
        {
          model: db.Movie,
          attributes: ["duration"],
        },
      ],
    });

    for (const show of existingShowtimes) {
      const existingStart = moment(show.show_time);
      const existingEnd = moment(existingStart).add(
        show.Movie.duration,
        "minutes"
      );

      const isOverlapping =
        existingStart.isBefore(newEnd) && existingEnd.isAfter(newStart);

      if (isOverlapping) {
        throw new Error("Lịch chiếu bị trùng thời gian với lịch khác");
      }
    }

    showtime.movie_id = movieId;
    showtime.screen_id = screenId;
    showtime.show_time = newStart.toDate();
    showtime.ticket_price = ticketPrice;
    showtime.status = status;

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

//xóa all
export const deleteSelectedShowtimes = async (ids) => {
  try {
    // Xoá ghế của các suất chiếu tương ứng
    await db.Seat.destroy({
      where: {
        showtime_id: ids,
      },
    });

    // Xoá suất chiếu theo IDs
    await db.Showtime.destroy({
      where: {
        showtime_id: ids,
      },
    });

    return { message: "Đã xoá các suất chiếu được chọn thành công." };
  } catch (error) {
    console.error("Lỗi khi xoá các suất chiếu được chọn:", error);
    throw error;
  }
};

