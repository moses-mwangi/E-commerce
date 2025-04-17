import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import AppError from "../../../shared/utils/AppError";
import Product from "../../product/models/product/productModels";
import Order from "../models/ordersModel";
import OrderItem from "../models/itemOrder";
import Stripe from "stripe";
import dotenv from "dotenv";

import User from "../../users/models/userMode";
import ProductImage from "../../product/models/product/productImageModel";
import sequelize from "../../../shared/config/pg_database";

export const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    // const order = await Order.findByPk(req.params.id, {
    //   include: [{ model: OrderItem, include: [Product] }],
    // });

    const order = await Order.findByPk(req.params.id, {
      include: [
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
