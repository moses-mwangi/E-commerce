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
  public paymentMethod!: string;
  public mpesaReceiptNumber!: string;

  public shippingAddress!: string;
  public trackingNumber?: string;
  paymentDetails: any;

  public apartment!: string;
  public city!: string;
  public country!: string;
  public county!: string;
  public email!: string;
  public fullName!: string;
  public phoneNumber!: string;
  public postcode!: string;
  public streetAddress!: string;
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
      type: DataTypes.ENUM(
        "cancelled",
        "pending",
        "confirmed",
        "shipped",
        "delivered"
      ),
      defaultValue: "pending",
    },
    paymentStatus: {
      type: DataTypes.ENUM("paid", "unpaid", "failed"),
      defaultValue: "unpaid",
    },
    paymentMethod: { type: DataTypes.STRING, allowNull: true },
    mpesaReceiptNumber: { type: DataTypes.STRING, allowNull: true },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    streetAddress: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    county: { type: DataTypes.STRING, allowNull: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    fullName: { type: DataTypes.STRING, allowNull: true },
    postcode: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    apartment: { type: DataTypes.STRING, allowNull: true },
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
