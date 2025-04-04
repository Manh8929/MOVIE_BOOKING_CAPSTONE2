import express from "express";
import { getAllUsers } from "../controllers/adminController";
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const route = express.Router();

route.get("/getAllUsers", authenticate, authorize("admin"), getAllUsers);

export default route;
