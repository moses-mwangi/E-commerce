import { connect, Connection, Channel } from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

let connection: Connection | null = null;
let channel: Channel | null = null;

export async function getConnection(): Promise<Connection> {
  if (!connection) {
    connection = await connect(RABBITMQ_URL);
    connection?.on("close", () => {
      console.log("RabbitMQ connection closed");
      connection = null;
      channel = null;
    });
    connection?.on("error", (err) => {
      console.error("RabbitMQ connection error:", err);
      connection = null;
      channel = null;
    });
  }
  return connection;
}
