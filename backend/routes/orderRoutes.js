import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);

export default router;