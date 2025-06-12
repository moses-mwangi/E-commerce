export interface PaymentTypes {
  paymentMethod: string;
  currency: string;
  amount: number;
  createdAt: string;
  order: OrderTypes;
  user: {
    name: string;
    email: string;
  };
}

export interface OrderTypes {
  id: number;
  totalPrice: number;
  trackingNumber: string;
  streetAddress: string;
  country: string;
  county: string;
  city: string;
  phoneNumber: string;
  postcode: string;
  apartment: string;
  OrderItems: OrderItemTypes[];
}

export interface OrderItemTypes {
  quantity: number;
  price: number;
  Product: ProductTypes;
}

export interface ProductTypes {
  name: string;
  price: number;
  productImages: ProductImageTypes[];
}

export interface ProductImageTypes {
  id?: number;
  url: string;
  isMain: boolean;
  productId?: number;
  createdAt?: string;
  updatedAt?: string;
}
