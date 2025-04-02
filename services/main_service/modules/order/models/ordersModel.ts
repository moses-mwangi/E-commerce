import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/config/pg_database";
import User from "../../users/models/userMode";
import Product from "../../product/models/product/productModels";
import OrderItem from "./itemOrder";

class Order extends Model {
  static findOneAndUpdate(
    arg0: { paymentIntentId: any },
    arg1: {
      status: string;
      paymentStatus: string;
      paymentDetails: { id: any };
    },
    arg2: { new: boolean }
  ) {
    throw new Error("Method not implemented.");
  }
  public id!: number;
  public userId!: number;
  public orderId!: number;
  public totalPrice!: number;
  public status!: "pending" | "shipped" | "delivered" | "cancelled";
  public paymentStatus!: "paid" | "unpaid" | "failed";
  public shippingAddress!: string;
  public trackingNumber?: string;
  paymentDetails: any;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
    paymentStatus: {
      type: DataTypes.ENUM("paid", "unpaid", "failed"),
      defaultValue: "unpaid",
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize,
    tableName: "orders",
    modelName: "Order",
  }
);

User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId", onDelete: "CASCADE" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

export default Order;
