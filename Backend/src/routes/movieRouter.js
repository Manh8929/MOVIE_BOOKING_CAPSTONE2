import express from "express";
import { getAvailableMovies } from "../controllers/movieController.js";

const router = express.Router();

// Public API - ai cũng có thể truy cập
router.get("/movies", getAvailableMovies);

export default router;
