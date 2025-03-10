import app from "./app";
import dotenv from "dotenv";
import sequelize from "./shared/config/pg_database";
import setupAssociations from "./modules/order/models/associations";
import Order from "./modules/order/models/ordersModel";
import OrderItem from "./modules/order/models/itemOrder";
import User from "./modules/users/models/userMode";

setupAssociations();

dotenv.config({ path: "./.env" });

//////////////////////////////// updating Order and Order_item /////////////////

// Promise.all([Order.sync({ alter: true }), OrderItem.sync({ alter: true })])
//   // Promise.all([User.sync({ alter: true })])
//   .then(() => {
//     console.log("✅ Order & OrderItem tables updated!");
//     // console.log("✅ User tables updated!");
//   })
//   .catch((error) => {
//     console.error("❌ Error syncing Order & OrderItem tables:", error);
//   });

//////////////////////////////////////////////////////////////////////////////////

const pg_connect = async () => {
  try {
    sequelize.authenticate();
    console.log("The PostgreSQL database has successfully connected");
    // await sequelize.sync({ force: true });
  } catch (err) {
    console.log("Unable to connect to database", err);
  }
};

pg_connect();

const port = Number(process.env.PORT);
app.listen(port, "127.0.0.1", () => {
  console.log(`Server running at ${port}`);
});
