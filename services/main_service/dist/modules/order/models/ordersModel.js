"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_database_1 = __importDefault(require("../../../shared/config/pg_database"));
const userMode_1 = __importDefault(require("../../users/models/userMode"));
const productModels_1 = __importDefault(require("../../product/models/product/productModels"));
const itemOrder_1 = __importDefault(require("./itemOrder"));
class Order extends sequelize_1.Model {
    static findOneAndUpdate(arg0, arg1, arg2) {
        throw new Error("Method not implemented.");
    }
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    totalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "shipped", "delivered", "cancelled"),
        defaultValue: "pending",
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.ENUM("paid", "unpaid", "failed"),
        defaultValue: "unpaid",
    },
    shippingAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    trackingNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
}, {
    sequelize: pg_database_1.default,
    tableName: "orders",
    modelName: "Order",
});
userMode_1.default.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(userMode_1.default, { foreignKey: "userId" });
Order.hasMany(itemOrder_1.default, { foreignKey: "orderId", onDelete: "CASCADE" });
itemOrder_1.default.belongsTo(Order, { foreignKey: "orderId" });
productModels_1.default.hasMany(itemOrder_1.default, { foreignKey: "productId", onDelete: "CASCADE" });
itemOrder_1.default.belongsTo(productModels_1.default, { foreignKey: "productId" });
exports.default = Order;
