"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserCreated = void 0;
const connection_1 = require("../config/rabbitmq/connection");
const sendUserCreated = async (user) => {
    const channel = await (0, connection_1.getChannel)();
    const exchangeName = "account_exchange";
    const routingKey = "account.created";
    await channel.assertExchange(exchangeName, "direct", { durable: true });
    const message = Buffer.from(JSON.stringify(user));
    channel.publish(exchangeName, routingKey, message);
    console.log("User sent to queue");
};
exports.sendUserCreated = sendUserCreated;
