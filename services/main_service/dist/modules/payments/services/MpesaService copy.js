"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpesaService = void 0;
const ordersModel_1 = __importDefault(require("../../order/models/ordersModel"));
const mpesa_node_1 = require("mpesa-node");
class MpesaService {
    constructor(config) {
        this.mpesa = new mpesa_node_1.Mpesa(config);
    }
    async generateToken() {
        try {
            const auth = await this.mpesa.auth();
            return auth.access_token;
        }
        catch (error) {
            throw new Error("Failed to generate M-Pesa token");
        }
    }
    async initiateSTKPush(phone, amount, orderId, callbackUrl) {
        try {
            const token = await this.generateToken();
            const response = await this.mpesa.lipaNaMpesaOnline({
                BusinessShortCode: this.mpesa.config.lipaNaMpesaShortCode,
                Amount: amount,
                PartyA: phone,
                PartyB: this.mpesa.config.lipaNaMpesaShortCode,
                PhoneNumber: phone,
                CallBackURL: callbackUrl,
                AccountReference: orderId,
                TransactionDesc: `Payment for Order ${orderId}`,
            });
            return response;
        }
        catch (error) {
            console.error("STK Push Error:", error);
            throw error;
        }
    }
    async handleCallback(callbackData) {
        // Process the callback from M-Pesa
        // Update your database using Sequelize
        const resultCode = callbackData.Body.stkCallback.ResultCode;
        const isSuccessful = resultCode === "0";
        if (isSuccessful) {
            const metadata = callbackData.Body.stkCallback.CallbackMetadata.Item;
            const amount = metadata.find((item) => item.Name === "Amount").Value;
            const mpesaReceiptNumber = metadata.find((item) => item.Name === "MpesaReceiptNumber").Value;
            const phoneNumber = metadata.find((item) => item.Name === "PhoneNumber").Value;
            // Update your order in the database
            // Example using Sequelize:
            await ordersModel_1.default.update({
                paymentStatus: "completed",
                mpesaReceiptNumber,
                paymentMethod: "mpesa",
            }, { where: { id: 1 } });
        }
        return { success: isSuccessful };
    }
}
exports.MpesaService = MpesaService;
