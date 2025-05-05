import db from "../models"; 

export const getAllMovies = async () => {
  return await db.Movie.findAll();
};

export const createMovie = async (data) => {
  return await db.Movie.create(data);
};

export const updateMovie = async (id, data) => {
  const movie = await db.Movie.findByPk(id);
  if (!movie) return null;
  await movie.update(data);
  return movie;
};

export const deleteMovie = async (id) => {
  const movie = await db.Movie.findByPk(id);
  if (!movie) return null;
  await movie.destroy();
  return true;
};

// threaters
export const getAllTheaters = async () => {
  return await db.Theater.findAll();
};

export const createTheater = async (data) => {
  return await db.Theater.create(data);
};

export const updateTheater = async (id, data) => {
  const theater = await db.Theater.findByPk(id);
  if (!theater) return null;
  await theater.update(data);
  return theater;
};

export const deleteTheater = async (id) => {
  const theater = await db.Theater.findByPk(id);
  if (!theater) return null;
  await theater.destroy();
  return true;
};