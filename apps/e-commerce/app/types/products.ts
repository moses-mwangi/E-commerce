export interface Product {
  // image: any;
  // rating: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  // rating: number;
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

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  filteredProduct: Product[];
  searchProduct: Product[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  sortProduct: Product[];
  searchTerm: string;
  filterParams: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  sortOrder: "asc" | "desc";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
