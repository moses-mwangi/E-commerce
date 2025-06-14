import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import AppError from "../../../shared/utils/AppError";
import Product from "../../product/models/product/productModels";
import Order from "../models/ordersModel";
import OrderItem from "../models/itemOrder";

import User from "../../users/models/userMode";
import ProductImage from "../../product/models/product/productImageModel";
import sequelize from "../../../shared/config/pg_database";
import { v1 as uuidv1 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import { sendOrderCreated } from "../../../shared/producers/orderProducer";

function generateTrackingNumber() {
  const timeComponent = Date.now();
  const randomSuffix = Math.floor(Math.random() * 90000) + 10000;
  const uuidComponent = uuidv4();
  return `${uuidComponent}-${timeComponent}-${randomSuffix}`;
}

export const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      userId,
      orderItems: products,
      shippingAddress,
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
    } = req.body;

    // const trackingNumber = `${uuidv1()}-${Date.now()}`;
    // const trackingNumber = generateTrackingNumber();

    if (!userId || !products || products.length === 0) {
      return next(new AppError("Missing required fields", 400));
    }

    const transaction = await sequelize.transaction();

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

      const selectedOrder = await Order.findByPk(order?.id, {
        include: [
          {
            model: User,
            attributes: ["id", "name", "email", "telephone"],
          },
        ],
      });

      res.status(201).json({
        success: true,
        message: "Order placed successfully!",
        order,
      });
      await sendOrderCreated(selectedOrder);
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
        // {
        //   model: Payment,
        //   as: "",
        //   attributes: { exclude: ["status"] },
        // },
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

export const updateOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      country,
      fullName,
      email,
      phoneNumber,
      streetAddress,
      apartment,
      postcode,
      city,
      county,
    } = req.body;

    const order = await Order.findByPk(req.params.id);
    if (!order) return next(new AppError("Order not found", 404));

    const updatedOrder = await order.update({
      country,
      fullName,
      email,
      phoneNumber,
      streetAddress,
      apartment,
      postcode,
      city,
      county,
    });

    res.status(200).json({
      success: true,
      message: "Order updated successfully!",
      order: updatedOrder,
    });
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
