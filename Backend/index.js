import express from "express";
import cors from "cors";
import adminRoute from "./src/routes/adminRoute";
import userRoute from "./src/routes/userRoute";
import authRoute from "./src/routes/authRouter";
import { authenticate } from "./src/middlewares/authMiddleware";

require("dotenv").config();
require("./connection_DB");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);

// Middleware để xác thực người dùng trước khi vào các route
app.use(authenticate);

app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.use("/", (req, res) => {
  return res.send("Server on");
});
const PORT = process.env.PORT;
const listenner = app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
