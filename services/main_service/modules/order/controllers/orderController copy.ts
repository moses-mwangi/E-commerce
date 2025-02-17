import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import AppError from "../../../shared/utils/AppError";
import Product from "../../product/models/productModels";
import Order from "../models/ordersModel";
import OrderItem from "../models/itemOrder";
import Payment from "../../payments/models/payment";
import Stripe from "stripe";
import dotenv from "dotenv";
import { Identifier } from "sequelize";
import axios from "axios";
import sequelize from "../../../shared/config/pg_database";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
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

export const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, products, shippingAddress, paymentMethodId } = req.body;

    if (!userId || !products || products.length === 0 || !shippingAddress) {
      return next(new AppError("Missing required fields", 400));
    }

    const transaction = await sequelize.transaction(); // Start transaction

    try {
      // Fetch all products at once to avoid multiple DB calls
      const productIds = products.map(
        (item: { productId: any }) => item.productId
      );
      const productList = await Product.findAll({
        where: { id: productIds },
      });

      const productMap = new Map(
        productList.map((product) => [product.id, product])
      );

      let totalPrice = 0;

      for (const item of products) {
        const product = productMap.get(item.productId);
        if (!product) {
          throw new AppError(
            `Product with ID ${item.productId} not found`,
            404
          );
        }
        totalPrice += product.price * item.quantity;
      }

      let paymentStatus: "paid" | "unpaid" | "failed" = "unpaid";
      let stripePaymentId: string | null = null;

      if (paymentMethodId) {
        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalPrice * 100),
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: true,
          });

          stripePaymentId = paymentIntent.id;
          paymentStatus = "paid";
        } catch (error: any) {
          console.error("🔥 Stripe Payment Error:", error.message);
          throw new AppError("Payment failed, please try again.", 400);
        }
      }

      // Create order
      const order = await Order.create(
        {
          userId,
          totalPrice,
          shippingAddress,
          status: "pending",
          paymentStatus,
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

      // Save payment details if applicable
      if (stripePaymentId) {
        await Payment.create(
          {
            userId,
            orderId: order.id,
            stripePaymentId,
            amount: totalPrice,
            currency: "usd",
            status: paymentStatus,
          },
          { transaction }
        );
      }

      await transaction.commit(); // Commit transaction if everything is successful

      res.status(201).json({
        success: true,
        message: "Order placed successfully!",
        order,
      });
    } catch (error) {
      await transaction.rollback(); // Rollback in case of any failure
      next(error);
    }
  }
);

// 📌 Get All Orders
export const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.findAll({
      include: [{ model: OrderItem, include: [Product] }],
    });

    if (orders.length < 1) {
      // res.status(401).json({ msg: "No order Found" });

      return next(new AppError("No Orders is Found", 401));
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

// 📌 Update Order Status
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

// 📌 Delete Order
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
