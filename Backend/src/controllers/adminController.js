import { createShowtime, updateShowtime, deleteShowtime, getAllShowtimes } from "../services/showtimeService.js";
import { badRequest } from "../middlewares/handle_error";
import { deleteUserService, getAllUsersService, updateUserService } from "../services/adminService.js";
import * as movieService from "../services/adminService.js";
import * as theaterService from "../services/adminService.js";
import * as userService from "../services/userService.js";
import * as screenService from "../services/adminService.js";
import * as adminService from "../services/adminService.js";

//api User
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = Number(req.user.user_id);

    // Ngăn người dùng tự xóa chính mình
    if (Number(id) === currentUserId) {
      return res.status(400).json({ message: "Không thể xóa chính bạn!" });
    }

    const result = await deleteUserService(id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateUserService(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};


// GET Showtime
export const getAllShowtime = async (req, res, next) => {
  try {
    const data = await getAllShowtimes();
    res.status(200).json({
      message: "Lấy danh sách lịch chiếu thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// API Add lịch chiếu
export const createShowtimeController = async (req, res, next) => {
  try {
    const result = await createShowtime(req.body);
    res.status(201).json({
      message: "Tạo lịch chiếu thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// API Update lịch chiếu
export const updateShowtimeController = async (req, res, next) => {
  try {
    const result = await updateShowtime(req.params.id, req.body);
    res.status(200).json({
      message: "Cập nhật lịch chiếu thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// API Delete lịch chiếu
export const deleteShowtimeController = async (req, res, next) => {
  try {
    await deleteShowtime(req.params.id);
    res.status(200).json({
      message: "Xoá lịch chiếu thành công",
    });
  } catch (error) {
    next(error);
  }
};

//News
// Add news
// exports.createNews = async (req, res) => {
//   const { movie_id, title, content, image_url, category } = req.body;
//   try {
// <<<<<<< Updated upstream
//     const newNews = await userService.createNews({
//       movie_id,
//       title,
//       content,
//       image_url,
//     });
//     res.status(201).json(newNews);
//   } catch (error) {
//     console.error("Error creating news:", error);
//     res.status(500).json({ message: "Error creating news" });
// =======
//     if (!category) {
//       return res.status(400).json({ message: "Category is required" });
//     }

//     // Gọi service để tạo tin tức
//     const newNews = await userService.createNews({ movie_id, title, content, image_url, category });
//     res.status(201).json(newNews);
//   } catch (error) {
//     console.error('Error creating news:', error);
//     res.status(500).json({ message: 'Error creating news: ' + error.message });
// >>>>>>> Stashed changes
//   }
// };
exports.createNews = async (req, res) => {
  const { movie_id, title, content, image_url, category } = req.body;
  try {
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Gọi service để tạo tin tức
    const newNews = await userService.createNews({
      movie_id,
      title,
      content,
      image_url,
      category,
    });

    res.status(201).json(newNews);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ message: "Error creating news: " + error.message });
  }
};

// Update news by ID
export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url } = req.body;
  try {
    const updatedNews = await userService.updateNews(id, {
      title,
      content,
      image_url,
    });
    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ message: "Error updating news" });
  }
};

// Del news by ID
export const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNews = await userService.deleteNews(id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ message: "Error deleting news" });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    return res.status(200).json({ movies });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi lấy tất cả phim" });
  }
};

export const createMovie = async (req, res) => {
  try {
    const data = req.body;

    data.duration = parseInt(data.duration);
    data.rating = parseFloat(data.rating);

    if (req.files?.poster_url?.[0]) {
      data.poster_url = `${process.env.SERVER_URL}/uploads/admin/${req.files.poster_url[0].filename}`;
    }
    if (req.files?.banner_url?.[0]) {
      data.banner_url = `${process.env.SERVER_URL}/uploads/admin/${req.files.banner_url[0].filename}`;
    }
    if (req.files?.avatar_url?.[0]) {
      data.avatar_url = `${process.env.SERVER_URL}/uploads/admin/${req.files.avatar_url[0].filename}`;
    }

    const newMovie = await movieService.createMovie(data);
    res.status(201).json(newMovie);
  } catch (err) {
    console.error("Error when creating movie:", err);
    res.status(500).json({ message: "Lỗi khi tạo phim.", detail: err.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const data = req.body;

    if (data.duration) data.duration = parseInt(data.duration);
    if (data.rating) data.rating = parseFloat(data.rating);

    // Xử lý file ảnh mới nếu có upload
    if (req.files?.poster_url?.[0]) {
      data.poster_url = `${process.env.SERVER_URL}/uploads/admin/${req.files.poster_url[0].filename}`;
    }
    if (req.files?.banner_url?.[0]) {
      data.banner_url = `${process.env.SERVER_URL}/uploads/admin/${req.files.banner_url[0].filename}`;
    }
    if (req.files?.avatar_url?.[0]) {
      data.avatar_url = `${process.env.SERVER_URL}/uploads/admin/${req.files.avatar_url[0].filename}`;
    }

    const updated = await movieService.updateMovie(req.params.id, data);
    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy phim" });
    }

    return res
      .status(200)
      .json({ message: "Cập nhật phim thành công", movie: updated });
  } catch (err) {
    console.error("Error when updating movie:", err);
    return res
      .status(500)
      .json({ message: "Lỗi khi cập nhật phim", detail: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const deleted = await movieService.deleteMovie(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy phim" });
    }
    return res.status(200).json({ message: "Xoá phim thành công" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi xoá phim" });
  }
};

// API Lấy tất cả rạp
export const getAllTheaters = async (req, res) => {
  try {
    const theaters = await theaterService.getAllTheaters();
    res.status(200).json({ theaters });
  } catch (err) {
    console.error("Error fetching theaters:", err);
    res.status(500).json({ message: "Lỗi khi lấy tất cả các rạp" });
  }
};

// API Tạo mới rạp
export const createTheater = async (req, res) => {
  try {
    const { name, location, contact } = req.body;

    if (!name || !location || !contact) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp đầy đủ thông tin" });
    }

    const newTheater = await theaterService.createTheater({
      name,
      location,
      contact,
    });

    res.status(201).json({ message: "Tạo rạp thành công", data: newTheater });
  } catch (err) {
    console.error("Error creating theater:", err);
    res.status(500).json({ message: "Lỗi khi tạo rạp", error: err.message });
  }
};

// API Cập nhật rạp
export const updateTheater = async (req, res) => {
  try {
    const { name, location, total_screens, contact, status } = req.body;

    const updatedTheater = await theaterService.updateTheater(req.params.id, {
      name,
      location,
      total_screens: parseInt(total_screens),
      contact,
      status,
    });

    if (!updatedTheater) {
      return res.status(404).json({ message: "Không tìm thấy rạp" });
    }

    res
      .status(200)
      .json({ message: "Cập nhật rạp thành công", data: updatedTheater });
  } catch (err) {
    console.error("Error updating theater:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật rạp" });
  }
};

// API Xoá rạp
export const deleteTheater = async (req, res) => {
  try {
    const deleted = await theaterService.deleteTheater(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy rạp" });
    }
    res.status(200).json({ message: "Xoá rạp thành công" });
  } catch (err) {
    console.error("Error deleting theater:", err);
    res.status(500).json({ message: "Lỗi khi xoá rạp" });
  }
};

// screens
export const getAllScreens = async (req, res) => {
  try {
    const screens = await screenService.getAllScreens();
    res.status(200).json({ screens });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách phòng chiếu:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const createScreen = async (req, res) => {
  try {
    const data = req.body;
    const newScreen = await screenService.createScreen(data);
    res.status(201).json({ message: "Tạo phòng chiếu thành công", data: newScreen });
  } catch (err) {
    console.error("Lỗi khi tạo phòng chiếu:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateScreen = async (req, res) => {
  try {
    const updated = await screenService.updateScreen(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Không tìm thấy phòng chiếu" });
    res.status(200).json({ message: "Cập nhật phòng chiếu thành công", data: updated });
  } catch (err) {
    console.error("Lỗi khi cập nhật phòng chiếu:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteScreen = async (req, res) => {
  try {
    const deleted = await screenService.deleteScreen(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy phòng chiếu" });
    res.status(200).json({ message: "Xoá phòng chiếu thành công" });
  } catch (err) {
    console.error("Lỗi khi xoá phòng chiếu:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

//----------------ghế---------//
//tạo ghế tự động
export const createSeats = async (req, res) => {
  const { screen_id, showtime_id, total_seats } = req.body;

  if (!screen_id || !showtime_id || !total_seats) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const createdSeats = await adminService.createSeatsService(screen_id, showtime_id, total_seats);

    return res.status(201).json({
      message: `${createdSeats.length} seats created successfully`,
      seats: createdSeats,
    });
  } catch (error) {
    console.error(error);
        if (error.message.includes("Ghế cho phòng chiếu")) {
      return res.status(409).json({ message: error.message }); // Conflict
    }
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

// API lấy tất cả ghế
export const getAllSeatsController = async (req, res) => {
  try {
    const seats = await adminService.getAllSeats();
    res.status(200).json(seats);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// API cập nhật ghế
export const updateSeatController = async (req, res) => {
  try {
    const { id } = req.params;
    const seatData = req.body;

    if (!seatData.seat_number && !seatData.seat_type_id && seatData.is_available === undefined) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const updatedSeat = await adminService.updateSeat(id, seatData);
    res.status(200).json(updatedSeat);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

//xóa ghế

export const deleteSeatController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await adminService.deleteSeat(id);
    if (!deleted) {
      return res.status(404).json({ message: "Seat not found" });
    }

    res.status(200).json({ message: "Seat deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export const getUpcomingShowtimes = async (req, res) => {
  try {
    const data = await adminService.getUpcomingShowtimes();
    res.status(200).json(data);
  } catch (err) {
    console.error("Lỗi khi lấy các suất chiếu sắp tới:", err);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy dữ liệu." });
  }
};


//crud giá
// Lấy danh sách loại ghế
export const getAllSeatTypes = async (req, res) => {
  try {
    const result = await adminService.getAllSeatTypesService();
    res.status(200).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// Tạo loại ghế
export const createSeatType = async (req, res) => {
  try {
    const result = await adminService.createSeatTypeService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// Cập nhật loại ghế
export const updateSeatType = async (req, res) => {
  try {
    const result = await adminService.updateSeatTypeService(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// Xoá loại ghế
export const deleteSeatType = async (req, res) => {
  try {
    const result = await adminService.deleteSeatTypeService(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

