import { Product } from "./products";

export interface FavState {
  items: {
    product: Product;
  }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
