  import { createShowtime, updateShowtime, deleteShowtime } from "../services/showtimeService.js";
import { badRequest } from "../middlewares/handle_error";
import { deleteUserService, getAllUsersService, updateUserService } from "../services/adminService.js";

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
export const createNews = async (req, res) => {
  const { movie_id, title, content, image_url } = req.body;
  try {
    const newNews = await userService.createNews({ movie_id, title, content, image_url });
    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ message: 'Error creating news' });
  }
};

// Update news by ID
export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url } = req.body;
  try {
    const updatedNews = await userService.updateNews(id, { title, content, image_url });
    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Error updating news' });
  }
};


// Del news by ID
export const deleteNews = async (req, res) => { 
  const { id } = req.params;
  try {
    const deletedNews = await userService.deleteNews(id);
    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ message: 'Error deleting news' });
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
    const movie = await movieService.createMovie(req.body);
    return res.status(201).json({ message: "Thêm phim thành công", movie });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi thêm phim" });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const updated = await movieService.updateMovie(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy phim" });
    }
    return res.status(200).json({ message: "Cập nhật phim thành công", movie: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi cập nhật phim" });
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

