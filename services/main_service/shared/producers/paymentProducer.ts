import { getChannel } from "../config/rabbitmq/connection";

export const sendPaymentCreated = async (user: any) => {
  const channel = await getChannel();
  const exchange = "payment_exchange";
  const routingKey = "payment.created";

  await channel.assertExchange(exchange, "direct", { durable: true });

  const message = Buffer.from(JSON.stringify(user));

  channel.publish(exchange, routingKey, message);
  console.log("Payment sent to queue");
};
