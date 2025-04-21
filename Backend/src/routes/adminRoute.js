import express from "express";
import {
  getAllUsers,
  createShowtimeController,
  updateShowtimeController,
  deleteShowtimeController,
  createNews,
  updateNews,
  deleteNews
} from "../controllers/adminController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.get("/getAllUsers", authenticate, authorize("admin"), getAllUsers);

route.post("/showtimes", authenticate, authorize("admin"), createShowtimeController);
route.put("/showtimes/:id", authenticate, authorize("admin"), updateShowtimeController);
route.delete("/showtimes/:id", authenticate, authorize("admin"), deleteShowtimeController);
route.post("/news", authenticate, createNews);
route.put("/news/:id", authenticate, updateNews);
route.delete("/news/:id", authenticate, deleteNews);
export default route;