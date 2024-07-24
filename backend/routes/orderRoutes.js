import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { placeOrder, verifyOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", verifyOrder);

export default router;
