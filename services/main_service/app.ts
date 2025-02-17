import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";

import passport from "../main_service/shared/config/passport";
import { authRouter, userRouter } from "./modules/users";
import { orderRouter } from "./modules/order";
import { stripeRouter, paypalRouter, webhookRouter } from "./modules/payments";
import { productRouter } from "./modules/product";
import globalErrorHandler from "./shared/middleware/GlobalErrorHandler";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:3000",
  "https://api.publicapis.org/entries",
  "http://localhost:3001",
  "http://localhost:8000",
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked CORS request from origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // This allows cookies to be sent and received if needed
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log("Testing middleware");
  // console.log("Middleware cookie:", req.cookies.jwt);
  // console.log("current users:", req.user);

  next();
});

// // Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,

    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 60 * 1000,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.use("/api/payment", paypalRouter);
app.use("/api/payment", stripeRouter);
app.use("/api/webhooks", webhookRouter);

//globalError
app.use(globalErrorHandler);

export default app;
