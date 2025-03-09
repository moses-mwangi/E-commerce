import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
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

    const { email, name, password, tradeRole, telephone, country } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await User.create({
      email,
      passwordHash: password,
      name,
      tradeRole,
      telephone,
      country,
    });
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
      // expires: new Date(Date.now() + 2 * 60 * 1000),
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

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
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

  try {
    const decoded = jwt.verify(
      token,
      String(process.env.JWT_SECRET_KEY)
    ) as JwtPayload;

    const currentUser = await User.findOne({ where: { id: decoded.id } });
    if (!currentUser) {
      return res
        .status(401)
        .json({ msg: "The user belonging to this token no longer exists." });
    }

    (req as any).user = currentUser;

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res
        .status(401)
        .json({ msg: "Your session has expired. Please log in again." });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ msg: "Invalid token. Please log in again." });
    } else {
      console.error("JWT Verification Error:", err);
      return res
        .status(500)
        .json({ msg: "An unexpected error occurred. Please try again later." });
    }
  }
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
