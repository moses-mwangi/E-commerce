import Stripe from "stripe";
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import Payment from "../models/payment";
import Order from "../../order/models/ordersModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // apiVersion: "2025-01-27.acacia",
  apiVersion: "2025-02-24.acacia" as any
});

export const webHook: RequestHandler[] = [
  express.raw({ type: "application/json" }),

  async (req: Request, res: Response, next: NextFunction) => {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event | null = null;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
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
          const paymentIntent = event.data.object as Stripe.PaymentIntent;

          const payment = await Payment.create({
            userId: 1, // Replace with actual user ID
            orderId: 1, // Replace with actual order ID
            stripePaymentId: paymentIntent.id,
            amount: paymentIntent.amount / 100, // Convert from cents
            currency: paymentIntent.currency,
            status: "succeeded",
          });

          await Order.update(
            { paymentStatus: "paid" },
            { where: { id: payment.orderId } }
          );

          console.log("✅ Payment recorded and order updated.");
          break;
        }

        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;

          const payment = await Payment.create({
            userId: 1,
            orderId: 1,
            stripePaymentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: "failed",
          });

          await Order.update(
            { paymentStatus: "failed" },
            { where: { id: payment.orderId } }
          );

          console.log("❌ Payment failed. Order updated.");
          break;
        }

        default:
          console.log(`🔹 Unhandled event type: ${event?.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error("🔥 Error processing webhook:", err);
      res.status(500).send("Internal Server Error");
    }
  },
];
