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
import sequelize from "../../../shared/config/pg_database";
import {
  createPayPalOrder,
  initiateMpesaPayment,
} from "../../payments/services/paymentService";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // apiVersion: "2025-01-27.acacia",
  apiVersion: "2025-02-24.acacia" as any,
  timeout: 20000,
});

export const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      userId,
      orderItems: products,
      shippingAddress,
      paymentMethod, // 'mpesa', 'card', 'paypal', 'bank'
      paymentDetails, // Method-specific details
      trackingNumber,
    } = req.body;

    if (
      !userId ||
      !products ||
      products.length === 0 ||
      !shippingAddress ||
      !paymentMethod
    ) {
      return next(new AppError("Missing required fields", 400));
    }

    const transaction = await sequelize.transaction();

    try {
      // Calculate total price (same as before)
      const productIds = products.map(
        (item: { productId: any }) => item.productId
      );
      const productList = await Product.findAll({ where: { id: productIds } });
      const productMap = new Map(
        productList.map((product) => [product.id, product])
      );

      let totalPrice = 0;
      for (const item of products) {
        const product = productMap.get(item.productId);
        if (!product)
          throw new AppError(
            `Product with ID ${item.productId} not found`,
            404
          );
        totalPrice += product.price * item.quantity;
      }

      // Handle different payment methods
      let paymentStatus: "paid" | "pending" | "failed" = "pending";
      let paymentReference: string | null = null;
      let paymentResponse: any = null;

      switch (paymentMethod) {
        case "card":
          try {
            const paymentIntent = await stripe.paymentIntents.create({
              amount: Math.round(totalPrice * 100),
              currency: "usd",
              payment_method: paymentDetails.paymentMethodId,
              confirm: true,
              metadata: {
                userId,
                orderDescription: `Order for user ${userId}`,
              },
            });

            paymentReference = paymentIntent.id;
            paymentStatus =
              paymentIntent.status === "succeeded" ? "paid" : "pending";
            paymentResponse = paymentIntent;
          } catch (error: any) {
            throw new AppError(`Card payment failed: ${error.message}`, 400);
          }
          break;

        case "mpesa":
          try {
            // This would call your M-Pesa API integration
            const mpesaResponse = await initiateMpesaPayment({
              phone: paymentDetails.phone,
              amount: totalPrice,
              reference: `ORDER_${Date.now()}`,
              description: `Payment for order`,
            });

            paymentReference = mpesaResponse.transactionId;
            paymentStatus = "pending"; // M-Pesa payments are usually pending until confirmed
            paymentResponse = mpesaResponse;
          } catch (error: any) {
            throw new AppError(`M-Pesa payment failed: ${error.message}`, 400);
          }
          break;

        case "paypal":
          try {
            const paypalOrder = await createPayPalOrder(totalPrice, "USD", {
              userId,
              items: products.map(
                (item: { productId: number; quantity: any }) => ({
                  name: productMap.get(item.productId)?.name || "Product",
                  quantity: item.quantity,
                  price: productMap.get(item.productId)?.price || 0,
                })
              ),
            });

            paymentReference = paypalOrder.id;
            paymentStatus =
              paypalOrder.status === "COMPLETED" ? "paid" : "pending";
            paymentResponse = paypalOrder;
          } catch (error: any) {
            throw new AppError(`PayPal payment failed: ${error.message}`, 400);
          }
          break;

        case "bank":
          try {
            // Generate bank transfer reference
            paymentReference = `BANK_${Date.now()}`;
            paymentStatus = "pending"; // Bank transfers are usually pending until confirmed
            paymentResponse = {
              accountNumber: "YOUR_BANK_ACCOUNT",
              accountName: "YOUR_BUSINESS_NAME",
              reference: paymentReference,
              amount: totalPrice,
              currency: "USD",
            };
          } catch (error: any) {
            throw new AppError(
              `Bank transfer setup failed: ${error.message}`,
              400
            );
          }
          break;

        default:
          throw new AppError("Invalid payment method", 400);
      }

      // Create order
      const order = await Order.create(
        {
          userId,
          totalPrice,
          shippingAddress,
          status: "pending",
          paymentStatus,
          paymentMethod,
          paymentReference,
          trackingNumber,
        },
        { transaction }
      );

      // Create order items
      const orderItems = products.map(
        (item: { productId: number; quantity: any }) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: productMap.get(item.productId)?.price || 0,
        })
      );

      await OrderItem.bulkCreate(orderItems, { transaction });

      // Save payment details
      await Payment.create(
        {
          userId,
          orderId: order.id,
          paymentMethod,
          reference: paymentReference,
          amount: totalPrice,
          currency: "usd",
          status: paymentStatus,
          details: paymentResponse,
        },
        { transaction }
      );

      await transaction.commit();

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
        payment: {
          method: paymentMethod,
          status: paymentStatus,
          reference: paymentReference,
          nextAction: paymentMethod === "mpesa" ? "confirm_payment" : null,
          details: paymentResponse,
        },
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }
);
export const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: [
            "id",
            "name",
            "email",
            "telephone",
            "country",
            "createdAt",
          ],
        },
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              as: "Product",
              include: [{ model: ProductImage, as: "productImages" }],
            },
          ],
        },
      ],
    });

    if (!orders || orders.length === 0) {
      return res.status(200).json({ success: "faill", orders: [] });
    }

    res.status(200).json({ success: true, orders });
  }
);

export const getOrderById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, include: [Product] }],
    });
    if (!order) return next(new AppError("Order not found", 404));

    res.status(200).json({ success: true, order });
  }
);

export const updateOrderStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;

    const order = await Order.findByPk(req.params.id);
    if (!order) return next(new AppError("Order not found", 404));

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order updated successfully!", order });
  }
);

export const deleteOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) return next(new AppError("Order not found", 404));

    await order.destroy();
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully!" });
  }
);

// export const createOrder = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { userId, products, shippingAddress, paymentMethod } = req.body;

//     if (!userId || !products || products.length === 0 || !shippingAddress) {
//       return next(new AppError("Missing required fields", 400));
//     }

//     let totalPrice = 0;

//     for (const item of products) {
//       const product = await Product.findByPk(item.productId);
//       if (!product) {
//         return next(
//           new AppError(`Product with ID ${item.productId} not found`, 404)
//         );
//       }
//       totalPrice += product.price * item.quantity;
//     }

//     let paymentStatus: "paid" | "unpaid" | "failed" | "pending" = "unpaid";
//     let stripePaymentId: string | null = null;
//     let paymentUrl: string | null = null;

//     if (paymentMethod === "stripe") {
//       try {
//         const session = await stripe.checkout.sessions.create({
//           payment_method_types: ["card"],
//           line_items: products.map((item: any) => ({
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: `Product ${item.productId}`,
//               },
//               unit_amount: Math.round(products.price * 100),
//             },
//             quantity: item.quantity,
//           })),
//           mode: "payment",
//           success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//           cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
//           metadata: {
//             userId,
//             shippingAddress: JSON.stringify(shippingAddress),
//           },
//         });

//         stripePaymentId = session.id;
//         paymentStatus = "pending";
//         paymentUrl = session.url!;
//       } catch (error: any) {
//         console.error("🔥 Stripe Checkout Error:", error.message);
//         return next(
//           new AppError("Stripe checkout failed, please try again.", 400)
//         );
//       }
//     } else if (paymentMethod === "paypal") {
//       // TODO: Implement PayPal Checkout Logic
//       return next(
//         new AppError("PayPal integration is not yet implemented.", 400)
//       );
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

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully! Redirect to complete payment.",
//       order,
//       paymentUrl,
//     });
//   }
// );
