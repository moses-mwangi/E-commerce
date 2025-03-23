"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_database_1 = __importDefault(require("./shared/config/pg_database"));
const associations_1 = __importDefault(require("./modules/order/models/associations"));
const associations_2 = __importDefault(require("./modules/product/models/associations"));
const os_1 = require("os");
const cluster_1 = __importDefault(require("cluster"));
(0, associations_1.default)();
(0, associations_2.default)();
dotenv_1.default.config();
dotenv_1.default.config({ path: "./.env" });
process.on("uncaughtException", (err) => {
    console.error("Handling Exceptional Error. Shutting down...💥💥💥💥");
    console.error(err.name, err.message);
    process.exit(1);
});
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
const numCpu = (0, os_1.cpus)().length + 6;
if (cluster_1.default.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    for (let i = 0; i < numCpu; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exit with code ${code}, signal ${signal}`);
        cluster_1.default.fork();
    });
}
else {
    const workerIndex = cluster_1.default.worker?.id;
    const port = Number(process.env.PORT) + Number(workerIndex);
    const server = app_1.default.listen(port, "127.0.0.1", () => {
        console.log(`Server running at ${port}`);
    });
    // process.on("unhandledRejection", (err) => {
    //   console.error("Unhandled Rejection. Shutting down...💥💥💥💥");
    //   console.error(err);
    //   server.close(() => {
    //     process.exit(1);
    //   });
    //   app.use((req, res, next) => {
    //     console.log(`Request received by Worker ${process.pid} on port ${port}`);
    //     next();
    //   });
    // });
}
