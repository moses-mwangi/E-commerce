import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/config/pg_database";
import Order from "./ordersModel"; // Import Order model
import Product from "../../product/models/productModels"; // Import Product model

class OrderItem extends Model {
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: { model: "orders", key: "id" },
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: { model: "products", key: "id" },
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_items",
    modelName: "OrderItem",
  }
);

// Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
// OrderItem.belongsTo(Order, { foreignKey: "orderId" });

// Product.hasMany(OrderItem, { foreignKey: "productId", onDelete: "CASCADE" });
// OrderItem.belongsTo(Product, { foreignKey: "productId" });

export default OrderItem;
