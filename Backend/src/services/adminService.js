import db from "../models"; 
import { User, Role } from "../models";

//user 
export const getAllUsersService = async () => {
  const users = await User.findAll({
    include: {
      model: Role,
      attributes: ["role_name", "description"],
    },
    attributes: {
      exclude: ["password"], // không trả password
    },
    order: [["createdAt", "DESC"]],
  });

  return {
    message: "Fetched all users successfully",
    users,
  };
};

export const deleteUserService = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw { message: "User not found", statusCode: 404 };
  }

  await user.destroy();

  return {
    message: "User deleted successfully",
    user_id: id,
  };
};

export const updateUserService = async (id, newData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw { message: "User not found", statusCode: 404 };
  }

  // Không cho phép cập nhật email
  if ("email" in newData) {
    delete newData.email;
  }

  await user.update(newData);

  return {
    message: "User updated successfully",
    user,
  };
};


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



