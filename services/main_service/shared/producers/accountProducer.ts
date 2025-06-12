import { getChannel } from "../config/rabbitmq/connection";

export const sendUserCreated = async (user: any) => {
  const channel = await getChannel();
  const exchangeName = "account_exchange";
  const routingKey = "account.created";

  await channel.assertExchange(exchangeName, "direct", { durable: true });

  const message = Buffer.from(JSON.stringify(user));

  channel.publish(exchangeName, routingKey, message);
  console.log("User sent to queue");
};
