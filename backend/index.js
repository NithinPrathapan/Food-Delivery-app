import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import foodRouter from "./routes/foodRoutes.js";

//app config
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world!");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch((err) => {
    console.log(err);
  });

//   api ed points

app.use("/api/food", foodRouter);

app.listen(port, () => {
  console.log("connected to port", port);
});
