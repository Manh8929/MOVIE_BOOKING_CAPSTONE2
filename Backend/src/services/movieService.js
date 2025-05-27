import { Op } from "sequelize";
import db from "../models";
const moment = require("moment-timezone");
export const getAvailableMovies = async () => {
  return await db.Movie.findAll({
    where: {
      status: ["now_showing", "upcoming"],
    },
  });
};

// Lấy chi tiết phim theo ID
export const getMovieDetail = async (movieId) => {
  return await db.Movie.findOne({
    where: {
      movie_id: movieId,
    },
  });
};

// Lấy danh sách phim có suất chiếu trong ngày


export const getMoviesByDate = async (date) => {
  const startDate = moment.tz(date, "YYYY-MM-DD", "Asia/Ho_Chi_Minh").startOf("day").toDate();
  const endDate = moment.tz(date, "YYYY-MM-DD", "Asia/Ho_Chi_Minh").endOf("day").toDate();
  const now = moment().tz("Asia/Ho_Chi_Minh");

  const start = now.isSame(moment.tz(date, "YYYY-MM-DD", "Asia/Ho_Chi_Minh"), "day") ? now.toDate() : startDate;

  const showtimes = await db.Showtime.findAll({
    where: {
      show_time: {
        [Op.between]: [start, endDate],
      },
    },
    include: [
      {
        model: db.Movie,
        attributes: ["movie_id", "title", "poster_url"],
      },
      {
        model: db.Screen,
        attributes: ["screen_name"],
        include: [
          {
            model: db.Theater,
            attributes: ["name"],
          },
        ],
      },
    ],
    order: [["show_time", "ASC"]],
  });

  const grouped = {};

  showtimes.forEach((item) => {
    const movieId = item.Movie.movie_id;
    if (!grouped[movieId]) {
      grouped[movieId] = {
        movie_id: movieId,
        title: item.Movie.title,
        poster: item.Movie.poster_url,
        showtimes: [],
      };
    }
    grouped[movieId].showtimes.push({
      showtime_id: item.showtime_id,
      show_time: item.show_time, // giữ nguyên để FE format
      timeStr: item.show_time.toTimeString().slice(0, 5), // thêm nếu cần
      room: item.Screen?.screen_name,
      theater: item.Screen?.Theater?.name || "Rạp không xác định",
    });
  });

  return Object.values(grouped);
};


// Lấy chi tiết suất chiếu
export const getShowtimeDetail = async (showtimeId) => {
  return await db.Showtime.findOne({
    where: { showtime_id: showtimeId },
    include: [
      {
        model: db.Movie,
        attributes: ["movie_id", "title", "poster_url", "duration"],
      },
      {
        model: db.Screen,
        attributes: ["screen_name", "total_seats", "screen_type"],
      },
    ],
  });
};
