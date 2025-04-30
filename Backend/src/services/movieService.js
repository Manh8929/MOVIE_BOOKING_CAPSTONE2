import db from "../models";

export const getAvailableMovies = async () => {
  return await db.Movie.findAll({
    where: {
      status: ["now_showing", "upcoming"],
    },
  });
};
