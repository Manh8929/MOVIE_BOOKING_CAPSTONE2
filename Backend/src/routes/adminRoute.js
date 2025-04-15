// import express from "express";
// import { getAllUsers } from "../controllers/adminController";
// const { authenticate, authorize } = require("../middlewares/authMiddleware");

// const route = express.Router();

// route.get("/getAllUsers", authenticate, authorize("admin"), getAllUsers);

// export default route;

import express from "express";
import {
  getAllUsers,
  createShowtimeController,
  updateShowtimeController,
  deleteShowtimeController,
} from "../controllers/adminController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.get("/getAllUsers", authenticate, authorize("admin"), getAllUsers);

// ✅ Thêm route quản lý lịch chiếu
route.post("/showtimes", authenticate, authorize("admin"), createShowtimeController);
route.put("/showtimes/:id", authenticate, authorize("admin"), updateShowtimeController);
route.delete("/showtimes/:id", authenticate, authorize("admin"), deleteShowtimeController);

export default route;
