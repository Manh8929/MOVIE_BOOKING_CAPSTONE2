// routes/userRoute.js
import express from "express";
import { getUserProfile } from "../controllers/userController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const route = express.Router();

route.get("/profile", authenticate, authorize("customer"), getUserProfile);

export default route;
