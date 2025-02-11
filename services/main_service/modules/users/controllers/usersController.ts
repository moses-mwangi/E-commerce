import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import User from "../models/userMode";
import { body } from "express-validator";

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
