import express from "express";
import {
    getAllUsers,
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie,
  } from "../controllers/adminController";

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const route = express.Router();

route.get("/getAllUsers", authenticate, authorize("admin"), getAllUsers);

// CRUD Movie 
route.get("/movies", authenticate, authorize("admin"), getAllMovies);
route.post("/movies", authenticate, authorize("admin"), createMovie);
route.put("/movies/:id", authenticate, authorize("admin"), updateMovie);
route.delete("/movies/:id", authenticate, authorize("admin"), deleteMovie);

export default route;
