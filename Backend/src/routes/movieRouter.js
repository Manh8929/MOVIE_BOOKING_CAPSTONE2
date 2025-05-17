import express from "express";
import { getAvailableMovies,getMovieDetail } from "../controllers/movieController.js";

const router = express.Router();

// Public API - ai cũng có thể truy cập
router.get("/movies", getAvailableMovies);

router.get("/movies/:id", getMovieDetail); 
export default router;