import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//placing order from the frontend

export const placeOrder = async (req, res) => {
  const { items, amount, address } = req.body.orderData;
  const frontend_url = "http://localhost:5173";
  console.log("fn call");

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    const user = await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    return res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
};
