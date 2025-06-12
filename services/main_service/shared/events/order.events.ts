export const ORDER_EXCHANGE = "order_exchange";
export const ORDER_CREATED_ROUTING_KEY = "order.created";

export interface OrderCreatedEvent {
  orderId: string;
  userId: string;
  total: number;
  items: { productId: string; quantity: number }[];
}

////////////  JUST FOR REFFERENCE
