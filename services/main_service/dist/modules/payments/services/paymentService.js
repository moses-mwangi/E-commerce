"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBankTransferDetails = exports.createPayPalOrder = exports.initiateMpesaPayment = exports.getCurrentTimestamp = exports.generateMpesaPassword = void 0;
const axios_1 = __importDefault(require("axios"));
// import { stripe } from "../config/stripe";
const checkout_server_sdk_1 = __importDefault(require("@paypal/checkout-server-sdk"));
const generateMpesaPassword = () => {
    const shortcode = process.env.MPESA_SHORTCODE; // Your M-Pesa Business Shortcode
    const passkey = process.env.MPESA_PASSKEY; // Your M-Pesa Passkey
    const timestamp = getCurrentTimestamp(); // Get the current timestamp
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
    return password;
};
exports.generateMpesaPassword = generateMpesaPassword;
const getCurrentTimestamp = () => {
    return new Date()
        .toISOString()
        .replace(/[-T:.Z]/g, "")
        .slice(0, 14);
};
exports.getCurrentTimestamp = getCurrentTimestamp;
// Stripe is already set up in your original code
// M-Pesa Service (example using Daraja API)
const initiateMpesaPayment = async (params) => {
    // This is a simplified example - you'll need to implement according to Safaricom's API
    const authResponse = await axios_1.default.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
        auth: {
            username: process.env.MPESA_CONSUMER_KEY,
            password: process.env.MPESA_CONSUMER_SECRET,
        },
    });
    const stkPushResponse = await axios_1.default.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: generateMpesaPassword(),
        Timestamp: getCurrentTimestamp(),
        TransactionType: "CustomerPayBillOnline",
        Amount: params.amount,
        PartyA: params.phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: params.phone,
        CallBackURL: `${process.env.BASE_URL}/api/payments/mpesa-callback`,
        AccountReference: params.reference,
        TransactionDesc: params.description,
    }, {
        headers: {
            Authorization: `Bearer ${authResponse.data.access_token}`,
        },
    });
    return {
        transactionId: stkPushResponse.data.CheckoutRequestID,
        response: stkPushResponse.data,
    };
};
exports.initiateMpesaPayment = initiateMpesaPayment;
// PayPal Service
const paypalClient = new checkout_server_sdk_1.default.core.PayPalHttpClient(new checkout_server_sdk_1.default.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET));
const createPayPalOrder = async (amount, currency, metadata) => {
    const request = new checkout_server_sdk_1.default.orders.OrdersCreateRequest();
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: currency,
                    value: amount.toFixed(2),
                },
                description: `Order from ${metadata.userId}`,
                custom_id: `ORDER_${Date.now()}`,
            },
        ],
        application_context: {
            brand_name: "Your Store",
            return_url: `${process.env.FRONTEND_URL}/order-success`,
            cancel_url: `${process.env.FRONTEND_URL}/order-canceled`,
        },
    });
    const response = await paypalClient.execute(request);
    return response.result;
};
exports.createPayPalOrder = createPayPalOrder;
// Bank Transfer - just generates reference info
const generateBankTransferDetails = (amount, currency) => {
    return {
        accountNumber: process.env.BANK_ACCOUNT_NUMBER,
        accountName: process.env.BANK_ACCOUNT_NAME,
        bankName: process.env.BANK_NAME,
        branch: process.env.BANK_BRANCH,
        reference: `BANK_${Date.now()}`,
        amount,
        currency,
    };
};
exports.generateBankTransferDetails = generateBankTransferDetails;
