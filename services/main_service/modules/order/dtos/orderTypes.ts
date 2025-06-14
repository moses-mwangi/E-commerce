export type OrderTypes = {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  statusHistory: {
    pending: Date;
    shipped: Date;
    delivered: Date;
    cancelled: Date;
    confirmed: Date;
  };
  shippingAddress: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  User: Partial<User>;
  OrderItems: OrderItem[];
  currency: string;

  country: string;
  county: string;
  streetAddress: string;
  phoneNumber: string;
  city: string;
  email: string;
  fullName: string;
  postcode: string;
  apartment: string;
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
  productImages: Images[];
  discount: number;
  ratings: number;
  reviews: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface Images {
  id: number;
  url: string;
  isMain: boolean;
  productId: number;
}

type User = {
  createdAt: string;
  id: number;
  name: string;
  email: string;
  telephone: string;
  country: string;
};

type Specification = {
  key: string;
  value: string | string[];
};
