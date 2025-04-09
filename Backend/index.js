import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import session from "express-session";
import adminRoute from "./src/routes/adminRoute";
import userRoute from "./src/routes/userRoute";
import authRoute from "./src/routes/authRouter";
import { authenticate } from "./src/middlewares/authMiddleware";
<<<<<<< HEAD


require("dotenv").config();
=======
const passport = require("./src/middlewares/passport_setup");
>>>>>>> a7fdc4d52d3997f3a842b7d1952b7ee026c24db4
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
<<<<<<< HEAD
//Public
// API Showtime
app.use("/api", userRoute);
=======
console.log("process.env.CLIENT_URL", process.env.CLIENT_URL);
>>>>>>> a7fdc4d52d3997f3a842b7d1952b7ee026c24db4
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
app.use(authenticate);

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

<<<<<<< HEAD
app.use("/", (req, res) => {
  return res.send("Server on");
});



=======
>>>>>>> a7fdc4d52d3997f3a842b7d1952b7ee026c24db4
const PORT = process.env.PORT;
const listenner = app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
