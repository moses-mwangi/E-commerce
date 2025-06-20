export interface Filter {
  id: string;
  subcategoryId: number;
  name: string;
  options: any[];
}

export interface Subcategory {
  id?: number;
  slug?: string;
  name: string;
  description: string;
  itemCount?: number;
  status?: string;
  banner?: string;
  featured: boolean;
  filters: Filter[];
  updatedAt: Date | string;
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
  updatedAt: Date | string;
}

export interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  selectedSubCategories: Subcategory[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
