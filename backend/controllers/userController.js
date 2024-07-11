import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  // token created
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerUser = async (req, res) => {
  console.log("fn call");
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(500)
        .json({ success: false, message: "user already registered" });
    }
    // validating email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
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
    return res.status(200).json({
      success: true,
      message: "User saved",
      token: token,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to save user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("fn called");
  console.log(email, password);

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password mismatch" });
    }

    const token = createToken(user._id);
    return res.status(200).json({ success: true, token: token, user: user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};
