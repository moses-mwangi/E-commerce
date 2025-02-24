import Order from "./ordersModel";
import OrderItem from "./itemOrder";
import Product from "../../product/models/productModels";

export default function setupAssociations() {
  Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
  OrderItem.belongsTo(Order, { foreignKey: "orderId" });

  Product.hasMany(OrderItem, { foreignKey: "productId", onDelete: "CASCADE" });
  OrderItem.belongsTo(Product, { foreignKey: "productId" });

  console.log("✅ Sequelize Associations Set Up!");
}
