"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayments = exports.getPayments = void 0;
const catchSync_1 = __importDefault(require("../../../shared/utils/catchSync"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const userMode_1 = __importDefault(require("../../users/models/userMode"));
const ordersModel_1 = __importDefault(require("../../order/models/ordersModel"));
const itemOrder_1 = __importDefault(require("../../order/models/itemOrder"));
const productModels_1 = __importDefault(require("../../product/models/product/productModels"));
const productImageModel_1 = __importDefault(require("../../product/models/product/productImageModel"));
exports.getPayments = (0, catchSync_1.default)(async (req, res, next) => {
    const payment = await paymentModel_1.default.findAll({
        attributes: ["paymentMethod", "currency", "amount", "createdAt"],
        include: [
            {
                model: ordersModel_1.default,
                as: "order",
                attributes: [
                    "totalPrice",
                    "trackingNumber",
                    "streetAddress",
                    "country",
                    "county",
                    "city",
                    "phoneNumber",
                    "postcode",
                    "apartment",
                ],
                include: [
                    {
                        model: itemOrder_1.default,
                        attributes: ["quantity", "price"],
                        include: [
                            {
                                model: productModels_1.default,
                                attributes: ["name", "price"],
                                as: "Product",
                                include: [
                                    {
                                        model: productImageModel_1.default,
                                        as: "productImages",
                                        attributes: ["url", "isMain"],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            { model: userMode_1.default, as: "user", attributes: ["name", "email"] },
        ],
    });
    if (!payment) {
        return res.status(404).json({ msg: "Payment not found" });
    }
    res.status(200).json({ msg: "success", payment });
});
exports.deletePayments = (0, catchSync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const payment = await paymentModel_1.default.destroy({ where: { id: Number(id) } });
    if (!payment) {
        return res.status(404).json({ msg: "Payment not found" });
    }
    res.status(200).json({ msg: "success", payment });
});
