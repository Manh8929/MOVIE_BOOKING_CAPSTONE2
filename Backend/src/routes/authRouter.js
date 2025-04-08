import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import passport from "passport";
const {
  authenticate,
  authorize,
  generateToken,
} = require("../middlewares/authMiddleware");

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);

route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

route.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

route.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

route.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

export default route;
