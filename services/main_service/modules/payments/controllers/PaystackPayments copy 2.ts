// import { Request, Response } from "express";
// import paystack from "paystack";
// import crypto from "crypto";
// import Order from "../../order/models/ordersModel";
// import Payment from "../models/paymentModel";

// const paystackClient = paystack(process.env.PAYSTACK_SECRET_KEY!);

// interface PaymentInitializationRequest {
//   email: string;
//   amount: number;
//   orderId: number;
//   userId: number;
//   currency?: string;
//   channels?: string[]; //////  ['card', 'bank', 'ussd', 'qr', 'mobile_money']
//   metadata?: Record<string, any>;
// }

// interface PaymentVerificationRequest {
//   reference: string;
// }

// interface WebhookData {
//   id: number;
//   domain: string;
//   status: "success" | "failed";
//   reference: string;
//   amount: number;
//   gateway_response: string;
//   channel?: "card" | "bank" | "ussd" | "qr" | "mobile_money" | "bank_transfer";
//   metadata: {
//     order_id: string;
//     transaction_id?: string;
//     custom_fields?: Array<{
//       display_name: string;
//       variable_name: string;
//       value: string;
//     }>;
//   };
//   // ADD OTHER FIELDS
// }

// export const initializePayment = async (
//   // req: Request<{}, {}, PaymentInitializationRequest>,
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const {
//       email,
//       name,
//       amount,
//       orderId,
//       userId,
//       currency = "NGN",
//       channels,
//       metadata = {},
//     } = req.body;

//     const order = await Order.findByPk(orderId);
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     const transaction = await Payment.create({
//       orderId,
//       userId: userId,
//       amount,
//       currency,
//       status: "initiated",
//       paymentMethod: "bank_transfer",
//       reference: `order_${orderId}_${Date.now()}`,
//     });

//     console.log(transaction);
//     console.log(transaction.reference);
//     console.log(transaction.orderId);
//     //order_1_1747825363117
//     const paymentData = {
//       name,
//       email,
//       amount: amount * 100,
//       // reference: transaction.reference,
//       reference: "order_1_1747825363117",
//       callback_url: `${process.env.FRONTEND_URL}/payment/verify?orderId=${orderId}`,
//       currency,
//       channels, // Allow specific payment channels
//       metadata: {
//         ...metadata,
//         order_id: orderId.toString(),
//         transaction_id: transaction.id.toString(),
//         custom_fields: [
//           {
//             display_name: "Order ID",
//             variable_name: "order_id",
//             value: orderId.toString(),
//           },
//           {
//             display_name: "User ID",
//             variable_name: "user_id",
//             value: userId.toString(),
//           },
//           {
//             display_name: "Transaction ID",
//             variable_name: "transaction_id",
//             value: transaction.id.toString(),
//           },
//         ],
//       },
//     };

//     const payment = await paystackClient.transaction.initialize(paymentData);

//     await transaction.update({
//       paymentReference: payment.data.reference,
//       authorizationUrl: payment.data.authorization_url,
//     });

//     res.json({
//       authorization_url: payment.data.authorization_url,
//       access_code: payment.data.access_code,
//       reference: payment.data.reference,
//       transactionId: transaction.id,
//     });
//   } catch (error) {
//     console.error("Payment initialization error:", error);
//     res.status(500).json({ error: "Payment initialization failed" });
//   }
// };

// export const verifyPayment = async (
//   req: Request<{}, {}, {}, PaymentVerificationRequest>,
//   res: Response
// ) => {
//   try {
//     const { reference } = req.query;

//     const verification = await paystackClient.transaction.verify(reference);
//     console.log(verification.data.gateway_response);
//     if (verification.data.status === "success") {
//       const { metadata, gateway_response, channel } = verification.data;

//       await Payment.update(
//         {
//           status: "success",
//           paymentMethod: channel,
//           gatewayResponse: gateway_response,
//         },
//         { where: { reference } }
//       );

//       await Order.update(
//         {
//           status: "paid",
//           paymentMethod: channel,
//           paymentReference: reference,
//         },
//         { where: { id: metadata.order_id } }
//       );

//       return res.json({
//         success: true,
//         data: verification.data,
//         orderId: Number(metadata.order_id),
//       });
//     }

//     res.json({
//       success: false,
//       message: "Payment not successful",
//       data: verification.data,
//     });
//   } catch (error) {
//     console.error("Payment verification error:", error);
//     res.status(500).json({ error: "Payment verification failed" });
//   }
// };

// /////////////// WEBHOOK HANDLERS /////////////
// export const paystackWebhook = async (req: Request, res: Response) => {
//   const hash = crypto
//     .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
//     .update(JSON.stringify(req.body))
//     .digest("hex");

//   if (hash !== req.headers["x-paystack-signature"]) {
//     return res.status(400).send("Invalid signature");
//   }

//   const event = req.body.event;
//   const data: WebhookData = req.body.data;

//   try {
//     switch (event) {
//       case "charge.success":
//         await handleSuccessfulCharge(data);
//         break;
//       case "transfer.success":
//         await handleSuccessfulTransfer(data);
//         break;
//       case "charge.failed":

//       case "transfer.failed":
//         await handleFailedPayment(data);
//         break;
//       case "refund.processed":
//         await handleRefundProcessed(data);
//         break;

//       ///// I CAN ADD MORE
//     }

//     res.status(200).send("Webhook received");
//   } catch (error) {
//     console.error("Webhook processing error:", error);
//     res.status(500).send("Webhook processing failed");
//   }
// };

// async function handleSuccessfulCharge(data: WebhookData) {
//   const { reference, metadata, channel, gateway_response } = data;

//   await Payment.update(
//     {
//       status: "success",
//       paymentMethod: channel,
//       gatewayResponse: gateway_response || "Payment successful",
//     },
//     { where: { reference } }
//   );

//   await Order.update(
//     {
//       status: "paid",
//       paymentMethod: channel,
//       paymentReference: reference,
//     },
//     { where: { id: metadata.order_id } }
//   );

//   ////// 1. SEND PAYMENT CONFIRMATION EMAIL
//   ////// 2. UPDATE INVENTORY
//   ////// 3. TRIGGER ORDER FULFILLMENT
// }

// async function handleSuccessfulTransfer(data: WebhookData) {
//   // For bank transfer payments
//   const { reference, metadata } = data;

//   await Payment.update(
//     {
//       status: "success",
//       paymentMethod: "bank_transfer",
//       gatewayResponse: "Bank transfer completed",
//     },
//     { where: { reference } }
//   );

//   await Order.update(
//     {
//       status: "paid",
//       paymentMethod: "bank_transfer",
//       paymentReference: reference,
//     },
//     { where: { id: metadata.order_id } }
//   );
// }

// async function handleFailedPayment(data: WebhookData) {
//   const { reference, metadata, gateway_response } = data;

//   await Payment.update(
//     {
//       status: "failed",
//       gatewayResponse: gateway_response || "Payment failed",
//     },
//     { where: { reference } }
//   );

//   await Order.update(
//     {
//       status: "payment_failed",
//       paymentReference: reference,
//     },
//     { where: { id: metadata.order_id } }
//   );

//   ///// 1. NOTIFY CUSTOMER
//   ///// 2. POSSIBLY RETRY THE PAYMENTS
// }

// async function handleRefundProcessed(data: WebhookData) {
//   const { reference, metadata } = data;

//   await Payment.update(
//     {
//       status: "refunded",
//       gatewayResponse: "Payment refunded",
//     },
//     { where: { reference } }
//   );

//   await Order.update(
//     {
//       status: "refunded",
//     },
//     { where: { id: metadata.order_id } }
//   );

//   /////   1. NOTIFYING MY CUSTOMER
//   /////   2. UPDATE INVENTORY
// }
