import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity || 1;
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!Array.isArray(user.cartData)) {
      user.cartData = [];
    }
    const itemIndex = user.cartData.findIndex((item) => item.id === itemId);
    if (itemIndex > -1) {
      user.cartData[itemIndex].quantity += quantity;
      console.log(
        `Incremented quantity for item ${itemId}: ${user.cartData[itemIndex].quantity}`
      );
    } else {
      user.cartData.push({
        id: itemId,
        quantity: quantity,
      });
      console.log(`Added item ${itemId} to cart with quantity ${quantity}`);
    }
    await user.save();
    res.status(200).json({ success: true, data: user.cartData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  console.log("fn called");
  const { quantity, userId } = req.body;
  console.log(req.params.id);
  console.log(quantity);
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    console.log("cartdata", cartData[req.params.id]);
    if (cartData[req.params.id] > 0) {
      cartData[req.params.id] -= quantity;
    }
    if (cartData[req.params.id] <= 0) {
      delete cartData[req.params.id];
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
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
    return res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, error });
  }
};
