export interface Product {
  id: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  stock: number;
  specifications: {
    [key: string]: string;
  };
  features: string[];
  colors?: string[];
  sizes?: string[];
}
