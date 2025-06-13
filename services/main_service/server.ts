import cluster from "cluster";
import dotenv from "dotenv";
import { cpus } from "os";
import app from "./app";
import orderAssociations from "./modules/order/models/orderAssociations";
import logger from "./modules/payments/utils/logger";
import categoryAssociations from "./modules/product/models/category/categoryAssociations";
import productAssociation from "./modules/product/models/product/productAssociation";
import reviewAssociation from "./modules/reviews/models/reviewModel/reviewAssociation";
import sequelize from "./shared/config/pg_database";
import { consumeOrderEvents } from "./shared/jobs/workers/orderConsumer";
import paymentAssociation from "./modules/payments/models/paymentAssociation";
import { consumerAccountEvents } from "./shared/jobs/workers/accountConsumer";
import { consumerPaymentEvents } from "./shared/jobs/workers/paymentConsumer";

const isProduction = process.env.NODE_ENV === "production";

orderAssociations();
categoryAssociations();
productAssociation();
reviewAssociation();
paymentAssociation();

dotenv.config();
dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.error("Handling Exceptional Error. Shutting down...💥💥💥💥");
  console.error(err.name, err.message);
  process.exit(1);
});

const pg_connect = async () => {
  try {
    sequelize.authenticate();
    console.log("The PostgreSQL database has successfully connected");
    // await sequelize.sync({ force: true });
    // await Payment.sync({ force: true });

    // await sequelize.sync({ alter: true });
    // await Product.sync({ alter: true });

    // Review.destroy({ where: {}, truncate: true }),
    // Review.destroy({ where: {} });
  } catch (err) {
    console.log("Unable to connect to database", err);
  }
};
pg_connect();

if (!isProduction) {
  consumeOrderEvents();
  consumerAccountEvents();
  consumerPaymentEvents();
}

const numCpu = cpus().length + 6;

if (!isProduction && cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} exit with code ${code}, signal ${signal}`
    );
    cluster.fork();
  });
} else {
  const workerIndex = cluster.worker?.id;
  // const port = Number(process.env.PORT) + Number(workerIndex);
  const port = Number(process.env.PORT);

  const server = app.listen(port, "127.0.0.1", () => {
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

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection", {
    promise,
    reason,
  });
});

// #Moses.mwangi.me=7662
