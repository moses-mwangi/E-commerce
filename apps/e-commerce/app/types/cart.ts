export interface CartState {
  items: {
    product: any;
    productId: number;
    quantity: number;
  }[]; // Products and their quantities
  totalPrice: number; // Total cart price
  status: "idle" | "loading" | "succeeded" | "failed"; // Request status
  error: string | null; // Error message, if any
}
