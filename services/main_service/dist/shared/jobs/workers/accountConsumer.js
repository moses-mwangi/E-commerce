"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerAccountEvents = void 0;
const email_1 = require("../../../modules/users/utils/email");
const connection_1 = require("../../config/rabbitmq/connection");
const emailUtil_1 = require("../../utils/emailUtil");
const consumerAccountEvents = async () => {
    const channel = await (0, connection_1.getChannel)();
    const exchange = "account_exchange";
    const routingKey = "account.created";
    await channel.assertExchange(exchange, "direct", { durable: true });
    const { queue } = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(queue, exchange, routingKey);
    channel.consume(queue, (msg) => {
        if (msg) {
            const content = msg.content.toString();
            const user = JSON.parse(content);
            console.log("User received:", user);
            (0, email_1.sendEmail)({
                email: user.email,
                subject: `🌟 Welcome to KivaMall Global Online Store! Your Account Is Ready`,
                html: (0, emailUtil_1.accountEmailMessage)(user),
            });
            channel.ack(msg);
        }
    });
    console.log("Consumer is waiting for order events...");
};
exports.consumerAccountEvents = consumerAccountEvents;
