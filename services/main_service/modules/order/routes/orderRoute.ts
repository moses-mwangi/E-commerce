import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController copy";
import { checkout } from "../controllers/checkout";

const router = express.Router();

router.post("/", createOrder); // Create Order
router.get("/", getAllOrders); // Get All Orders
router.get("/:id", getOrderById); // Get Order by ID
router.patch("/:id", updateOrderStatus); // Update Order Status
router.delete("/:id", deleteOrder); // Delete Order

router.post("/checkout", checkout);

export default router;
