// import { Request, Response } from "express";
// import Order from "../../order/models/ordersModel";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.createPaymentIntent = async (req: Request, res: Response) => {
//   try {
//     const { amount, currency, customerId, metadata } = req.body;

//     // Validate input
//     if (!amount || isNaN(amount)) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     // Create PaymentIntent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100), // Convert to cents
//       currency: currency || "usd",
//       customer: customerId,
//       metadata: metadata || {},
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//     });
//   } catch (error: any) {
//     console.error("Error creating payment intent:", error);
//     res.status(500).json({ error: error?.message });
//   }
// };

// exports.handleStripeWebhook = async (req: Request, res: Response) => {
//   const sig = req.headers["stripe-signature"];
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
//   } catch (err: any) {
//     console.error("Webhook signature verification failed:", err);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   switch (event.type) {
//     case "payment_intent.succeeded":
//       const paymentIntent = event.data.object;
//       await handlePaymentSuccess(paymentIntent);
//       break;
//     case "payment_intent.payment_failed":
//       const failedPayment = event.data.object;
//       await handlePaymentFailure(failedPayment);
//       break;
//     // Add other event types as needed
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   res.status(200).json({ received: true });
// };

// async function handlePaymentSuccess(paymentIntent: { id: any }) {
//   try {
//     // Update your database
//     const order = await Order.findOneAndUpdate(
//       { paymentIntentId: paymentIntent.id },
//       {
//         status: "paid",
//         paymentStatus: "completed",
//         paymentDetails: paymentIntent,
//       },
//       { new: true }
//     );

//     // Send confirmation email, etc.
//     console.log(`Payment for order ${order.id} succeeded`);
//   } catch (error) {
//     console.error("Error handling payment success:", error);
//   }
// }

// async function handlePaymentFailure(paymentIntent) {
//   try {
//     await Order.findOneAndUpdate(
//       { paymentIntentId: paymentIntent.id },
//       {
//         status: "payment_failed",
//         paymentStatus: "failed",
//         paymentDetails: paymentIntent,
//       }
//     );
//     console.log(`Payment failed for intent ${paymentIntent.id}`);
//   } catch (error) {
//     console.error("Error handling payment failure:", error);
//   }
// }

// exports.processMpesaPayment = async (req: Request, res: Response) => {
//   try {
//     const { phone, amount, reference } = req.body;

//     // Validate input
//     if (!phone || !amount || !reference) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // In a real implementation, you would call the M-Pesa API here
//     // This is just a mock implementation
//     const transactionId = `MPESA_${Date.now()}`;

//     // Simulate processing delay
//     setTimeout(async () => {
//       // Save to your database
//       const order = new Order({
//         paymentMethod: "mpesa",
//         amount,
//         status: "pending",
//         transactionId,
//         reference,
//         customerPhone: phone,
//       });
//       await order.save();

//       // In reality, you would wait for M-Pesa confirmation via webhook
//       // For demo, we'll simulate success after 5 seconds
//       setTimeout(async () => {
//         order.status = "paid";
//         order.paymentStatus = "completed";
//         await order.save();
//       }, 5000);
//     }, 1000);

//     res.status(200).json({
//       message: "Payment request received",
//       transactionId,
//       status: "pending",
//     });
//   } catch (error: any) {
//     console.error("M-Pesa payment error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getPaymentStatus = async (req: Request, res: Response) => {
//   try {
//     const { paymentIntentId, transactionId } = req.query;

//     if (!paymentIntentId && !transactionId) {
//       return res.status(400).json({ error: "Missing payment identifier" });
//     }

//     let paymentDetails;
//     let order;

//     if (paymentIntentId) {
//       // For Stripe payments
//       paymentDetails = await stripe.paymentIntents.retrieve(paymentIntentId);
//       order = await Order.findOne({ paymentIntentId });
//     } else {
//       // For other payment methods (e.g., M-Pesa)
//       order = await Order.findOne({ transactionId });
//     }

//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     res.status(200).json({
//       status: order.status,
//       paymentStatus: order.paymentStatus,
//       paymentDetails: paymentDetails || order.paymentDetails,
//       order,
//     });
//   } catch (error: any) {
//     console.error("Error getting payment status:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
