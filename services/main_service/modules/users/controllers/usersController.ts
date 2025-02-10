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

export const signInUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, passwordHash } = req.body;

    const user = await User.create({ name, email, passwordHash });
    res
      .status(200)
      .json({ msg: "The user has being succesfully sign in", user });
  }
);
