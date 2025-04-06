"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentStatus = exports.processMpesaPayment = exports.handleStripeWebhook = exports.createPaymentIntent = void 0;
const ordersModel_1 = __importDefault(require("../../order/models/ordersModel"));
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency, customerId, metadata } = req.body;
        // Validate input
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency || "usd",
            customer: customerId,
            metadata: metadata || {},
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    }
    catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error?.message });
    }
};
exports.createPaymentIntent = createPaymentIntent;
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    }
    catch (err) {
        console.error("Webhook signature verification failed:", err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            await handlePaymentSuccess(paymentIntent);
            break;
        case "payment_intent.payment_failed":
            const failedPayment = event.data.object;
            await handlePaymentFailure(failedPayment);
            break;
        // Add other event types as needed
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).json({ received: true });
};
exports.handleStripeWebhook = handleStripeWebhook;
async function handlePaymentSuccess(paymentIntent) {
    try {
        // Update your database
        const order = await ordersModel_1.default.findOne({
            where: {
                paymentIntentId: paymentIntent.id,
            },
        });
        order?.update({
            status: "paid",
            paymentStatus: "completed",
            paymentDetails: paymentIntent,
        });
        // Send confirmation email, etc.
        console.log(`Payment for order ${order?.id} succeeded`);
    }
    catch (error) {
        console.error("Error handling payment success:", error);
    }
}
async function handlePaymentFailure(paymentIntent) {
    try {
        const order = await ordersModel_1.default.findOne({
            where: { paymentIntentId: paymentIntent.id },
        });
        order?.update({
            status: "payment_failed",
            paymentStatus: "failed",
            paymentDetails: paymentIntent,
        });
        console.log(`Payment failed for intent ${paymentIntent.id}`);
    }
    catch (error) {
        console.error("Error handling payment failure:", error);
    }
}
const processMpesaPayment = async (req, res) => {
    try {
        const { phone, amount, reference } = req.body;
        // Validate input
        if (!phone || !amount || !reference) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        // In a real implementation, you would call the M-Pesa API here
        // This is just a mock implementation
        const transactionId = `MPESA_${Date.now()}`;
        // Simulate processing delay
        setTimeout(async () => {
            // Save to your database
            const order = new ordersModel_1.default({
                paymentMethod: "mpesa",
                amount,
                status: "pending",
                transactionId,
                reference,
                customerPhone: phone,
            });
            await order.save();
            // In reality, you would wait for M-Pesa confirmation via webhook
            // For demo, we'll simulate success after 5 seconds
            setTimeout(async () => {
                order.status = "shipped";
                order.paymentStatus = "paid";
                await order.save();
            }, 5000);
        }, 1000);
        res.status(200).json({
            message: "Payment request received",
            transactionId,
            status: "pending",
        });
    }
    catch (error) {
        console.error("M-Pesa payment error:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.processMpesaPayment = processMpesaPayment;
const getPaymentStatus = async (req, res) => {
    try {
        const { paymentIntentId, transactionId } = req.query;
        if (!paymentIntentId && !transactionId) {
            return res.status(400).json({ error: "Missing payment identifier" });
        }
        let paymentDetails;
        let order;
        if (paymentIntentId) {
            // For Stripe payments
            paymentDetails = await stripe.paymentIntents.retrieve(paymentIntentId);
            order = await ordersModel_1.default.findOne({ where: { paymentIntentId } });
        }
        else {
            // For other payment methods (e.g., M-Pesa)
            order = await ordersModel_1.default.findOne({ where: { transactionId } });
        }
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json({
            status: order.status,
            paymentStatus: order.paymentStatus,
            paymentDetails: paymentDetails || order.paymentDetails,
            order,
        });
    }
    catch (error) {
        console.error("Error getting payment status:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.getPaymentStatus = getPaymentStatus;
