import bodyParser from "body-parser";
import express from "express";
// const paymentController = require("../controllers/paymentController");

const router = express.Router();
const rawBodyParser = bodyParser.raw({ type: "application/json" });

// router.post("/create-payment-intent", paymentController.createPaymentIntent);
// router.post("/mpesa", paymentController.processMpesaPayment);
// router.get("/status", paymentController.getPaymentStatus);
// router.post("/webhook", rawBodyParser, paymentController.handleStripeWebhook);

export default router;
