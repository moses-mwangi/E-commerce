import express from "express";
import { MpesaController } from "../controllers/M_PesaPaymentController";
import {
  handleWebhook,
  createPaymentIntent,
} from "../controllers/CardPaymentController";
import bodyParser from "body-parser";

const router = express.Router();

//////  M_PESA PAYMENTS
const mpesaController = new MpesaController();
router.post("/mpesa", (req, res) => mpesaController.initiatePayment(req, res));
router.post("/mpesa/callback", (req, res) =>
  mpesaController.handleCallback(req, res)
);

////// CARD PAYMENTS
router.route("/card").post(createPaymentIntent);
router.route("/card/webhook").post(
  bodyParser.raw({ type: "application/json" }),
  (req, res, next) => {
    (req as any).rawBody = req.body.toString("utf8");
    next();
  },
  handleWebhook
);

///// PAYPAL PAYMENTS
router.route("/paypal").post();

export default router;
