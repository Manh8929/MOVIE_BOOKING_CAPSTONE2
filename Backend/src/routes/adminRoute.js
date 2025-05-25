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
  getAllScreens,
  createScreen,
  updateScreen,
  deleteScreen,
  createPromotion,
  updatePromotion,
  deletePromotion,
  getAllPromotions,
  deleteUser,
  updateUser,
  createSeats,
  getAllSeatsController,
  updateSeatController,
  deleteSeatController,
  getUpcomingShowtimes,
  getAllSeatTypes,
  createSeatType,
  updateSeatType,
  deleteSeatType,
  getAllShowtime,
} from "../controllers/adminController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { middlewareUpload } from "../middlewares/middleUploadMovie.js";
import { middlewareUploadPromotion } from "../middlewares/middleUploadPromotion.js";
const route = express.Router();

//api manager User
route.get("/getAllUsers", authenticate, authorize("admin"), getAllUsers);
route.delete("/deleteUsers/:id", authenticate, authorize("admin"), deleteUser);
route.put("/updateUsers/:id", authenticate, authorize("admin"), updateUser);

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
route.get("/upcoming", authenticate, authorize("admin"), getUpcomingShowtimes);
route.get("/showtime-all", authenticate, authorize("admin"), getAllShowtime);

// CRUD News
route.post("/news", authenticate, authorize("admin"), createNews);
route.put("/news/:id", authenticate, authorize("admin"), updateNews);
route.delete("/news/:id", authenticate, authorize("admin"), deleteNews);

// CRUD Movie
route.get("/movies", authenticate, authorize("admin"), getAllMovies);
route.post(
  "/movies",
  authenticate,
  authorize("admin"),
  middlewareUpload,
  createMovie
);
route.put(
  "/movies/:id",
  authenticate,
  authorize("admin"),
  middlewareUpload,
  updateMovie
);
route.delete("/movies/:id", authenticate, authorize("admin"), deleteMovie);

// promotions
route.post(
  "/promotion",
  authenticate,
  authorize("admin"),
  middlewareUploadPromotion,
  createPromotion
);
route.put(
  "/promotion/:id",
  authenticate,
  authorize("admin"),
  middlewareUploadPromotion,
  updatePromotion
);
route.delete("/promotion/:id", authenticate, deletePromotion);
route.get("/promotion", authenticate, getAllPromotions);

// CRUD Theater (Rạp)
route.get("/theaters", authenticate, authorize("admin"), getAllTheaters);
route.post("/theaters", authenticate, authorize("admin"), createTheater);
route.put("/theaters/:id", authenticate, authorize("admin"), updateTheater);
route.delete("/theaters/:id", authenticate, authorize("admin"), deleteTheater);

// screens
route.get("/screens", authenticate, authorize("admin"), getAllScreens);
route.post("/screens", authenticate, authorize("admin"), createScreen);
route.put("/screens/:id", authenticate, authorize("admin"), updateScreen);
route.delete("/screens/:id", authenticate, authorize("admin"), deleteScreen);

// Ghế
route.post('/create-seats',authenticate, authorize("admin"), createSeats);
route.get('/viewAll-seats',authenticate, authorize("admin"), getAllSeatsController);
route.put('/seats/:id',authenticate, authorize("admin"), updateSeatController);
route.delete('/seats/:id',authenticate, authorize("admin"), deleteSeatController);


// giá
route.get("/price",authenticate, authorize("admin"),getAllSeatTypes);
route.post("/create-price",authenticate, authorize("admin"), createSeatType);
route.put("/update-price/:id",authenticate, authorize("admin"), updateSeatType);
route.delete("/delete-price/:id",authenticate, authorize("admin"), deleteSeatType);


export default route;
