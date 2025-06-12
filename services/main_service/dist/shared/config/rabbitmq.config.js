"use strict";
// import * as amqp from "amqplib";
// import type { Connection, Channel } from "amqplib";
// export const RABBITMQ_URL =
//   (process.env.RABBITMQ_URL as string) || "amqp://localhost";
// let connection: Connection | null = null;
// export const getRabbitMQConnection = async (): Promise<Connection> => {
//   if (!connection) {
//     connection = await amqp.connect(RABBITMQ_URL);
//     console.log("[RabbitMQ] Connected");
//   }
//   return connection;
// };
// export const getRabbitMQChannel = async (): Promise<Channel> => {
//   const conn = await getRabbitMQConnection();
//   return conn.createChannel();
// };
// import * as amqp from "amqplib";
// export const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
// let connection: amqp.Connection | null = null;
// export const getRabbitMQConnection = async (): Promise<amqp.Connection> => {
//   if (!connection) {
//     connection = await amqp.connect(RABBITMQ_URL);
//     console.log("[RabbitMQ] Connected");
//   }
//   return connection;
// };
// export const getRabbitMQChannel = async (): Promise<amqp.Channel> => {
//   const conn = await getRabbitMQConnection();
//   // return conn.createChannel();
//   return conn.createChannel();
// };
