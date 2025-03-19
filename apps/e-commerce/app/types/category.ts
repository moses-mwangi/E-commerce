export interface Filter {
  id: string;
  name: string;
  options: any[];
}

export interface Subcategory {
  id?: number;
  slug?: string;
  name: string;
  description: string;
  itemCount?: number;

  banner?: string;
  featured: boolean;
  filters: Filter[];
}

export interface Category {
  id?: number;
  status: string;
  name: string;
  slug?: string;
  description: string;
  itemCount?: number;
  icon?: string;
  banner?: string;
  color?: string;
  featured: boolean;
  trending: boolean;
  filters: Filter[];
  subcategories: Subcategory[];
}

export interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
