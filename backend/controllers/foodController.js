import multer from "multer";
import foodModel from "../models/FoodSchema.js";

import fs from "fs";

// image storage engine

export const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    image: image_filename,
  });
  try {
    await food.save();
    res.status(200).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
