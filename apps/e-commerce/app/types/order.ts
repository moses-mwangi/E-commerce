// src/app/types/order.ts

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

// orderSlice.ts (Continued)
export interface Order {
  id: number;
  userId: number;
  items: { productId: number; quantity: number; price: number }[];
  totalPrice: number;
  status: "pending" | "completed" | "shipped" | "cancelled";
  trackingInfo: { trackingNumber: string; carrier: string };
  createdAt: string;
}

export interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
