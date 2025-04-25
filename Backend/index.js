import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import session from "express-session";
import adminRoute from "./src/routes/adminRoute";
import userRoute from "./src/routes/userRoute";
import authRoute from "./src/routes/authRouter";
import { authenticate } from "./src/middlewares/authMiddleware";

require("dotenv").config();
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

app.use("/auth", authRoute);

app.use(authenticate);

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

app.use("/", (req, res) => {
  return res.send("Server on");
});

const PORT = process.env.PORT;
const listenner = app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
