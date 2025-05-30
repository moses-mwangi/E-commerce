export interface Product {
  id: number;
  name: string;
  status: string;
  category: string;
  subCategory: string;

  price: number;
  costPrice: number;
  dealPrice: number;
  originalPrice: number;

  description: string;
  stock: number;
  sold: number;
  brand: string | null;
  images: string[];
  productImages: Images[];
  specifications: Record<string, any> | null;
  discount: number;
  ratings: number;

  trending: boolean | null;
  trendingScore: number;

  reviews: string[] | null;
  createdAt: string;
  updatedAt: string;
  currency: string;
}

export interface Images {
  id: number;
  url: string;
  isMain: boolean;
  productId: number;
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

export const capitalizeWords = (str: string) => {
  return str
    ?.split(" ")
    ?.map(
      (word) => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()
    )
    ?.join(" ");
};
