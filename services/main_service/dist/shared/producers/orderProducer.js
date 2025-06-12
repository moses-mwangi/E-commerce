"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderCreated = void 0;
const connection_1 = require("../config/rabbitmq/connection");
const sendOrderCreated = async (orderData) => {
    const channel = await (0, connection_1.getChannel)();
    const exchangeName = "order_exchange";
    const routingKey = "order.created";
    await channel.assertExchange(exchangeName, "direct", { durable: true });
    const message = Buffer.from(JSON.stringify(orderData));
    channel.publish(exchangeName, routingKey, message);
    console.log("Order sent to queue");
};
exports.sendOrderCreated = sendOrderCreated;
