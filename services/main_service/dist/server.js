"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_database_1 = __importDefault(require("./shared/config/pg_database"));
const associations_1 = __importDefault(require("./modules/order/models/associations"));
(0, associations_1.default)();
dotenv_1.default.config({ path: "./.env" });
//////////////////////////////// updating Order and Order_item /////////////////
// Promise.all([Order.sync({ alter: true }), OrderItem.sync({ alter: true })])
// Promise.all([User.sync({ alter: true })])
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
        pg_database_1.default.authenticate();
        console.log("The PostgreSQL database has successfully connected");
        // await sequelize.sync({ force: true });
        // await sequelize.sync({ alter: true }); /////does not delete data
    }
    catch (err) {
        console.log("Unable to connect to database", err);
    }
};
pg_connect();
const port = Number(process.env.PORT);
app_1.default.listen(port, "127.0.0.1", () => {
    console.log(`Server running at ${port}`);
});
