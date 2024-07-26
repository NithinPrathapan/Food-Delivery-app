import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { minimize: false }
);

const userModel = mongoose.model("User", userSchema) || mongoose.models.User;

export default userModel;
