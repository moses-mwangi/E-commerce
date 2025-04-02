"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
// const paymentController = require("../controllers/paymentController");
const router = express_1.default.Router();
const rawBodyParser = body_parser_1.default.raw({ type: "application/json" });
// router.post("/create-payment-intent", paymentController.createPaymentIntent);
// router.post("/mpesa", paymentController.processMpesaPayment);
// router.get("/status", paymentController.getPaymentStatus);
// router.post("/webhook", rawBodyParser, paymentController.handleStripeWebhook);
exports.default = router;
