import { getChannel } from "../config/rabbitmq/connection";

export const sendOrderCreated = async (orderData: any) => {
  const channel = await getChannel();
  const exchangeName = "order_exchange";
  const routingKey = "order.created";

  await channel.assertExchange(exchangeName, "direct", { durable: true });

  const message = Buffer.from(JSON.stringify(orderData));

  channel.publish(exchangeName, routingKey, message);
  console.log("Order sent to queue");
};
