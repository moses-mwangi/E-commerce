// import Stripe from "stripe";
// import express, {
//   NextFunction,
//   Request,
//   RequestHandler,
//   Response,
// } from "express";
// import Order from "../../order/models/ordersModel";
// import Payment from "../models/payment";
// import catchAsync from "../../../shared/utils/catchSync";
// import AppError from "../../../shared/utils/AppError";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2023-10-16" as any,
//   typescript: true,
// });

// export const createPaymentIntent = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { amount, currency = "usd", customerId, metadata = {} } = req.body;
//     console.log(req.body);

//     if (!amount || isNaN(amount)) {
//       return next(new AppError("Invalid Amount", 400));
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       customer: customerId,
//       payment_method_types: ["card"],
//       metadata,
//     });

//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//     });
//   }
// );

// export const handleWebhook: RequestHandler[] = [
//   express.raw({ type: "application/json" }),

//   catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const sig = req.headers["stripe-signature"] as string;
//     let event: Stripe.Event | null = null;

//     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         // (req as any).rawBody,
//         sig,
//         endpointSecret
//       );
//     } catch (err: any) {
//       console.error("⚠️ Webhook signature verification failed:", err.message);
//       res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (!event) {
//       console.error("❌ Webhook event is undefined.");
//       return next(new AppError("Webhook Error: Event is not defined.", 400));
//     }

//     if (!process.env.STRIPE_WEBHOOK_SECRET) {
//       return next(new AppError("Webhook Error: Missing configuration.", 500));
//     }

//     switch (event?.type) {
//       case "payment_intent.succeeded":
//         const paymentIntent = event.data.object;
//         console.log("Payment succeeded:", paymentIntent);
//         break;
//     }

//     try {
//       switch (event?.type) {
//         case "payment_intent.succeeded": {
//           const paymentIntent = event.data.object as Stripe.PaymentIntent;
//           const { orderId, userId } = paymentIntent.metadata;

//           if (!orderId || !userId) {
//             console.error("Missing orderId or userId in metadata");
//             break;
//           }

//           const payment = await Payment.create({
//             userId: parseInt(userId, 10),
//             orderId: parseInt(orderId, 10),
//             stripePaymentId: paymentIntent.id,
//             amount: paymentIntent.amount / 100,
//             currency: paymentIntent.currency,
//             status: "succeeded",
//           });

//           await Order.update(
//             { paymentStatus: "paid" },
//             { where: { id: payment.orderId } }
//           );

//           console.log("✅ Payment recorded and order updated.");
//           break;
//         }

//         case "payment_intent.payment_failed": {
//           const paymentIntent = event.data.object as Stripe.PaymentIntent;
//           const { orderId, userId } = paymentIntent.metadata;

//           if (!orderId || !userId) {
//             console.error("Missing orderId or userId in metadata");
//             break;
//           }

//           const payment = await Payment.create({
//             userId: parseInt(userId, 10),
//             orderId: parseInt(orderId, 10),
//             stripePaymentId: paymentIntent.id,
//             amount: paymentIntent.amount / 100,
//             currency: paymentIntent.currency,
//             status: "failed",
//           });

//           await Order.update(
//             { paymentStatus: "failed", status: "pending" },
//             { where: { id: payment.orderId } }
//           );

//           console.log("❌ Payment failed. Order updated.");
//           break;
//         }

//         default:
//           console.log(`🔹 Unhandled event type: ${event?.type}`);
//       }

//       res.json({ received: true });
//     } catch (err) {
//       console.error("🔥 Error processing webhook:", err);
//       res.status(500).send("Internal Server Error");
//     }
//   }),
// ];

import Stripe from "stripe";
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import Order from "../../order/models/ordersModel";
import Payment from "../models/paymentModel";
import catchAsync from "../../../shared/utils/catchSync";
import AppError from "../../../shared/utils/AppError";
import sequelize from "../../../shared/config/pg_database";
import { UUIDV4 } from "sequelize";

interface PaymentMetadata extends Stripe.Metadata {
  orderId: string;
  userId: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any,
  typescript: true,
});

export const createPaymentIntent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        amount,
        currency = "usd",
        paymentMethodId,
        // customerId,
        metadata = {},
        name,
      } = req.body;

      if (!amount || isNaN(amount) || amount <= 0) {
        return next(new AppError("Invalid payment amount", 400));
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency,
        // customer: customerId,
        payment_method_types: ["card"],
        payment_method: paymentMethodId,
        // confirm: true,

        metadata: {
          ...metadata,
          userId: metadata.userId?.toString(),
          orderId: metadata.orderId?.toString(),
          name: name,
        },
      });

      console.log("TRYING TO", req.body, paymentIntent);

      res.status(200).json({
        status: "success",
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }
);

export const handleWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    if (!endpointSecret) {
      return next(new AppError("Webhook secret not configured", 500));
    }

    if (!(req as any).rawBody) {
      throw new Error("Missing raw body for verification");
    }

    let event: Stripe.Event;
    const body = (req as any).rawBody;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
      console.error("ERROROROROOROROROROOR", err);
      console.error("⚠️ Webhook signature verification failed:", err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          await handleSuccessfulPayment(event);
          break;

        case "payment_intent.payment_failed":
          await handleFailedPayment(event);
          break;

        default:
          console.log(`🔹 Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error("🔥 Error processing webhook:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

async function handleSuccessfulPayment(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const metadata = paymentIntent.metadata as PaymentMetadata;
  // const paymentMethod=paymentIntent.

  if (!metadata.orderId || !metadata.userId) {
    throw new Error("Missing orderId or userId in metadata");
  }

  await sequelize.transaction(async (t) => {
    const payment = await Payment.create(
      {
        userId: parseInt(metadata.userId, 10),
        orderId: parseInt(metadata.orderId, 10),
        stripePaymentId: paymentIntent.id,
        paymentMethod: "card",
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: "succeeded",
      },
      { transaction: t }
    );

    await Order.update(
      { paymentStatus: "paid", status: "confirmed" },
      {
        where: { id: payment.orderId },
        transaction: t,
      }
    );
  });

  console.log("✅ Payment succeeded and order updated:", {
    paymentId: paymentIntent.id,
    orderId: metadata.orderId,
  });
}

async function handleFailedPayment(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const metadata = paymentIntent.metadata as PaymentMetadata;

  console.log("Th webhook FAILED", paymentIntent, metadata);

  if (!metadata.orderId || !metadata.userId) {
    throw new Error("Missing orderId or userId in metadata");
  }

  await sequelize.transaction(async (t) => {
    const payment = await Payment.create(
      {
        userId: parseInt(metadata.userId, 10),
        orderId: parseInt(metadata.orderId, 10),
        stripePaymentId: paymentIntent.id,
        paymentMethod: "card",
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: "failed",
      },
      { transaction: t }
    );

    await Order.update(
      { paymentStatus: "failed", status: "pending" },
      {
        where: { id: payment.orderId },
        transaction: t,
      }
    );
  });

  console.log("❌ Payment failed:", {
    paymentId: paymentIntent.id,
    orderId: metadata.orderId,
    reason: paymentIntent.last_payment_error?.message || "Unknown reason",
  });
}
