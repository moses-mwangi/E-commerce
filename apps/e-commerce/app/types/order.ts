export interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export type Order = {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  shippingAddress: string;
  trackingNumber: string;
  createdAt: string;
  updatedAt: string;
  User: User;
  OrderItems: OrderItem[];
};

type User = {
  createdAt: string;
  id: number;
  name: string;
  email: string;
  telephone: string;
  country: string;
};

type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  Product: Product;
};

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  brand: string;
  images: string[];
  specifications: Specification[];
  discount: number;
  ratings: number;
  reviews: string | null;
  createdAt: string;
  updatedAt: string;
};

type Specification = {
  key: string;
  value: string | string[];
};
