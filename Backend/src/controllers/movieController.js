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

// Lấy chi tiết phim theo ID
export const getMovieDetail = async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await movieService.getMovieDetail(movieId);
    if (movie) {
      return res.status(200).json({ movie });
    } else {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi lấy chi tiết phim" });
  }
};