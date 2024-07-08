import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

//app config
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

// middleware for
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world!");
});

// conncection to db and port
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("connected to port", port);
});
