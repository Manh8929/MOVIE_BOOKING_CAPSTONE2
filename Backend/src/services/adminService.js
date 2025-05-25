import db from "../models";
import { User, Role, Seat, SeatType } from "../models";
const { Op } = require("sequelize");
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
//---------Ghế--------------/

// Tạo ghế tự động
export const createSeatsService = async (
  screen_id,
  showtime_id,
  total_seats
) => {
  const existingSeats = await Seat.findOne({
    where: { screen_id, showtime_id },
  });

  if (existingSeats) {
    throw new Error("Ghế cho phòng chiếu này và suất chiếu này đã được tạo.");
  }
  const seatsPerRow = 10; // Số ghế mỗi hàng
  const seatsToCreate = [];

  for (let i = 0; i < total_seats; i++) {
    const rowIndex = Math.floor(i / seatsPerRow); // Tính chỉ số hàng
    const seatIndex = (i % seatsPerRow) + 1; // Số ghế trong hàng (bắt đầu từ 1)
    const rowLetter = String.fromCharCode(65 + rowIndex); // Chuyển 0 => 'A', 1 => 'B', ...

    const seatNumber = `${rowLetter}${seatIndex}`; // VD: A1, A2, ..., B1, B2,...

    let seat_type_id = 1; // regular

    if (rowLetter >= "A" && rowLetter <= "F") {
      seat_type_id = 1; // regular
    } else if (rowLetter >= "G" && rowLetter <= "K") {
      seat_type_id = 2; // vip
    } else {
      seat_type_id = 3; // couple
    }

    seatsToCreate.push({
      seat_number: seatNumber,
      screen_id,
      showtime_id,
      seat_type_id,
      is_available: true,
    });
  }

  const createdSeats = await Seat.bulkCreate(seatsToCreate);
  return createdSeats;
};

//getAllSeats
export const getAllSeats = async () => {
  return await Seat.findAll({
    include: [
      {
        model: db.SeatType,
        as: "type", // đúng theo alias bạn đặt trong association
        attributes: ["seat_type_id", "name", "price"], // chọn cột cần thiết
      },
    ],
  });
};

//update seat
export const updateSeat = async (id, seatData) => {
  const seat = await Seat.findByPk(id);
  if (!seat) {
    throw new Error("Seat not found");
  }

  if (seatData.seat_number) seat.seat_number = seatData.seat_number;
  if (seatData.seat_type_id) seat.seat_type_id = seatData.seat_type_id;
  if (seatData.is_available !== undefined)
    seat.is_available = seatData.is_available;

  await seat.save();

  // Optional: trả về kèm thông tin loại ghế
  const seatWithType = await Seat.findByPk(id, {
    include: [
      {
        model: SeatType,
        as: "type",
        attributes: ["seat_type_id", "name", "price"],
      },
    ],
  });

  return seatWithType;
};

// xóa ghế

export const deleteSeat = async (id) => {
  const seat = await Seat.findByPk(id);
  if (!seat) return false;

  await seat.destroy();
  return true;
};

// get những showtime chưa hết hạn
export const getUpcomingShowtimes = async () => {
  try {
    const now = new Date();

    const showtimes = await db.Showtime.findAll({
      where: {
        show_time: {
          [Op.gt]: now,
        },
        status: {
          [Op.not]: "canceled", // tránh show các suất đã huỷ nếu muốn
        },
      },
      include: [db.Movie, db.Screen],
      order: [["show_time", "ASC"]],
    });

    return showtimes;
  } catch (err) {
    console.error("Lỗi lấy suất chiếu chưa hết hạn:", err);
    throw err;
  }
};

//crud giá

// Lấy tất cả loại ghế
export const getAllSeatTypesService = async () => {
  const seatTypes = await SeatType.findAll({
    order: [["price", "ASC"]],
  });

  return {
    message: "Fetched all seat types successfully",
    seatTypes,
  };
};

// Tạo loại ghế mới
export const createSeatTypeService = async ({ name, price }) => {
  if (!name || price == null) {
    const error = new Error("Name and price are required");
    error.statusCode = 400;
    throw error;
  }

  const [seatType, created] = await SeatType.findOrCreate({
    where: { name },
    defaults: { price },
  });

  if (!created) {
    const error = new Error("Seat type already exists");
    error.statusCode = 400;
    throw error;
  }

  return {
    message: "Created seat type successfully",
    seatType,
  };
};

// Cập nhật loại ghế
export const updateSeatTypeService = async (id, data) => {
  const seatType = await SeatType.findByPk(id);
  if (!seatType) {
    const error = new Error("Seat type not found");
    error.statusCode = 404;
    throw error;
  }

  seatType.name = data.name || seatType.name;
  seatType.price = data.price ?? seatType.price;

  await seatType.save();

  return {
    message: "Updated seat type successfully",
    seatType,
  };
};

// Xoá loại ghế
export const deleteSeatTypeService = async (id) => {
  const seatType = await SeatType.findByPk(id);
  if (!seatType) {
    const error = new Error("Seat type not found");
    error.statusCode = 404;
    throw error;
  }

  await seatType.destroy();

  return {
    message: "Deleted seat type successfully",
  };
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

// Booking
export const getAllBookings = async () => {
  const bookings = await db.Booking.findAll({
    include: [
      {
        model: db.User,
        attributes: ["user_id", "full_name", "email"],
      },
      {
        model: db.Showtime,
      },
    ],
    order: [["booking_time", "DESC"]],
  });

  return bookings;
};

// payment
export const getAllPayments = async () => {
  const payments = await db.Payment.findAll({
    include: [
      {
        model: db.Booking,
        attributes: ["qr_code", "booking_time"],
        include: [
          {
            model: db.Showtime,
            attributes: ["show_time"],
            include: [
              {
                model: db.Screen,
                attributes: ["screen_name"],
              },
            ],
          },
          {
            model: db.BookingSeat,
            include: [
              {
                model: db.Seat,
                attributes: ["seat_number"],
              },
            ],
          },
        ],
      },
      {
        model: db.User,
        attributes: ["full_name", "email", "phone_number"],
      },
    ],
    order: [["payment_time", "DESC"]],
  });

  return payments;
};