import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import User from "../models/userMode";
import { body } from "express-validator";
import AppError from "../../../shared/utils/AppError";
import { generateToken } from "../utils/jwt";
import { sendOrderCreated } from "../../../shared/producers/orderProducer";
import { sendEmail } from "../utils/email";
import { sendPaymentCreated } from "../../../shared/producers/paymentProducer";
import { paymentEmailMessage } from "../../../shared/utils/emailUtil";

const validUserSignInput = [
  body("name").notEmpty().isString().withMessage("Name is required"),
  body("email").notEmpty().isEmail().withMessage("Valid email is required"),
  body("passwordHash")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),
];

export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll({ where: { emailVerified: true } });
    if (!users) {
      return next(new AppError("No user found", 404));
    }

    res.status(200).json({
      length: users.length,
      msg: "users succesfully fetched",
      users,
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { email, passwordHash, ...updates } = req.body;

    if (email) {
      return next(new AppError("You can't update Email", 400));
    }

    if (Object.keys(updates).length === 0) {
      return next(new AppError("Nothing to update", 400));
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return next(new AppError("No user with that Id", 404));
    }

    const updatedUser = await user.update(updates);

    const token = generateToken({
      id: updatedUser.id,
      email: updatedUser.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "User successfully updated",
      updatedUser,
      token,
    });
  }
);

export const testing = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const savedPay = {
      paymentMethod: "card",
      currency: "KES",
      amount: 89,
      createdAt: "2025-06-05T07:10:14.690Z",
      order: {
        id: 2,
        totalPrice: 89,
        trackingNumber: "3537b1cb-abf8-41f5-b172-fe05ec42ad5f",
        streetAddress: "ruiru",
        country: "Kenya",
        county: "Uasin Gishu County",
        city: "Nairobi",
        phoneNumber: "0725672675",
        postcode: "33333",
        apartment: "Three unit complex",
        OrderItems: [
          {
            quantity: 1,
            price: 89,
            Product: {
              name: "Men's Premium Slim Fit Denim Jacket",
              price: 89,
              productImages: [
                {
                  url: "https://res.cloudinary.com/dijocmuzg/image/upload/v1747317507/ecommerce-product/image_1747317504808_0gsia5.png",
                  isMain: true,
                },
                {
                  url: "https://res.cloudinary.com/dijocmuzg/image/upload/v1747317507/ecommerce-product/image_1747317504820_0mfvk.png",
                  isMain: false,
                },
                {
                  url: "https://res.cloudinary.com/dijocmuzg/image/upload/v1747317508/ecommerce-product/image_1747317504821_1lrgq.png",
                  isMain: false,
                },
                {
                  url: "https://res.cloudinary.com/dijocmuzg/image/upload/v1747317514/ecommerce-product/image_1747317504823_uilbwe.png",
                  isMain: false,
                },
                {
                  url: "https://res.cloudinary.com/dijocmuzg/image/upload/v1747317510/ecommerce-product/image_1747317504825_qe69mo.png",
                  isMain: false,
                },
                {
                  url: "https://res.cloudinary.com/dijocmuzg/image/upload/v1747317508/ecommerce-product/image_1747317504826_as7rszd.png",
                  isMain: false,
                },
              ],
            },
          },
        ],
      },
      user: {
        name: "Moses Mwangi",
        email: "moses.mwangi.me@gmail.com",
      },
    };

    // await sendPaymentCreated(savedPay);

    sendEmail({
      email: savedPay.user.email,
      subject: `✅ Payment Received! Order #${savedPay.order.trackingNumber} Confirmation`,
      html: paymentEmailMessage(savedPay),
    });

    res.status(200).json({
      msg: "Testing RabbitMq",
    });
  }
);
