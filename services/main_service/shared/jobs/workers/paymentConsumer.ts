import { payment } from "paypal-rest-sdk";
import { sendEmail } from "../../../modules/users/utils/email";
import { getChannel } from "../../config/rabbitmq/connection";
import {
  accountEmailMessage,
  paymentEmailMessage,
} from "../../utils/emailUtil";

export const consumerPaymentEvents = async () => {
  const channel = await getChannel();
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

      sendEmail({
        email: order.email,
        subject: `✅ Payment Received! Order #${order.orderNumber} Confirmation`,
        html: paymentEmailMessage(order),
      });

      channel.ack(msg);
    }
  });

  console.log("Consumer is waiting for order events...");
};
