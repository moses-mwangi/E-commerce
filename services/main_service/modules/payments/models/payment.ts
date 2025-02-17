import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/config/pg_database";

class Payment extends Model {
  public id!: number;
  public userId!: number; // Reference to the user who made the payment
  public orderId!: number; // Reference to the order (optional)
  public stripePaymentId!: string;
  public amount!: number;
  public currency!: string;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional if not linked to an order
    },
    stripePaymentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
  }
);

export default Payment;
