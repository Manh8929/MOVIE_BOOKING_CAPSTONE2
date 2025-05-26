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

// Lấy danh sách phim theo ngày (kèm suất chiếu)
export const getMoviesByDate = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Thiếu ngày chiếu (query param 'date')" });
  }

  try {
    const movies = await movieService.getMoviesByDate(date);
    return res.status(200).json({ movies });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi lấy lịch chiếu" });
  }
};

// Lấy chi tiết 1 suất chiếu
export const getShowtimeDetail = async (req, res) => {
  const showtimeId = req.params.id;

  try {
    const showtime = await movieService.getShowtimeDetail(showtimeId);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime không tồn tại" });
    }
    return res.status(200).json({ showtime });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi khi lấy chi tiết suất chiếu" });
  }
};