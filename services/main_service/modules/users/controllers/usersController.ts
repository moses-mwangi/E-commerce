import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import User from "../models/userMode";
import { body } from "express-validator";
import AppError from "../../../shared/utils/AppError";
import { generateToken } from "../utils/jwt";

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
    const { email, name, passwordHash } = req.body;

    const users = await User.findAll();
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
    const { email, ...updates } = req.body;

    if (email) {
      return next(new AppError("You can't update Email", 400)); // Use 400 for bad request
    }

    if (Object.keys(updates).length === 0) {
      return next(new AppError("Nothing to update", 400));
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return next(new AppError("No user with that Id", 404));
    }

    // Update user with allowed fields
    const updatedUser = await user.update(updates);

    // If you really need a new token, ensure it's used correctly
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
      token, // Only return token if necessary
    });
  }
);

///// $2a$10$kCcEz7uy3v5OU0qsqQisQ./NDYgWlAzggHW2vqMgXUZ/wj1FuwhaW
///// $2a$10$IEl6vq0/HA.uO0qM44MoT..q1A/PhTr5KzRnJwPaiKfwUK9HA75aq
