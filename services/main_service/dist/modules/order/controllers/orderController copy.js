"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const catchSync_1 = __importDefault(require("../../../shared/utils/catchSync"));
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const productModels_1 = __importDefault(require("../../product/models/product/productModels"));
const ordersModel_1 = __importDefault(require("../models/ordersModel"));
const itemOrder_1 = __importDefault(require("../models/itemOrder"));
const pg_database_1 = __importDefault(require("../../../shared/config/pg_database"));
exports.createOrder = (0, catchSync_1.default)(async (req, res, next) => {
    // apartment,
    // city,
    // country,
    // county,
    // email,
    // fullName,
    // orderItems,
    // paymentStatus,
    // phoneNumber,
    // postcode,
    // status,
    // streetAddress,
    // totalPrice,
    // userId,
    const { userId, orderItems: products, shippingAddress, 
    // paymentMethodId,
    country, county, streetAddress, phoneNumber, city, email, fullName, postcode, apartment, trackingNumber, totalPrice, } = req.body;
    console.log("BODY", req.body);
    if (!userId || !products || products.length === 0 || !shippingAddress) {
        return next(new AppError_1.default("Missing required fields", 400));
    }
    const transaction = await pg_database_1.default.transaction(); // Start transaction
    try {
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
        const order = await ordersModel_1.default.create({
            userId,
            totalPrice,
            shippingAddress,
            status: "pending",
            paymentStatus: "unpaid",
            trackingNumber,
            country,
            county,
            streetAddress,
            phoneNumber,
            city,
            email,
            fullName,
            postcode,
            apartment,
            // totalPrice,
        }, { transaction });
        const orderItems = products.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: productMap.get(item.productId)?.price || 0,
        }));
        await itemOrder_1.default.bulkCreate(orderItems, { transaction });
        await transaction.commit();
        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order,
        });
    }
    catch (error) {
        await transaction.rollback();
        next(error);
    }
});
// let paymentStatus: "paid" | "unpaid" | "failed" = "unpaid";
// let stripePaymentId: string | null = null;
// if (paymentMethodId) {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(totalPrice * 100),
//       currency: "usd",
//       payment_method: paymentMethodId,
//       confirm: true,
//     });
//     stripePaymentId = paymentIntent.id;
//     paymentStatus = "paid";
//   } catch (error: any) {
//     console.error("🔥 Stripe Payment Error:", error.message);
//     throw new AppError("Payment failed, please try again.", 400);
//   }
// }
// Create order
