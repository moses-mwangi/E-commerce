"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.deleteOrder = exports.updateOrderStatus = exports.getOrderById = exports.getAllOrders = void 0;
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
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-01-27.acacia",
    timeout: 20000,
});
// export const createOrder = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { userId, products, shippingAddress, paymentMethodId } = req.body;
//     if (!userId || !products || products.length === 0 || !shippingAddress) {
//       return next(new AppError("Missing required fields", 400));
//     }
//     let totalPrice = 0;
//     for (const item of products) {
//       const product = await Product.findByPk(item.productId);
//       if (!product)
//         return next(
//           new AppError(`Product with ID ${item.productId} not found`, 404)
//         );
//       totalPrice += product.price * item.quantity;
//     }
//     let paymentStatus: "paid" | "unpaid" | "failed" = "unpaid";
//     let stripePaymentId: string | null = null;
//     if (paymentMethodId) {
//       try {
//         const paymentIntent = await stripe.paymentIntents.create({
//           amount: Math.round(totalPrice * 100),
//           currency: "usd",
//           payment_method: paymentMethodId,
//           confirm: true,
//         });
//         stripePaymentId = paymentIntent.id;
//         paymentStatus = "paid";
//       } catch (error: any) {
//         console.error("🔥 Stripe Payment Error:", error.message);
//         return next(new AppError("Payment failed, please try again.", 400));
//       }
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
//     res
//       .status(201)
//       .json({ success: true, message: "Order placed successfully!", order });
//   }
// );
// export const createOrder = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { userId, products, shippingAddress } = req.body;
//     if (!userId || !products || products.length === 0 || !shippingAddress) {
//       return next(new AppError("Missing required fields", 400));
//     }
//     let totalPrice = 0;
//     const lineItems: any[] = [];
//     for (const item of products) {
//       const product = await Product.findByPk(item.productId);
//       if (!product) {
//         return next(
//           new AppError(`Product with ID ${item.productId} not found`, 404)
//         );
//       }
//       totalPrice += product.price * item.quantity;
//       lineItems.push({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: product.name,
//             images: product.images ? [product.images[0]] : [],
//           },
//           unit_amount: Math.round(product.price * 100), // Convert to cents
//         },
//         quantity: item.quantity,
//       });
//     }
//     // Create Order
//     const order = await Order.create({
//       userId,
//       totalPrice,
//       shippingAddress,
//       status: "pending",
//       paymentStatus: "unpaid",
//     });
//     // Store order items
//     for (const item of products) {
//       const product = await Product.findByPk(item.productId);
//       if (product) {
//         await OrderItem.create({
//           orderId: order.id,
//           productId: product.id,
//           quantity: item.quantity,
//           price: product.price,
//         });
//       }
//     }
//     // ✅ Stripe Checkout (Redirect to Payment Page)
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card", "paypal"], // Enable both Stripe & PayPal
//         mode: "payment",
//         success_url: `http://localhost:3000/order-success?orderId=${order.id}`,
//         cancel_url: `http://localhost:3000/order-cancelled?orderId=${order.id}`,
//         customer_email: "guest@example.com", // Send to user email (if available)
//         line_items: lineItems,
//         metadata: { orderId: order.id, userId },
//       });
//       res.status(201).json({
//         success: true,
//         message: "Order created successfully! Redirecting to payment...",
//         checkoutUrl: session.url, // 🔥 Redirect user to Stripe payment page
//       });
//     } catch (error) {
//       console.error("🔥 Stripe Checkout Error:", error);
//       return next(new AppError("Failed to create payment session.", 500));
//     }
//   }
// );
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
exports.createOrder = (0, catchSync_1.default)(async (req, res, next) => {
    const { userId, products, shippingAddress, paymentMethod } = req.body;
    if (!userId || !products || products.length === 0 || !shippingAddress) {
        return next(new AppError_1.default("Missing required fields", 400));
    }
    let totalPrice = 0;
    for (const item of products) {
        const product = await productModels_1.default.findByPk(item.productId);
        if (!product) {
            return next(new AppError_1.default(`Product with ID ${item.productId} not found`, 404));
        }
        totalPrice += product.price * item.quantity;
    }
    let paymentStatus = "unpaid";
    let stripePaymentId = null;
    let paymentUrl = null;
    if (paymentMethod === "stripe") {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: products.map((item) => ({
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Product ${item.productId}`,
                        },
                        unit_amount: Math.round(products.price * 100),
                    },
                    quantity: item.quantity,
                })),
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
                metadata: {
                    userId,
                    shippingAddress: JSON.stringify(shippingAddress),
                },
            });
            stripePaymentId = session.id;
            paymentStatus = "pending";
            paymentUrl = session.url;
        }
        catch (error) {
            console.error("🔥 Stripe Checkout Error:", error.message);
            return next(new AppError_1.default("Stripe checkout failed, please try again.", 400));
        }
    }
    else if (paymentMethod === "paypal") {
        // TODO: Implement PayPal Checkout Logic
        return next(new AppError_1.default("PayPal integration is not yet implemented.", 400));
    }
    const order = await ordersModel_1.default.create({
        userId,
        totalPrice,
        shippingAddress,
        status: "pending",
        paymentStatus,
    });
    for (const item of products) {
        await itemOrder_1.default.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: (await productModels_1.default.findByPk(item.productId))?.price || 0,
        });
    }
    if (stripePaymentId) {
        await payment_1.default.create({
            userId,
            orderId: order.id,
            stripePaymentId,
            amount: totalPrice,
            currency: "usd",
            status: paymentStatus,
        });
    }
    res.status(201).json({
        success: true,
        message: "Order created successfully! Redirect to complete payment.",
        order,
        paymentUrl,
    });
});
