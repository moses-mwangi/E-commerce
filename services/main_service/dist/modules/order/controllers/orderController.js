"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const catchSync_1 = __importDefault(require("../../../shared/utils/catchSync"));
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const productModels_1 = __importDefault(require("../../product/models/product/productModels"));
const ordersModel_1 = __importDefault(require("../models/ordersModel"));
const itemOrder_1 = __importDefault(require("../models/itemOrder"));
const payment_1 = __importDefault(require("../../payments/models/payment"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const userMode_1 = __importDefault(require("../../users/models/userMode"));
const productImageModel_1 = __importDefault(require("../../product/models/product/productImageModel"));
const pg_database_1 = __importDefault(require("../../../shared/config/pg_database"));
const paymentService_1 = require("../../payments/services/paymentService");
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    // apiVersion: "2025-01-27.acacia",
    apiVersion: "2025-02-24.acacia",
    timeout: 20000,
});
exports.createOrder = (0, catchSync_1.default)(async (req, res, next) => {
    const { userId, orderItems: products, shippingAddress, paymentMethod, // 'mpesa', 'card', 'paypal', 'bank'
    paymentDetails, // Method-specific details
    trackingNumber, } = req.body;
    if (!userId ||
        !products ||
        products.length === 0 ||
        !shippingAddress ||
        !paymentMethod) {
        return next(new AppError_1.default("Missing required fields", 400));
    }
    const transaction = await pg_database_1.default.transaction();
    try {
        // Calculate total price (same as before)
        const productIds = products.map((item) => item.productId);
        const productList = await productModels_1.default.findAll({ where: { id: productIds } });
        const productMap = new Map(productList.map((product) => [product.id, product]));
        let totalPrice = 0;
        for (const item of products) {
            const product = productMap.get(item.productId);
            if (!product)
                throw new AppError_1.default(`Product with ID ${item.productId} not found`, 404);
            totalPrice += product.price * item.quantity;
        }
        // Handle different payment methods
        let paymentStatus = "pending";
        let paymentReference = null;
        let paymentResponse = null;
        switch (paymentMethod) {
            case "card":
                try {
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: Math.round(totalPrice * 100),
                        currency: "usd",
                        payment_method: paymentDetails.paymentMethodId,
                        confirm: true,
                        metadata: {
                            userId,
                            orderDescription: `Order for user ${userId}`,
                        },
                    });
                    paymentReference = paymentIntent.id;
                    paymentStatus =
                        paymentIntent.status === "succeeded" ? "paid" : "pending";
                    paymentResponse = paymentIntent;
                }
                catch (error) {
                    throw new AppError_1.default(`Card payment failed: ${error.message}`, 400);
                }
                break;
            case "mpesa":
                try {
                    // This would call your M-Pesa API integration
                    const mpesaResponse = await (0, paymentService_1.initiateMpesaPayment)({
                        phone: paymentDetails.phone,
                        amount: totalPrice,
                        reference: `ORDER_${Date.now()}`,
                        description: `Payment for order`,
                    });
                    paymentReference = mpesaResponse.transactionId;
                    paymentStatus = "pending"; // M-Pesa payments are usually pending until confirmed
                    paymentResponse = mpesaResponse;
                }
                catch (error) {
                    throw new AppError_1.default(`M-Pesa payment failed: ${error.message}`, 400);
                }
                break;
            case "paypal":
                try {
                    const paypalOrder = await (0, paymentService_1.createPayPalOrder)(totalPrice, "USD", {
                        userId,
                        items: products.map((item) => ({
                            name: productMap.get(item.productId)?.name || "Product",
                            quantity: item.quantity,
                            price: productMap.get(item.productId)?.price || 0,
                        })),
                    });
                    paymentReference = paypalOrder.id;
                    paymentStatus =
                        paypalOrder.status === "COMPLETED" ? "paid" : "pending";
                    paymentResponse = paypalOrder;
                }
                catch (error) {
                    throw new AppError_1.default(`PayPal payment failed: ${error.message}`, 400);
                }
                break;
            case "bank":
                try {
                    // Generate bank transfer reference
                    paymentReference = `BANK_${Date.now()}`;
                    paymentStatus = "pending"; // Bank transfers are usually pending until confirmed
                    paymentResponse = {
                        accountNumber: "YOUR_BANK_ACCOUNT",
                        accountName: "YOUR_BUSINESS_NAME",
                        reference: paymentReference,
                        amount: totalPrice,
                        currency: "USD",
                    };
                }
                catch (error) {
                    throw new AppError_1.default(`Bank transfer setup failed: ${error.message}`, 400);
                }
                break;
            default:
                throw new AppError_1.default("Invalid payment method", 400);
        }
        // Create order
        const order = await ordersModel_1.default.create({
            userId,
            totalPrice,
            shippingAddress,
            status: "pending",
            paymentStatus,
            paymentMethod,
            paymentReference,
            trackingNumber,
        }, { transaction });
        // Create order items
        const orderItems = products.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: productMap.get(item.productId)?.price || 0,
        }));
        await itemOrder_1.default.bulkCreate(orderItems, { transaction });
        // Save payment details
        await payment_1.default.create({
            userId,
            orderId: order.id,
            paymentMethod,
            reference: paymentReference,
            amount: totalPrice,
            currency: "usd",
            status: paymentStatus,
            details: paymentResponse,
        }, { transaction });
        await transaction.commit();
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
            payment: {
                method: paymentMethod,
                status: paymentStatus,
                reference: paymentReference,
                nextAction: paymentMethod === "mpesa" ? "confirm_payment" : null,
                details: paymentResponse,
            },
        });
    }
    catch (error) {
        await transaction.rollback();
        next(error);
    }
});
exports.getAllOrders = (0, catchSync_1.default)(async (req, res, next) => {
    const orders = await ordersModel_1.default.findAll({
        include: [
            {
                model: userMode_1.default,
                attributes: [
                    "id",
                    "name",
                    "email",
                    "telephone",
                    "country",
                    "createdAt",
                ],
            },
            {
                model: itemOrder_1.default,
                include: [
                    {
                        model: productModels_1.default,
                        as: "Product",
                        include: [{ model: productImageModel_1.default, as: "productImages" }],
                    },
                ],
            },
        ],
    });
    if (!orders || orders.length === 0) {
        return res.status(200).json({ success: "faill", orders: [] });
    }
    res.status(200).json({ success: true, orders });
});
exports.getOrderById = (0, catchSync_1.default)(async (req, res, next) => {
    const order = await ordersModel_1.default.findByPk(req.params.id, {
        include: [{ model: itemOrder_1.default, include: [productModels_1.default] }],
    });
    if (!order)
        return next(new AppError_1.default("Order not found", 404));
    res.status(200).json({ success: true, order });
});
exports.updateOrderStatus = (0, catchSync_1.default)(async (req, res, next) => {
    const { status } = req.body;
    const order = await ordersModel_1.default.findByPk(req.params.id);
    if (!order)
        return next(new AppError_1.default("Order not found", 404));
    order.status = status;
    await order.save();
    res
        .status(200)
        .json({ success: true, message: "Order updated successfully!", order });
});
exports.deleteOrder = (0, catchSync_1.default)(async (req, res, next) => {
    const order = await ordersModel_1.default.findByPk(req.params.id);
    if (!order)
        return next(new AppError_1.default("Order not found", 404));
    await order.destroy();
    res
        .status(200)
        .json({ success: true, message: "Order deleted successfully!" });
});
// export const createOrder = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { userId, products, shippingAddress, paymentMethod } = req.body;
//     if (!userId || !products || products.length === 0 || !shippingAddress) {
//       return next(new AppError("Missing required fields", 400));
//     }
//     let totalPrice = 0;
//     for (const item of products) {
//       const product = await Product.findByPk(item.productId);
//       if (!product) {
//         return next(
//           new AppError(`Product with ID ${item.productId} not found`, 404)
//         );
//       }
//       totalPrice += product.price * item.quantity;
//     }
//     let paymentStatus: "paid" | "unpaid" | "failed" | "pending" = "unpaid";
//     let stripePaymentId: string | null = null;
//     let paymentUrl: string | null = null;
//     if (paymentMethod === "stripe") {
//       try {
//         const session = await stripe.checkout.sessions.create({
//           payment_method_types: ["card"],
//           line_items: products.map((item: any) => ({
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: `Product ${item.productId}`,
//               },
//               unit_amount: Math.round(products.price * 100),
//             },
//             quantity: item.quantity,
//           })),
//           mode: "payment",
//           success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//           cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
//           metadata: {
//             userId,
//             shippingAddress: JSON.stringify(shippingAddress),
//           },
//         });
//         stripePaymentId = session.id;
//         paymentStatus = "pending";
//         paymentUrl = session.url!;
//       } catch (error: any) {
//         console.error("🔥 Stripe Checkout Error:", error.message);
//         return next(
//           new AppError("Stripe checkout failed, please try again.", 400)
//         );
//       }
//     } else if (paymentMethod === "paypal") {
//       // TODO: Implement PayPal Checkout Logic
//       return next(
//         new AppError("PayPal integration is not yet implemented.", 400)
//       );
//     }
//     const order = await Order.create({
//       userId,
//       totalPrice,
//       shippingAddress,
//       status: "pending",
//       paymentStatus,
//     });
//     for (const item of products) {
//       await OrderItem.create({
//         orderId: order.id,
//         productId: item.productId,
//         quantity: item.quantity,
//         price: (await Product.findByPk(item.productId))?.price || 0,
//       });
//     }
//     if (stripePaymentId) {
//       await Payment.create({
//         userId,
//         orderId: order.id,
//         stripePaymentId,
//         amount: totalPrice,
//         currency: "usd",
//         status: paymentStatus,
//       });
//     }
//     res.status(201).json({
//       success: true,
//       message: "Order created successfully! Redirect to complete payment.",
//       order,
//       paymentUrl,
//     });
//   }
// );
