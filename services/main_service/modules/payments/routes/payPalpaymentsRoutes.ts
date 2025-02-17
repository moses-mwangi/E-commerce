import express, { Request, Response } from "express";
import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

paypal.configure({
  mode: "sandbox",
  client_id: String(process.env.PAYPAL_CLIENT_ID),
  client_secret: String(process.env.PAYPAL_CLIENT_SECRET),
});

router.post("/paypal-payment", (req: Request, res: Response) => {
  const { amount, currency } = req.body;
  const payment = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    transactions: [{ amount: { total: amount, currency } }],
    redirect_urls: {
      return_url: "http://localhost:3000/paypal-success",
      cancel_url: "http://localhost:3000/paypal-cancel",
    },
  };

  paypal.payment.create(payment, (error, payment) => {
    if (error) return res.status(400).json({ success: false, error });

    const approvalUrl = payment.links?.find(
      (link) => link.rel === "approval_url"
    )?.href;
    if (!approvalUrl)
      return res
        .status(400)
        .json({ success: false, message: "No approval URL found" });

    res.json({ success: true, approvalUrl });
  });
});

router.get("/paypal-success", (req: Request, res: Response) => {
  const { paymentId, PayerID } = req.query;

  if (!paymentId || !PayerID) {
    res
      .status(400)
      .json({ success: false, message: "Missing payment details" });
  }

  const execute_payment_json = {
    payer_id: PayerID,
  };

  type ExecuteRequest = any;
  paypal.payment.execute(
    paymentId as string,
    execute_payment_json as ExecuteRequest,
    (error, payment) => {
      if (error) return res.status(400).json({ success: false, error });

      res.json({ success: true, payment });
    }
  );
});

export default router;
