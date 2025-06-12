import { sendEmail } from "../../../modules/users/utils/email";
import { getChannel } from "../../config/rabbitmq/connection";
import { accountEmailMessage } from "../../utils/emailUtil";

export const consumerAccountEvents = async () => {
  const channel = await getChannel();
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

      sendEmail({
        email: user.email,
        subject: `🌟 Welcome to KivaMall Global Online Store! Your Account Is Ready`,
        html: accountEmailMessage(user),
      });

      channel.ack(msg);
    }
  });

  console.log("Consumer is waiting for order events...");
};
