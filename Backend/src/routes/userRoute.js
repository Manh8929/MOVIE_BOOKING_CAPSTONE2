// routes/userRoute.js
import express from "express";
import { getUserProfile, getAllShowtime ,getShowtimeByDate, updateUserProfile} from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import {middlewareUpload} from "../middlewares/middleUploadUser";

const route = express.Router();

route.get("/profile", authenticate, getUserProfile);
route.put("/profile/update",authenticate, middlewareUpload, updateUserProfile);
route.get("/showtimes", getAllShowtime);
route.get("/showtimes-by-date", getShowtimeByDate);



export default route;
