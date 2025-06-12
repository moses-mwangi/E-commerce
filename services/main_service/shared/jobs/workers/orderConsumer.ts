import { sendEmail } from "../../../modules/users/utils/email";
import { getChannel } from "../../config/rabbitmq/connection";
import { orderEmailMessage } from "../../utils/emailUtil";

export const consumeOrderEvents = async () => {
  const channel = await getChannel();
  const exchange = "order_exchange";
  const routingKey = "order.created";

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
        subject: "🛍️ Complete Your Payment to Confirm Your Order",
        html: orderEmailMessage(order),
      });

      channel.ack(msg);
    }
  });

  console.log("Consumer is waiting for order events...");
};
