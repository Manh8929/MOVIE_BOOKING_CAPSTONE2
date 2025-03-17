import express from "express";
import cors from "cors";
require("dotenv").config();
require("./connection_DB");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/", (req, res) => {
  return res.send("Server on");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

const listenner = app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
