import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);

export default route;
