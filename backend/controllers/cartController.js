import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res
      .status(200)
      .json({ syuccess: true, data: cartData, message: "Added cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });
    return res
      .status(200)
      .json({ success: true, message: "removed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, error });
  }
};
export const getCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    return res.status(200).json({ success: true, message: cartData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, error });
  }
};