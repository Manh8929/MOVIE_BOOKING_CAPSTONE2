import express from "express";
import {
  getAllUsers,
  createShowtimeController,
  updateShowtimeController,
  deleteShowtimeController,
  createNews,
  updateNews,
  deleteNews,
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getAllTheaters,
  createTheater,
  updateTheater,
  deleteTheater,
} from "../controllers/adminController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { middlewareUpload } from "../middlewares/middleUploadMovie.js";
const route = express.Router();

route.get("/getAllUsers", authenticate, authorize("admin"), getAllUsers);

// CRUD Showtime
route.post(
  "/showtimes",
  authenticate,
  authorize("admin"),
  createShowtimeController
);
route.put(
  "/showtimes/:id",
  authenticate,
  authorize("admin"),
  updateShowtimeController
);
route.delete(
  "/showtimes/:id",
  authenticate,
  authorize("admin"),
  deleteShowtimeController
);

// CRUD News
route.post("/news", authenticate, createNews);
route.put("/news/:id", authenticate, updateNews);
route.delete("/news/:id", authenticate, deleteNews);

// CRUD Movie
route.get("/movies", authenticate, authorize("admin"), getAllMovies);
route.post("/movies",authenticate,authorize("admin"),middlewareUpload,createMovie);
route.put("/movies/:id", authenticate, authorize("admin"), middlewareUpload, updateMovie);
route.delete("/movies/:id", authenticate, authorize("admin"), deleteMovie);

// CRUD Theater (Rạp)
route.get("/theaters", authenticate, authorize("admin"), getAllTheaters);
route.post("/theaters", authenticate, authorize("admin"), createTheater);
route.put("/theaters/:id", authenticate, authorize("admin"), updateTheater);
route.delete("/theaters/:id", authenticate, authorize("admin"), deleteTheater);
export default route;
