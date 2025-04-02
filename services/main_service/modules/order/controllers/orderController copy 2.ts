import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import AppError from "../../../shared/utils/AppError";
import Product from "../../product/models/product/productModels";
import Order from "../models/ordersModel";
import OrderItem from "../models/itemOrder";
import Payment from "../../payments/models/payment";
import Stripe from "stripe";
import dotenv from "dotenv";
import { Identifier } from "sequelize";
import axios from "axios";
import { model } from "mongoose";
import User from "../../users/models/userMode";
import ProductImage from "../../product/models/product/productImageModel";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // apiVersion: "2025-01-27.acacia",
  apiVersion: "2025-02-24.acacia" as any,
  timeout: 20000,
});

// export const createOrder = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { userId, products, shippingAddress, paymentMethodId } = req.body;

//     if (!userId || !products || products.length === 0 || !shippingAddress) {
//       return next(new AppError("Missing required fields", 400));
//     }

//     let totalPrice = 0;

//     for (const item of products) {
//       const product = await Product.findByPk(item.productId);
//       if (!product)
//         return next(
//           new AppError(`Product with ID ${item.productId} not found`, 404)
//         );

//       totalPrice += product.price * item.quantity;
//     }

//     let paymentStatus: "paid" | "unpaid" | "failed" = "unpaid";
//     let stripePaymentId: string | null = null;

//     if (paymentMethodId) {
//       try {
//         const paymentIntent = await stripe.paymentIntents.create({
//           amount: Math.round(totalPrice * 100),
//           currency: "usd",
//           payment_method: paymentMethodId,
//           confirm: true,
//         });

//         stripePaymentId = paymentIntent.id;
//         paymentStatus = "paid";
//       } catch (error: any) {
//         console.error("🔥 Stripe Payment Error:", error.message);
//         return next(new AppError("Payment failed, please try again.", 400));
//       }
//     }

//     const order = await Order.create({
//       userId,
//       totalPrice,
//       shippingAddress,
//       status: "pending",
//       paymentStatus,
//     });

//     for (const item of products) {
//       await OrderItem.create({
//         orderId: order.id,
//         productId: item.productId,
//         quantity: item.quantity,
//         price: (await Product.findByPk(item.productId))?.price || 0,
//       });
//     }

//     if (stripePaymentId) {
//       await Payment.create({
//         userId,
//         orderId: order.id,
//         stripePaymentId,
//         amount: totalPrice,
//         currency: "usd",
//         status: paymentStatus,
//       });
//     }

//     res
//       .status(201)
//       .json({ success: true, message: "Order placed successfully!", order });
//   }
// );

// export const createOrder = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { userId, products, shippingAddress } = req.body;

//     if (!userId || !products || products.length === 0 || !shippingAddress) {
//       return next(new AppError("Missing required fields", 400));
//     }

//     let totalPrice = 0;
//     const lineItems: any[] = [];

//     for (const item of products) {
//       const product = await Product.findByPk(item.productId);

//       if (!product) {
//         return next(
//           new AppError(`Product with ID ${item.productId} not found`, 404)
//         );
//       }

//       totalPrice += product.price * item.quantity;

//       lineItems.push({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: product.name,
//             images: product.images ? [product.images[0]] : [],
//           },
//           unit_amount: Math.round(product.price * 100), // Convert to cents
//         },
//         quantity: item.quantity,
//       });
//     }

//     // Create Order
//     const order = await Order.create({
//       userId,
//       totalPrice,
//       shippingAddress,
//       status: "pending",
//       paymentStatus: "unpaid",
//     });

//     // Store order items
//     for (const item of products) {
//       const product = await Product.findByPk(item.productId);
//       if (product) {
//         await OrderItem.create({
//           orderId: order.id,
//           productId: product.id,
//           quantity: item.quantity,
//           price: product.price,
//         });
//       }
//     }

//     // ✅ Stripe Checkout (Redirect to Payment Page)
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card", "paypal"], // Enable both Stripe & PayPal
//         mode: "payment",
//         success_url: `http://localhost:3000/order-success?orderId=${order.id}`,
//         cancel_url: `http://localhost:3000/order-cancelled?orderId=${order.id}`,
//         customer_email: "guest@example.com", // Send to user email (if available)
//         line_items: lineItems,
//         metadata: { orderId: order.id, userId },
//       });

//       res.status(201).json({
//         success: true,
//         message: "Order created successfully! Redirecting to payment...",
//         checkoutUrl: session.url, // 🔥 Redirect user to Stripe payment page
//       });
//     } catch (error) {
//       console.error("🔥 Stripe Checkout Error:", error);
//       return next(new AppError("Failed to create payment session.", 500));
//     }
//   }
// );
