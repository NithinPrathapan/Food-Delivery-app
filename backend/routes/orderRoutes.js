import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  usersOrder,
  verifyOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", verifyOrder);
router.post("/userorders", authMiddleware, usersOrder);
router.get("/list", listOrders);
router.post("/status", updateStatus);

export default router;
