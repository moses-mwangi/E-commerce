export interface FavState {
  items: {
    product: Product;
  }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
export interface Product {
  productImages: Images[];
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  brand: string | null;
  images: string[];
  specifications: Record<string, any> | null;
  discount: number;
  ratings: number;
  reviews: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface Images {
  id: number;
  url: string;
  isMain: boolean;
  productId: number;
}
