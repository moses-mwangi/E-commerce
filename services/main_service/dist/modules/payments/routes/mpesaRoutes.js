"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const M_PesaPaymentController_1 = require("../controllers/M_PesaPaymentController");
const router = express_1.default.Router();
const mpesaController = new M_PesaPaymentController_1.MpesaController();
router.post("/initiate-payment", async (req, res) => {
    try {
        await mpesaController.initiatePayment(req, res);
    }
    catch (error) {
        console.error("Payment initiation error:", error);
        res
            .status(500)
            .json({ error: "Something went wrong during payment initiation." });
    }
});
router.post("/mpesa/callback", async (req, res) => {
    try {
        await mpesaController.handleCallback(req, res);
    }
    catch (error) {
        console.error("Callback error:", error);
        res
            .status(500)
            .json({ error: "Something went wrong while processing the callback." });
    }
});
exports.default = router;
