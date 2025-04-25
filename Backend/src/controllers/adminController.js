import * as movieService from "../services/movieService.js";
export const getAllUsers = (req, res) => {
  res.status(200).json({ message: "Admin can view all users" });
};

export const getUserProfile = (req, res) => {
  res.status(200).json({ message: "User can view their profile" });
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