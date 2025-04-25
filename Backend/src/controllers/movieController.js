import * as movieService from "../services/movieService.js";

// Lấy phim đang chiếu hoặc sắp chiếu
export const getAvailableMovies = async (req, res) => {
  try {
    const movies = await movieService.getAvailableMovies();
    return res.status(200).json({ movies });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi lấy phim đang chiếu" });
  }
};
