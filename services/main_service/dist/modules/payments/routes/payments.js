"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const M_PesaPaymentController_1 = require("../controllers/M_PesaPaymentController");
const router = express_1.default.Router();
const mpesaController = new M_PesaPaymentController_1.MpesaController();
router.post("/mpesa", (req, res) => mpesaController.initiatePayment(req, res));
router.post("/mpesa/callback", (req, res) => mpesaController.handleCallback(req, res));
exports.default = router;
