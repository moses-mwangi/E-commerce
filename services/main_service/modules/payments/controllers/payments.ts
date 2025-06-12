import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import Payment from "../models/paymentModel";
import User from "../../users/models/userMode";
import Order from "../../order/models/ordersModel";
import OrderItem from "../../order/models/itemOrder";
import Product from "../../product/models/product/productModels";
import ProductImage from "../../product/models/product/productImageModel";

export const getPayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await Payment.findAll({
      attributes: ["paymentMethod", "currency", "amount", "createdAt"],
      include: [
        {
          model: Order,
          as: "order",
          attributes: [
            "totalPrice",
            "trackingNumber",
            "streetAddress",
            "country",
            "county",
            "city",
            "phoneNumber",
            "postcode",
            "apartment",
          ],
          include: [
            {
              model: OrderItem,
              attributes: ["quantity", "price"],
              include: [
                {
                  model: Product,
                  attributes: ["name", "price"],
                  as: "Product",
                  include: [
                    {
                      model: ProductImage,
                      as: "productImages",
                      attributes: ["url", "isMain"],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { model: User, as: "user", attributes: ["name", "email"] },
      ],
    });

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.status(200).json({ msg: "success", payment });
  }
);

export const deletePayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payment = await Payment.destroy({ where: { id: Number(id) } });

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.status(200).json({ msg: "success", payment });
  }
);
