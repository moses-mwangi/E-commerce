"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webHook = void 0;
const stripe_1 = __importDefault(require("stripe"));
const express_1 = __importDefault(require("express"));
const payment_1 = __importDefault(require("../models/payment"));
const ordersModel_1 = __importDefault(require("../../order/models/ordersModel"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-01-27.acacia",
});
exports.webHook = [
    express_1.default.raw({ type: "application/json" }),
    async (req, res, next) => {
        const sig = req.headers["stripe-signature"];
        let event = null;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        }
        catch (err) {
            console.error("⚠️ Webhook signature verification failed:", err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
        if (!event) {
            console.error("❌ Webhook event is undefined.");
            res.status(400).send("Webhook Error: Event is not defined.");
        }
        try {
            switch (event?.type) {
                case "payment_intent.succeeded": {
                    const paymentIntent = event.data.object;
                    const payment = await payment_1.default.create({
                        userId: 1, // Replace with actual user ID
                        orderId: 1, // Replace with actual order ID
                        stripePaymentId: paymentIntent.id,
                        amount: paymentIntent.amount / 100, // Convert from cents
                        currency: paymentIntent.currency,
                        status: "succeeded",
                    });
                    await ordersModel_1.default.update({ paymentStatus: "paid" }, { where: { id: payment.orderId } });
                    console.log("✅ Payment recorded and order updated.");
                    break;
                }
                case "payment_intent.payment_failed": {
                    const paymentIntent = event.data.object;
                    const payment = await payment_1.default.create({
                        userId: 1,
                        orderId: 1,
                        stripePaymentId: paymentIntent.id,
                        amount: paymentIntent.amount / 100,
                        currency: paymentIntent.currency,
                        status: "failed",
                    });
                    await ordersModel_1.default.update({ paymentStatus: "failed" }, { where: { id: payment.orderId } });
                    console.log("❌ Payment failed. Order updated.");
                    break;
                }
                default:
                    console.log(`🔹 Unhandled event type: ${event?.type}`);
            }
            res.json({ received: true });
        }
        catch (err) {
            console.error("🔥 Error processing webhook:", err);
            res.status(500).send("Internal Server Error");
        }
    },
];
