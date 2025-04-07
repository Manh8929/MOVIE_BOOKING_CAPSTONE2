// routes/userRoute.js
import express from "express";
import { getUserProfile, getAllShowtime ,getShowtimeByDate } from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const route = express.Router();

route.get("/profile", authenticate, authorize("customer"), getUserProfile);
route.get("/showtimes", getAllShowtime);
route.get("/showtimes-by-date", getShowtimeByDate);
export default route;
