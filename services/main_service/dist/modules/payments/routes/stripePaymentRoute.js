"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-01-27.acacia",
});
router.post("/stripe-payment", async (req, res) => {
    try {
        const { amount, currency, paymentMethodId } = req.body;
        if (!amount || !currency || !paymentMethodId) {
            res
                .status(400)
                .json({ success: false, message: "Missing payment details" });
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Ensure conversion to integer
            currency,
            payment_method: paymentMethodId,
            confirm: true,
        });
        res.json({ success: true, paymentIntent });
    }
    catch (error) {
        console.error("🔥 Stripe Payment Error:", error.message);
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.default = router;
