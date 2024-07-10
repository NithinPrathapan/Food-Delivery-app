import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  // token created
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const loginUser = async (req, res) => {};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res
        .status(500)
        .json({ success: false, message: "user already registered" });
    }
    // validating email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      res.json({ success: false, message: "Please enter strong password" });
    }

    // encrypt password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    res.status(200).json({ success: true, message: "User saved", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save user", error });
  }
};
