import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import catchAsync from "../../../shared/utils/catchSync";
import User from "../models/userMode";
import { generateToken } from "../utils/jwt";

export const signInUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await User.create({ email, passwordHash: password, name });
    const token = generateToken({ id: newUser.id, email: newUser.email });

    const cookieOption = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      // httpOnly: true,
    };

    res.cookie("jwt", token, cookieOption);
    (req.session as any).userId = newUser.id;

    res.status(200).json({
      msg: "Token has being succesfully created",
      token,
      session: (req.session as any).userId,
    });
    (req as any).user = newUser;
  }
);

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(202)
        .json({ msg: "Please provide an email and password to log in" });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user || !(await user?.comparePassword(password))) {
      return res.json({
        error: "No user with those credential has being found",
      });
    }

    const token = generateToken({ id: user.id, email: user.email });

    const cookieOption = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      // httpOnly: true,
    };

    res.cookie("jwt", token, cookieOption);
    res.status(200).json({ msg: "User succesfully LogIn", token });

    (req as any).user = user;
  }
);

const jwtVerify = (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const protectJwtUser = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res
      .status(401)
      .json({ msg: "You are not logged in! Please log in to get access." });
  }

  const decoded: any = await jwtVerify(
    token,
    String(process.env.JWT_SECRET_KEY)
  );

  // const currentUser = await User.findById(decoded.id);
  const currentUser = await User.findOne({ where: { id: decoded.id } });
  if (!currentUser) {
    res
      .status(401)
      .json({ msg: "The user belonging to this token no longer exists." });
  }

  (req as any).user = currentUser;

  next();
});

export const protect = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token: string | undefined;

  // Extract token from cookies (since you're using withCredentials)
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // Fallback: Check Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ msg: "You are not logged in! Please log in to get access." });
  }

  const decoded: any = await jwtVerify(
    token,
    String(process.env.JWT_SECRET_KEY)
  );

  // Verify user exists
  const currentUser = await User.findOne({ where: { id: decoded.id } });
  if (!currentUser) {
    return res
      .status(401)
      .json({ msg: "The user belonging to this token no longer exists." });
  }

  // Attach user to the request
  (req as any).user = currentUser;

  next();
});

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;

    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ status: "success", user });
  } catch (err) {
    res.status(400).json({ status: "Fail", err });
    console.log(err);
  }
};
