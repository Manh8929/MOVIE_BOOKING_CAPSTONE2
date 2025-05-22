import * as  userService from "../services/userService.js";
import { getAllShowtimes, getShowtimesByDate } from "../services/showtimeService.js";
import { updateUserProfileSchema } from "../helpers/joi_schema.js";


// GET user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const userProfile = await userService.getUserProfile(userId);

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: userProfile,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error while fetching user profile" });
  }
};

// PUT update user profile
export const updateUserProfile = async (req, res) => {
  try {
    console.log('req.file in updateUserProfile:', req.file);
    const userId = req.user.user_id;
    const { error, value } = updateUserProfileSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: messages });
    }
    const updateData = { ...value };
    console.log('Uploaded file:', req.file);
    if (req.file) {
      console.log('Uploaded file:', req.file);
      const avatarUrl = `${process.env.SERVER_URL}/uploads/users/${req.file.filename}`;
      updateData.avatar = avatarUrl; // Cập nhật URL avatar
    }

    const updatedUser = await userService.updateUserProfile(userId, updateData);

    return res.json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while updating profile" });
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

// GET Showtime follow date
export const getShowtimeByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Thiếu ngày chiếu (date)" });
    }

    const data = await getShowtimesByDate(date);
    res.status(200).json({
      message: `Lịch chiếu ngày ${date}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

//News
// GET all news
export const getAllNews = async (req, res) => {
  try {
    const news = await userService.getAllNews();
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);  // Log lỗi
    res.status(500).json({ message: 'Error fetching news' });
  }
};

// GET a news
export const getNewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const newsItem = await userService.getNewsById(id);
    if (!newsItem) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(newsItem);
  } catch (error) {
    console.error('Error fetching news by id:', error);
    res.status(500).json({ message: 'Error fetching news by ID' });
  }
};


// theaters
export const getAllTheaters = async (req, res) => {
  try {
    const theaters = await userService.getAllTheaters();
    res.status(200).json({ theaters });
  } catch (err) {
    console.error("Error fetching theaters:", err);
    res.status(500).json({ message: "Lỗi khi lấy tất cả các rạp" });
  }
};

// màn hình
export const getAllScreens = async (req, res) => {
  try {
    const screens = await userService.getAllScreens();
    res.status(200).json({ screens });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách phòng chiếu:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// review
export const getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await userService.getReviewsByMovieId(movieId);
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi khi lấy đánh giá", error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const reviewData = {
      user_id: req.body.user_id || (req.user && req.user.user_id),
      movie_id: req.body.movie_id,
      rating: req.body.rating,
      comment: req.body.comment,
      sentiment: req.body.sentiment,
      review_time: new Date(),
    };

    const review = await userService.createReview(reviewData);

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Error creating review", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user.user_id; 

    const deleted = await userService.deleteReviewByUser(reviewId, userId);

    if (!deleted) {
      return res.status(403).json({ message: "Bạn không có quyền xoá review này." });
    }

    return res.status(200).json({ message: "Xoá review thành công." });
  } catch (error) {
    console.error("Lỗi khi xoá review:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

//showtimeBydate và theater
export const getShowtimesByTheaterAndDate = async (req, res) => {
  try {
    const { theaterId, movieId, date } = req.query;

    if (!theaterId || !movieId || !date) {
      return res.status(400).json({ message: "Missing theater_id, movie_id or date" });
    }

    const showtimes = await userService.getShowtimesByTheaterAndDate(theaterId, movieId, date);

    return res.json({ showtimes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching showtimes" });
  }
};


//lấy rạp theo movie

// GET /api/theaters-by-movie?movieId=1
export const getTheatersByMovie = async (req, res) => {
  try {
    const { movieId } = req.query;

    if (!movieId) {
      return res.status(400).json({ message: "Missing movieId in query params" });
    }

    const theaters = await userService.getTheatersByMovie(movieId);

    return res.json({ theaters });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error while fetching theaters by movie",
    });
  }
};

// GET /api/seats/:showtimeId
export const getSeatsByShowtime = async (req, res) => {
  try {
    const { showtimeId } = req.params;

    const seats = await userService.getSeatsByShowtime(showtimeId);

    return res.json({ seats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while fetching seats" });
  }
};
// Lấy danh sách loại ghế
export const getAllSeatTypes = async (req, res) => {
  try {
    const result = await userService.getAllSeatTypesService();
    res.status(200).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

