import express from "express";
import { addFood, getAllFoods, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const router = express.Router();

// !image storage engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// ?routes
router.post("/add", upload.single("image"), addFood);
router.get("/", getAllFoods);
router.delete("/:id", removeFood);

export default router;
