import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import session from "express-session";
import adminRoute from "./src/routes/adminRoute";
import userRoute from "./src/routes/userRoute";
import authRoute from "./src/routes/authRouter";
import movieRouter from "./src/routes/movieRouter.js";
import paymentRoute from './src/routes/paymentRoute.js';
import { authenticate } from "./src/middlewares/authMiddleware";

require("dotenv").config();
const passport = require("./src/middlewares/passport_setup");
require("./connection_DB");

const app = express();
console.log(process.env.EMAIL_USER)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/showtime", userRoute);
app.use("/new", userRoute);
app.use("/", userRoute);
app.use("/", movieRouter);
app.use("/auth", authRoute);
app.use(authenticate);



// Các route yêu cầu đăng nhập
app.use("/api/admin", authenticate, adminRoute);
app.use("/api/user", authenticate, userRoute);
app.use("/payment",authenticate, paymentRoute);

app.get("/", (req, res) => {
  return res.send("Server on");
});

const PORT = process.env.PORT;
const listenner = app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
