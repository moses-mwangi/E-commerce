"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const catchSync_1 = __importDefault(require("../../../shared/utils/catchSync"));
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const productModels_1 = __importDefault(require("../../product/models/productModels"));
const ordersModel_1 = __importDefault(require("../models/ordersModel"));
const itemOrder_1 = __importDefault(require("../models/itemOrder"));
const payment_1 = __importDefault(require("../../payments/models/payment"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_database_1 = __importDefault(require("../../../shared/config/pg_database"));
const userMode_1 = __importDefault(require("../../users/models/userMode"));
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
exports.createOrder = (0, catchSync_1.default)(async (req, res, next) => {
    const { userId, orderItems: products, shippingAddress, paymentMethodId, trackingNumber, } = req.body;
    if (!userId || !products || products.length === 0 || !shippingAddress) {
        return next(new AppError_1.default("Missing required fields", 400));
    }
    const transaction = await pg_database_1.default.transaction(); // Start transaction
    try {
        // Fetch all products at once to avoid multiple DB calls
        const productIds = products.map((item) => item.productId);
        const productList = await productModels_1.default.findAll({
            where: { id: productIds },
        });
        const productMap = new Map(productList.map((product) => [product.id, product]));
        let totalPrice = 0;
        for (const item of products) {
            const product = productMap.get(item.productId);
            if (!product) {
                throw new AppError_1.default(`Product with ID ${item.productId} not found`, 404);
            }
            totalPrice += product.price * item.quantity;
        }
        let paymentStatus = "unpaid";
        let stripePaymentId = null;
        if (paymentMethodId) {
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(totalPrice * 100),
                    currency: "usd",
                    payment_method: paymentMethodId,
                    confirm: true,
                });
                stripePaymentId = paymentIntent.id;
                paymentStatus = "paid";
            }
            catch (error) {
                console.error("🔥 Stripe Payment Error:", error.message);
                throw new AppError_1.default("Payment failed, please try again.", 400);
            }
        }
        // Create order
        const order = await ordersModel_1.default.create({
            userId,
            totalPrice,
            shippingAddress,
            status: "pending",
            paymentStatus,
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
        // Save payment details if applicable
        if (stripePaymentId) {
            await payment_1.default.create({
                userId,
                orderId: order.id,
                stripePaymentId,
                amount: totalPrice,
                currency: "usd",
                status: paymentStatus,
            }, { transaction });
        }
        await transaction.commit(); // Commit transaction if everything is successful
        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order,
        });
    }
    catch (error) {
        await transaction.rollback(); // Rollback in case of any failure
        next(error);
    }
});
// 📌 Get All Orders
exports.getAllOrders = (0, catchSync_1.default)(async (req, res, next) => {
    const orders = await ordersModel_1.default.findAll({
        include: [
            {
                model: userMode_1.default,
                attributes: ["id", "name", "email", "telephone", "country"],
            },
            { model: itemOrder_1.default, include: [productModels_1.default] },
        ],
    });
    if (orders.length < 1) {
        // res.status(401).json({ msg: "No order Found" });
        return next(new AppError_1.default("No Orders is Found", 401));
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
// 📌 Update Order Status
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
// 📌 Delete Order
exports.deleteOrder = (0, catchSync_1.default)(async (req, res, next) => {
    const order = await ordersModel_1.default.findByPk(req.params.id);
    if (!order)
        return next(new AppError_1.default("Order not found", 404));
    await order.destroy();
    res
        .status(200)
        .json({ success: true, message: "Order deleted successfully!" });
});
