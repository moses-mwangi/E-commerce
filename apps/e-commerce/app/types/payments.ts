// types/payment.ts
export interface Order {
  id: string;
  totalAmount: number;
  // other order fields
}

export interface User {
  email: string;
  // other user fields
}

export interface PaymentInitializationResponse {
  authorization_url?: string;
  error?: string;
}
