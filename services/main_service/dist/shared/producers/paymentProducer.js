"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaymentCreated = void 0;
const connection_1 = require("../config/rabbitmq/connection");
const sendPaymentCreated = async (user) => {
    const channel = await (0, connection_1.getChannel)();
    const exchange = "payment_exchange";
    const routingKey = "payment.created";
    await channel.assertExchange(exchange, "direct", { durable: true });
    const message = Buffer.from(JSON.stringify(user));
    channel.publish(exchange, routingKey, message);
    console.log("Payment sent to queue");
};
exports.sendPaymentCreated = sendPaymentCreated;
