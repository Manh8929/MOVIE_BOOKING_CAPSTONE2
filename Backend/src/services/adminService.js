import db from "../models"; 
import { User, Role, Seat } from "../models";

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
  return await db.Theater.findAll({
    include: [
      {
        model: db.Screen,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [
          db.Sequelize.fn("COUNT", db.Sequelize.col("Screens.screen_id")),
          "total_screens",
        ],
      ],
    },
    group: ["Theater.theater_id"],
  });
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

// screen
export const getAllScreens = async () => {
  return await db.Screen.findAll({
    include: [{ model: db.Theater, attributes: ["name", "location"] }],
    order: [["createdAt", "DESC"]],
  });
};

export const createScreen = async (data) => {
  return await db.Screen.create(data);
};

export const updateScreen = async (id, data) => {
  const screen = await db.Screen.findByPk(id);
  if (!screen) return null;
  await screen.update(data);
  return screen;
};

export const deleteScreen = async (id) => {
  const screen = await db.Screen.findByPk(id);
  if (!screen) return null;
  await screen.destroy();
  return true;
};

//---------Ghế--------------/
//Tạo ghế
// Tạo ghế tự động
export const createSeatsService = async (screen_id, showtime_id, total_seats) => {
  const seatsToCreate = [];

  // Tạo ghế tự động
  for (let i = 1; i <= total_seats; i++) {
    const seatNumber = `Seat-${i}`; // Tạo tên ghế tự động
    seatsToCreate.push({
      seat_number: seatNumber,
      screen_id,
      showtime_id,
      seat_type: 'regular', // Có thể thay đổi theo nhu cầu
      price: 100.00, // Giá ghế mặc định, có thể thay đổi
      is_available: true, // Ghế mặc định là có sẵn
    });
  }

  // Tạo ghế trong cơ sở dữ liệu
  const createdSeats = await Seat.bulkCreate(seatsToCreate);
  return createdSeats;
};
