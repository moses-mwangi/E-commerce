import express, { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

router.post("/stripe-payment", async (req: Request, res: Response) => {
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
  } catch (error: any) {
    console.error("🔥 Stripe Payment Error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
