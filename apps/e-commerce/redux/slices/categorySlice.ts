import {
  Category,
  CategoryState,
  Filter,
  Subcategory,
} from "@/app/types/category";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import toast from "react-hot-toast";

dotenv.config();

const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async () => {
    const res = await axios.get(`${API_URL}/category`);

    const category = res.data.data.categories;
    return category;
  }
);

// Fetch category by ID or slug
export const fetchCategory = createAsyncThunk(
  "category/fetch",
  async (identifier: number) => {
    const res = await axios.get(`${API_URL}/categories/${identifier}`);
    return res.data.data.category;
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (categoryData: Category, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/category`, categoryData);
      toast.success("Category created successfully!");

      if (response.data.error) {
        toast.error("category creation failed: " + response.data.error);
        console.log(response.data.error);

        window.location.href = "/admin/dashboard/categories";
        return rejectWithValue(response.data.error);
      }
      return response.data.data.category;
    } catch (err) {
      const axiosError = err as AxiosError;
      const error = (axiosError.response?.data as any).message;
      toast.error(error);
      return rejectWithValue(
        axiosError.response?.data || "An error occurred while deleting user."
      );
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }: { id: number; data: Partial<Category> }) => {
    const res = await axios.patch(`${API_URL}/categories/${id}`, data);
    return res.data.data.category;
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: number) => {
    try {
      await axios.delete(`${API_URL}/category/${id}`);
      toast.success("Category deleted succesfully");
      // window.location.href = "/admin/dashboard/categories";
      return id;
    } catch (err) {
      toast.error("Failed to delete category");
    }
  }
);

// Add subcategory
export const addSubcategory = createAsyncThunk(
  "category/addSubcategory",
  async ({ categoryId, data }: { categoryId: number; data: Subcategory }) => {
    const res = await axios.post(
      `${API_URL}/categories/${categoryId}/subcategories`,
      data
    );
    return {
      categoryId,
      subcategory: res.data.data.subcategory,
    };
  }
);

// Update subcategory
export const updateSubcategory = createAsyncThunk(
  "category/updateSubcategory",
  async ({
    categoryId,
    subcategoryId,
    data,
  }: {
    categoryId: number;
    subcategoryId: number;
    data: Partial<Subcategory>;
  }) => {
    const res = await axios.patch(
      `${API_URL}/categories/${categoryId}/subcategories/${subcategoryId}`,
      data
    );
    return {
      categoryId,
      subcategory: res.data.data.subcategory,
    };
  }
);

// Delete subcategory
export const deleteSubcategory = createAsyncThunk(
  "category/deleteSubcategory",
  async ({
    categoryId,
    subcategoryId,
  }: {
    categoryId: number;
    subcategoryId: number;
  }) => {
    await axios.delete(
      `${API_URL}/categories/${categoryId}/subcategories/${subcategoryId}`
    );
    return { categoryId, subcategoryId };
  }
);

// Update category filters
export const updateCategoryFilters = createAsyncThunk(
  "category/updateFilters",
  async ({
    categoryId,
    filters,
  }: {
    categoryId: number;
    filters: Filter[];
  }) => {
    const res = await axios.patch(
      `${API_URL}/categories/${categoryId}/filters`,
      { filters }
    );
    return {
      categoryId,
      filters: res.data.data.category.filters,
    };
  }
);

// Update subcategory filters
export const updateSubcategoryFilters = createAsyncThunk(
  "category/updateSubcategoryFilters",
  async ({
    categoryId,
    subcategoryId,
    filters,
  }: {
    categoryId: number;
    subcategoryId: number;
    filters: Filter[];
  }) => {
    const res = await axios.patch(
      `${API_URL}/categories/${categoryId}/subcategories/${subcategoryId}/filters`,
      { filters }
    );
    return {
      categoryId,
      subcategoryId,
      filters: res.data.data.subcategory.filters,
    };
  }
);

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch categories";
      })

      // Fetch single category
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
      })

      // Create category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        );
      })

      // Add subcategory
      .addCase(addSubcategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat.id === action.payload.categoryId
        );
        if (category) {
          category.subcategories.push(action.payload.subcategory);
        }
      })

      // Update subcategory
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat.id === action.payload.categoryId
        );
        if (category) {
          const index = category.subcategories.findIndex(
            (sub) => sub.id === action.payload.subcategory.id
          );
          if (index !== -1) {
            category.subcategories[index] = action.payload.subcategory;
          }
        }
      })

      // Delete subcategory
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat.id === action.payload.categoryId
        );
        if (category) {
          category.subcategories = category.subcategories.filter(
            (sub) => sub.id !== action.payload.subcategoryId
          );
        }
      })

      // Update category filters
      .addCase(updateCategoryFilters.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat.id === action.payload.categoryId
        );
        if (category) {
          category.filters = action.payload.filters;
        }
      })

      // Update subcategory filters
      .addCase(updateSubcategoryFilters.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat.id === action.payload.categoryId
        );
        if (category) {
          const subcategory = category.subcategories.find(
            (sub) => sub.id === action.payload.subcategoryId
          );
          if (subcategory) {
            subcategory.filters = action.payload.filters;
          }
        }
      });
  },
});

export const { clearSelectedCategory, clearError } = categorySlice.actions;
export default categorySlice.reducer;
