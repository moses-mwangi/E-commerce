import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/utils/catchSync";
import Payment from "../models/paymentModel";

export const getPayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await Payment.findAll();

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.status(200).json({ msg: "success", payment });
  }
);
