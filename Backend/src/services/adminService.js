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

// Tạo ghế tự động
export const createSeatsService = async (screen_id, showtime_id, total_seats) => {
  const seatsPerRow = 10; // Số ghế mỗi hàng
  const seatsToCreate = [];

  for (let i = 0; i < total_seats; i++) {
    const rowIndex = Math.floor(i / seatsPerRow); // Tính chỉ số hàng
    const seatIndex = (i % seatsPerRow) + 1; // Số ghế trong hàng (bắt đầu từ 1)
    const rowLetter = String.fromCharCode(65 + rowIndex); // Chuyển 0 => 'A', 1 => 'B', ...

    const seatNumber = `${rowLetter}${seatIndex}`; // VD: A1, A2, ..., B1, B2,...

    let seatType = 'regular'; // Mặc định là ghế thường
    let price = 100.00; // Giá ghế thường

    // Phân loại ghế
    if (rowLetter >= 'A' && rowLetter <= 'F') {
      seatType = 'regular'; // Ghế thường
      price = 100.00;
    } else if (rowLetter >= 'G' && rowLetter <= 'K') {
      seatType = 'vip'; // Ghế VIP
      price = 200.00; // Giá ghế VIP
    } else {
      seatType = 'couple'; // Ghế đôi
      price = 300.00; // Giá ghế đôi
    }

    seatsToCreate.push({
      seat_number: seatNumber,
      screen_id,
      showtime_id,
      seat_type: seatType,
      price: price,
      is_available: true,
    });
  }

  const createdSeats = await Seat.bulkCreate(seatsToCreate);
  return createdSeats;
};


//getAllSeats
export const getAllSeats = async () => {
  return await Seat.findAll();  
};


//update
export const updateSeat = async (id, seatData) => {
  const seat = await Seat.findByPk(id);
  if (!seat) {
    throw new Error("Seat not found");
  }

  if (seatData.seat_number) seat.seat_number = seatData.seat_number;
  if (seatData.seat_type) seat.seat_type = seatData.seat_type;
  if (seatData.price) seat.price = seatData.price;

  await seat.save(); 
  return seat;
};

// khuyến mãi
export const createPromotion = async (data) => {
  return await db.Promotion.create(data);
};

export const updatePromotion = async (id, data) => {
  const promotion = await db.Promotion.findByPk(id);
  if (!promotion) return null;
  await promotion.update(data);
  return promotion;
};

export const deletePromotion = async (id) => {
  const result = await db.Promotion.destroy({ where: { promo_id: id } });
  return result > 0;
};

export const getAllPromotions = async () => {
  return await db.Promotion.findAll();
};