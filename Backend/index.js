import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import session from "express-session";
import adminRoute from "./src/routes/adminRoute";
import userRoute from "./src/routes/userRoute";
import authRoute from "./src/routes/authRouter";
import movieRouter from "./src/routes/movieRouter.js";
import { authenticate } from "./src/middlewares/authMiddleware";
const passport = require("./src/middlewares/passport_setup");
require("./connection_DB");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
console.log("process.env.CLIENT_URL", process.env.CLIENT_URL);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
// app.get("/", (req, res) => {
//   res.send("<a href='/auth/google'>Login with Google</a>");
// });
// app.use("/", (req, res) => {
//   return res.send("Server on");
// });

// Các route không yêu cầu đăng nhập
app.use("/", movieRouter);

// Các route yêu cầu đăng nhập
app.use("/auth", authRoute);
app.use("/api/admin", authenticate, adminRoute);
app.use("/api/user", authenticate, userRoute);

const PORT = process.env.PORT;
const listenner = app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
