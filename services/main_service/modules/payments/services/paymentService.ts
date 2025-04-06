import axios from "axios";
// import { stripe } from "../config/stripe";
import paypal from "@paypal/checkout-server-sdk";

const generateMpesaPassword = () => {
  const shortcode = process.env.MPESA_SHORTCODE; // Your M-Pesa Business Shortcode
  const passkey = process.env.MPESA_PASSKEY; // Your M-Pesa Passkey
  const timestamp = getCurrentTimestamp(); // Get the current timestamp

  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
    "base64"
  );
  return password;
};

const getCurrentTimestamp = () => {
  return new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);
};

export { generateMpesaPassword, getCurrentTimestamp };

// Stripe is already set up in your original code

// M-Pesa Service (example using Daraja API)
export const initiateMpesaPayment = async (params: {
  phone: string;
  amount: number;
  reference: string;
  description: string;
}) => {
  // This is a simplified example - you'll need to implement according to Safaricom's API
  const authResponse = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      auth: {
        username: process.env.MPESA_CONSUMER_KEY!,
        password: process.env.MPESA_CONSUMER_SECRET!,
      },
    }
  );

  const stkPushResponse = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
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
    },
    {
      headers: {
        Authorization: `Bearer ${authResponse.data.access_token}`,
      },
    }
  );

  return {
    transactionId: stkPushResponse.data.CheckoutRequestID,
    response: stkPushResponse.data,
  };
};

// PayPal Service
const paypalClient = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID!,
    process.env.PAYPAL_CLIENT_SECRET!
  )
);

export const createPayPalOrder = async (
  amount: number,
  currency: string,
  metadata: any
) => {
  const request = new paypal.orders.OrdersCreateRequest();
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

// Bank Transfer - just generates reference info
export const generateBankTransferDetails = (
  amount: number,
  currency: string
) => {
  return {
    accountNumber: process.env.BANK_ACCOUNT_NUMBER!,
    accountName: process.env.BANK_ACCOUNT_NAME!,
    bankName: process.env.BANK_NAME!,
    branch: process.env.BANK_BRANCH!,
    reference: `BANK_${Date.now()}`,
    amount,
    currency,
  };
};
