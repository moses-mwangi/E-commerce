"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const checkout_1 = require("../controllers/checkout");
const orderController_copy_1 = require("../controllers/orderController copy");
// import { protect } from "../../users/controllers/authController copy";
// import { protect } from "../../users/controllers/authController";
const router = express_1.default.Router();
router.post("/", orderController_copy_1.createOrder); // Create Order
router.get("/", orderController_1.getAllOrders); // Get All Orders
router.get("/:id", orderController_1.getOrderById); // Get Order by ID
router.patch("/:id", orderController_1.updateOrderStatus); // Update Order Status
router.delete("/:id", orderController_1.deleteOrder); // Delete Order
router.post("/checkout", checkout_1.checkout);
exports.default = router;
