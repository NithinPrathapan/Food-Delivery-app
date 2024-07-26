import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
