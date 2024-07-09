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

export const getAllFoods = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

// remove food item

export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
