import express from "express";
import {
  // createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController";
import { checkout } from "../controllers/checkout";
import { createOrder } from "../controllers/orderController copy";

const router = express.Router();
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

router.post("/checkout", checkout);

export default router;
