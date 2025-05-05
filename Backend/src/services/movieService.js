import db from "../models";

export const getAvailableMovies = async () => {
  return await db.Movie.findAll({
    where: {
      status: ["now_showing", "upcoming",],
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