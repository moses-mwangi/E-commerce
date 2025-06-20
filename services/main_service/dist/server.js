"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const orderAssociations_1 = __importDefault(require("./modules/order/models/orderAssociations"));
const categoryAssociations_1 = __importDefault(require("./modules/product/models/category/categoryAssociations"));
const productAssociation_1 = __importDefault(require("./modules/product/models/product/productAssociation"));
const reviewAssociation_1 = __importDefault(require("./modules/reviews/models/reviewModel/reviewAssociation"));
const pg_database_1 = __importDefault(require("./shared/config/pg_database"));
const orderConsumer_1 = require("./shared/jobs/workers/orderConsumer");
const paymentAssociation_1 = __importDefault(require("./modules/payments/models/paymentAssociation"));
const accountConsumer_1 = require("./shared/jobs/workers/accountConsumer");
const paymentConsumer_1 = require("./shared/jobs/workers/paymentConsumer");
const isProduction = process.env.NODE_ENV === "production";
(0, orderAssociations_1.default)();
(0, categoryAssociations_1.default)();
(0, productAssociation_1.default)();
(0, reviewAssociation_1.default)();
(0, paymentAssociation_1.default)();
dotenv_1.default.config();
dotenv_1.default.config({ path: "./.env" });
process.on("uncaughtException", (err) => {
    console.error("Handling Exceptional Error. Shutting down...💥💥💥💥");
    console.error(err.name, err.message);
    process.exit(1);
});
const pg_connect = async () => {
    try {
        pg_database_1.default.authenticate();
        console.log("The PostgreSQL database has successfully connected");
        if (process.env.NODE_ENV === "production") {
            // sequelize.sync({ alter: true });
        }
        // await sequelize.sync({ force: true });
        // await Payment.sync({ force: true });
        // await sequelize.sync({ alter: true });
        // await Product.sync({ alter: true });
        // Review.destroy({ where: {}, truncate: true }),
        // Review.destroy({ where: {} });
    }
    catch (err) {
        console.log("Unable to connect to database", err);
    }
};
pg_connect();
if (process.env.NODE_ENV !== "production") {
    (0, orderConsumer_1.consumeOrderEvents)();
    (0, accountConsumer_1.consumerAccountEvents)();
    (0, paymentConsumer_1.consumerPaymentEvents)();
}
// const numCpu = cpus().length + 6;
// if (!isProduction && cluster.isPrimary) {
//   console.log(`Primary process ${process.pid} is running`);
//   for (let i = 0; i < numCpu; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(
//       `Worker ${worker.process.pid} exit with code ${code}, signal ${signal}`
//     );
//     cluster.fork();
//   });
// } else {
//   const workerIndex = cluster.worker?.id;
// const port = Number(process.env.PORT) + Number(workerIndex);
// const port = Number(process.env.PORT);
// const server = app.listen(port, "127.0.0.1", () => {
//   console.log(`Server running at ${port}`);
// });
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
// }
app_1.default.get("/health", (req, res) => {
    res.status(200).send("OK");
});
const port = Number(process.env.PORT) || 8000;
const server = app_1.default.listen(port, "0.0.0.0", () => {
    console.log(`Server running at ${port}`);
});
server.keepAliveTimeout = 60 * 1000;
server.headersTimeout = 65 * 1000;
process.on("unhandledRejection", (err) => {
    console.error("🔥 Unhandled Rejection");
    console.error(err);
    process.exit(1);
});
// #Moses.mwangi.me=7662
