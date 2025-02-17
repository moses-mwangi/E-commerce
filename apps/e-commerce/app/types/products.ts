export interface Product {
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
  searchTerm: string; // ✅ Store search input
  filterParams: {
    // ✅ Store applied filters
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  sortOrder: "asc" | "desc"; // ✅ Keep track of sorting order
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// export interface ProductState {
//   products: Product[];
//   selectedProduct: Product | null;
//   filteredProduct: Product[] | null;
//   searchProduct: Product[] | null;
//   sortProduct: Product[] | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }
