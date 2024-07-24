import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Pdvu4Rwv4OZk4Qf4ViilmtploU4KOo0jTJPigAHCSEklNZcCLCsLuvLBhfJ81dixVmN45ckL9KwCf9euaqVCiZe00gCbbaWQ3"
);
export const placeOrder = async (req, res) => {
  console.log("fn called");
  const { items, amount, address } = req.body.orderData;
  const frontend_url = "http://localhost:5173";
  console.log("fn call");

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      item,
      amount,
      address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    return res.status(200).json({ session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
};

export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.status(200).json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(200).json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};

// users order for frontend

export const usersOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    return response.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};
