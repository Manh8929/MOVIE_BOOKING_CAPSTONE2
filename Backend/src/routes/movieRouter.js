import express from "express";
import { getAvailableMovies,getMovieDetail, getMoviesByDate, getShowtimeDetail } from "../controllers/movieController.js";

const router = express.Router();

// Public API - ai cũng có thể truy cập
router.get("/movies", getAvailableMovies);

router.get("/movies/:id", getMovieDetail); 
router.get("/movies-by-date", getMoviesByDate);       // /api/showtimes/movies-by-date?date=2025-03-24
router.get("/showtime-movie/:id", getShowtimeDetail);                // /api/showtimes/:id
export default router;