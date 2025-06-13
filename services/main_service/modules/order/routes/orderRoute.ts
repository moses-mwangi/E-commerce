import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  createOrder,
  updateOrder,
} from "../controllers/orderController";

const router = express.Router();
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.route("/:id").patch(updateOrder);
// router.patch("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
