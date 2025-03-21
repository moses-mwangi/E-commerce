import app from "./app";
import dotenv from "dotenv";
import sequelize from "./shared/config/pg_database";
import setupAssociations from "./modules/order/models/associations";
import Order from "./modules/order/models/ordersModel";
import OrderItem from "./modules/order/models/itemOrder";
import User from "./modules/users/models/userMode";
import categoryAssociations from "./modules/product/models/associations";
import { Sequelize } from "sequelize";

setupAssociations();
categoryAssociations();

dotenv.config();
const url = String(process.env.PG_DATABASE_URL);

const sequelizec = new Sequelize(url, {
  logging: console.log, // Logs SQL queries
});

dotenv.config({ path: "./.env" });

//////////////////////////////// updating Order and Order_item /////////////////

// Promise.all([Order.sync({ alter: true }), OrderItem.sync({ alter: true })])
// Promise.all([User.sync({ alter: true })])
// Promise.all([User.sync({ force: true })])
// Promise.all([
//   Order.destroy({ where: {},, truncate: true }),
//   OrderItem.destroy({ where: {} }),
//   User.destroy({ where: {} }),
// ])
// .then(() => {
//   console.log("✅ Order & OrderItem tables updated!");
//   console.log("✅ User tables updated!");
// })
// .catch((error) => {
//   console.error("❌ Error syncing Order & OrderItem tables:", error);
// });

//////////////////////////////////////////////////////////////////////////////////

const pg_connect = async () => {
  try {
    sequelize.authenticate();
    console.log("The PostgreSQL database has successfully connected");
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true }); /////does not delete data
  } catch (err) {
    console.log("Unable to connect to database", err);
  }
};

pg_connect();

const port = Number(process.env.PORT);
app.listen(port, "127.0.0.1", () => {
  console.log(`Server running at ${port}`);
});
