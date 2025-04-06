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
import sequelize from "../../../shared/config/pg_database";
import User from "../../users/models/userMode";

export const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // apartment,
    // city,
    // country,
    // county,
    // email,
    // fullName,
    // orderItems,
    // paymentStatus,
    // phoneNumber,
    // postcode,
    // status,
    // streetAddress,
    // totalPrice,
    // userId,

    const {
      userId,
      orderItems: products,
      shippingAddress,
      // paymentMethodId,
      country,
      county,
      streetAddress,
      phoneNumber,
      city,
      email,
      fullName,
      postcode,
      apartment,
      trackingNumber,
      totalPrice,
    } = req.body;
    console.log("BODY", req.body);

    if (!userId || !products || products.length === 0 || !shippingAddress) {
      return next(new AppError("Missing required fields", 400));
    }

    const transaction = await sequelize.transaction(); // Start transaction

    try {
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

      const order = await Order.create(
        {
          userId,
          totalPrice,
          shippingAddress,
          status: "pending",
          paymentStatus: "unpaid",
          trackingNumber,
          country,
          county,
          streetAddress,
          phoneNumber,
          city,
          email,
          fullName,
          postcode,
          apartment,
          // totalPrice,
        },
        { transaction }
      );

      const orderItems = products.map(
        (item: { productId: number; quantity: any }) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: productMap.get(item.productId)?.price || 0,
        })
      );

      await OrderItem.bulkCreate(orderItems, { transaction });

      await transaction.commit();

      res.status(201).json({
        success: true,
        message: "Order placed successfully!",
        order,
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }
);

// let paymentStatus: "paid" | "unpaid" | "failed" = "unpaid";
// let stripePaymentId: string | null = null;

// if (paymentMethodId) {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(totalPrice * 100),
//       currency: "usd",
//       payment_method: paymentMethodId,
//       confirm: true,
//     });

//     stripePaymentId = paymentIntent.id;
//     paymentStatus = "paid";
//   } catch (error: any) {
//     console.error("🔥 Stripe Payment Error:", error.message);
//     throw new AppError("Payment failed, please try again.", 400);
//   }
// }

// Create order
