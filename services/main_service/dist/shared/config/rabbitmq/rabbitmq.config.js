"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
const amqplib_1 = require("amqplib");
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
let connection = null;
let channel = null;
async function getConnection() {
    if (!connection) {
        connection = await (0, amqplib_1.connect)(RABBITMQ_URL);
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
