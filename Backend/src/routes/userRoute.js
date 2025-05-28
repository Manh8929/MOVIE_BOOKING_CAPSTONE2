// routes/userRoute.js
import express from "express";
import {
  getUserProfile,
  getAllShowtime,
  getShowtimeByDate,
  updateUserProfile,
  getAllNews,
  getNewsById,
  getAllTheaters,
  getAllScreens,
  getReviews,
  createReview,
  deleteReview,
  getAllPromotions,
  getShowtimesByTheaterAndDate,
  getTheatersByMovie,
  getSeatsByShowtime,
  getAllSeatTypes,
  getPaymentsByUserId,
  getBookingsByUserId
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { middlewareUpload } from "../middlewares/middleUploadUser";

const route = express.Router();

route.get("/profile", authenticate, getUserProfile);
route.put("/profile/update", authenticate, middlewareUpload, updateUserProfile);
route.get("/payment/:userId",authenticate, getPaymentsByUserId);
route.get("/showtimes", getAllShowtime);
route.get("/showtimes-by-date", getShowtimeByDate);
route.get("/showtimes-by-date-and-theater", getShowtimesByTheaterAndDate);
route.get("/news", getAllNews);
route.get("/news/:id", getNewsById);
route.get("/theaters", getAllTheaters);
route.get("/screens", getAllScreens);
route.get("/review/:movieId", getReviews);
route.get("/promotion", getAllPromotions);
route.post("/review", createReview);
route.delete("/review/:reviewId", authenticate, deleteReview);
route.get("/theaters-by-movie", getTheatersByMovie);
route.get("/seats/:showtimeId", getSeatsByShowtime);
route.get("/view-price", getAllSeatTypes);
route.get("/booking/:userId", authenticate, getBookingsByUserId);
export default route;
