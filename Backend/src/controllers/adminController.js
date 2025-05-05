import {
  createShowtime,
  updateShowtime,
  deleteShowtime,
} from "../services/showtimeService.js";
import userService from "../services/userService";
import * as movieService from "../services/adminService.js";
export const getAllUsers = (req, res) => {
  res.status(200).json({ message: "Admin can view all users" });
};

export const getUserProfile = (req, res) => {
  res.status(200).json({ message: "User can view their profile" });
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
    const newNews = await userService.createNews({
      movie_id,
      title,
      content,
      image_url,
    });
    res.status(201).json(newNews);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ message: "Error creating news" });
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
    const theaters = await movieService.getAllTheaters();
    res.status(200).json({ theaters });
  } catch (err) {
    console.error("Error fetching theaters:", err);
    res.status(500).json({ message: "Lỗi khi lấy tất cả các rạp" });
  }
};

// API Tạo mới rạp
export const createTheater = async (req, res) => {
  try {
    const { name, location, total_screens, contact } = req.body;

    if (!name || !location || !total_screens || !contact) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp đầy đủ thông tin" });
    }

    const newTheater = await movieService.createTheater({
      name,
      location,
      total_screens: parseInt(total_screens),
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
    const { name, location, total_screens, contact } = req.body;

    const updatedTheater = await movieService.updateTheater(req.params.id, {
      name,
      location,
      total_screens: parseInt(total_screens),
      contact,
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
    const deleted = await movieService.deleteTheater(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy rạp" });
    }
    res.status(200).json({ message: "Xoá rạp thành công" });
  } catch (err) {
    console.error("Error deleting theater:", err);
    res.status(500).json({ message: "Lỗi khi xoá rạp" });
  }
};
