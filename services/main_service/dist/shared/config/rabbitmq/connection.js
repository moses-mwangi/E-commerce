"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
exports.getChannel = getChannel;
const amqplib_1 = require("amqplib");
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
let connection = null;
let channel = null;
const defaultConfig = {
    reconnectDelay: 5000,
    maxRetries: 3,
};
async function getConnection(config = defaultConfig) {
    if (connection) {
        return connection;
    }
    let retries = 0;
    const connectWithRetry = async () => {
        try {
            const conn = await (0, amqplib_1.connect)(RABBITMQ_URL);
            console.log("RabbitMQ connected successfully");
            conn.on("close", () => {
                console.log("RabbitMQ connection closed");
                connection = null;
                channel = null;
                if (retries < (config?.maxRetries ?? defaultConfig?.maxRetries)) {
                    setTimeout(() => connectWithRetry(), config.reconnectDelay ?? defaultConfig.reconnectDelay);
                }
            });
            conn.on("error", (err) => {
                console.error("RabbitMQ connection error:", err);
                if (retries < (config.maxRetries ?? defaultConfig?.maxRetries)) {
                    setTimeout(() => connectWithRetry(), config.reconnectDelay ?? defaultConfig.reconnectDelay);
                }
            });
            connection = conn;
            return conn;
        }
        catch (err) {
            retries++;
            console.error(`Connection attempt ${retries} failed:`, err);
            if (retries >= (config.maxRetries ?? defaultConfig.maxRetries)) {
                throw err;
            }
            await new Promise((resolve) => setTimeout(resolve, config.reconnectDelay ?? defaultConfig.reconnectDelay));
            return connectWithRetry();
        }
    };
    return connectWithRetry();
}
async function getChannel() {
    if (channel)
        return channel;
    const conn = await getConnection();
    channel = await conn.createChannel();
    channel.on("close", () => {
        console.log("RabbitMQ channel closed");
        channel = null;
    });
    channel.on("error", (err) => {
        console.error("RabbitMQ channel error:", err);
        channel = null;
    });
    return channel;
}
// export async function setupQueue(
//   queue: string,
//   options: Options.AssertQueue = { durable: true }
// ): Promise<{ queue: string; messageCount: number; consumerCount: number }> {
//   const ch = await getChannel();
//   return ch.assertQueue(queue, options);
// }
// export async function publishMessage(
//   queue: string,
//   message: object,
//   options: Options.Publish = { persistent: true }
// ): Promise<boolean> {
//   const ch = await getChannel();
//   return ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)), options);
// }
// export async function consumeMessages(
//   queue: string,
//   handler: (msg: ConsumeMessage | null) => void,
//   options: Options.Consume = { noAck: false }
// ): Promise<{ consumerTag: string }> {
//   const ch = await getChannel();
//   return ch.consume(queue, handler, options);
// }
