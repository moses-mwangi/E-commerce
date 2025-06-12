"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerPaymentEvents = void 0;
const email_1 = require("../../../modules/users/utils/email");
const connection_1 = require("../../config/rabbitmq/connection");
const emailUtil_1 = require("../../utils/emailUtil");
const consumerPaymentEvents = async () => {
    const channel = await (0, connection_1.getChannel)();
    const exchange = "payment_exchange";
    const routingKey = "payment.created";
    await channel.assertExchange(exchange, "direct", { durable: true });
    const { queue } = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(queue, exchange, routingKey);
    channel.consume(queue, (msg) => {
        if (msg) {
            const content = msg.content.toString();
            const order = JSON.parse(content);
            console.log("Order received:", order);
            (0, email_1.sendEmail)({
                email: order.email,
                subject: `✅ Payment Received! Order #${order.orderNumber} Confirmation`,
                html: (0, emailUtil_1.paymentEmailMessage)(order),
            });
            channel.ack(msg);
        }
    });
    console.log("Consumer is waiting for order events...");
};
exports.consumerPaymentEvents = consumerPaymentEvents;
