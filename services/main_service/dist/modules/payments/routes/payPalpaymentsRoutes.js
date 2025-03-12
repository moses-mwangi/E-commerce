"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
paypal_rest_sdk_1.default.configure({
    mode: "sandbox",
    client_id: String(process.env.PAYPAL_CLIENT_ID),
    client_secret: String(process.env.PAYPAL_CLIENT_SECRET),
});
router.post("/paypal-payment", (req, res) => {
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
    paypal_rest_sdk_1.default.payment.create(payment, (error, payment) => {
        if (error)
            return res.status(400).json({ success: false, error });
        const approvalUrl = payment.links?.find((link) => link.rel === "approval_url")?.href;
        if (!approvalUrl)
            return res
                .status(400)
                .json({ success: false, message: "No approval URL found" });
        res.json({ success: true, approvalUrl });
    });
});
router.get("/paypal-success", (req, res) => {
    const { paymentId, PayerID } = req.query;
    if (!paymentId || !PayerID) {
        res
            .status(400)
            .json({ success: false, message: "Missing payment details" });
    }
    const execute_payment_json = {
        payer_id: PayerID,
    };
    paypal_rest_sdk_1.default.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if (error)
            return res.status(400).json({ success: false, error });
        res.json({ success: true, payment });
    });
});
exports.default = router;
