import { Product, ProductState } from "@/app/types/products";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import toast from "react-hot-toast";
import {
  convertPrice,
  getCurrentCurrency,
  CurrencyCode,
} from "../../utils/currency";

const BASE_CURRENCY: CurrencyCode = "KES";

dotenv.config();
const API_URL = process.env.API_URL || "https://kivamall.up.railway.app/api";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  try {
    const res = await axios.get(`${API_URL}/product`);

    const currentCurrency = getCurrentCurrency();

    const productsCurrencyChange = res.data.products.map((product: any) => ({
      ...product,
      price: convertPrice(product.price, BASE_CURRENCY, currentCurrency),
      originalPrice: product.price,
      currency: currentCurrency,
    }));

    // return res.data.products;
    return productsCurrencyChange;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch products");
  }
});

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: number) => {
    try {
      const res = await axios.get(`${API_URL}/product/${id}`);

      const currentCurrency = getCurrentCurrency();
      const product = res.data.product;

      const productCurrencyChange = {
        ...product,
        price: convertPrice(product.price, BASE_CURRENCY, currentCurrency),
        originalPrice: product.price,
        currency: currentCurrency,
      };

      return productCurrencyChange;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch product");
    }
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/add",
  async (product: Product) => {
    try {
      const res = await axios.post(`${API_URL}/product`, product);
      return res.data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to add product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (
    {
      id,
      formData,
      images,
      deletedImages,
    }: { id: number; formData: any; images: File[]; deletedImages: number[] },
    { rejectWithValue }
  ) => {
    const form = new FormData();

    if (formData.images) {
      form.append("existingImages", JSON.stringify(formData.images));
    }

    Object.keys(formData).forEach((key) => {
      if (key === "specifications") {
        form.append(key, JSON.stringify(formData[key]));
      } else if (
        key !== "images" &&
        key !== "newImages" &&
        key !== "deletedImages"
      ) {
        form.append(key, formData[key]);
      }
    });
    form.append("deletedImages", JSON.stringify(deletedImages));

    images.forEach((file) => {
      form.append("images", file);
    });

    // for (const [key, value] of form.entries()) {
    //   console.log(key, value);
    // }

    console.log(formData, images);

    try {
      const response = await axios.patch(`${API_URL}/product/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // if (response.data.msg) {
      //   toast.error(response.data.msg);
      //   return;
      // }

      toast.success("Product updated successfully");
      window.location.href = "/admin/dashboard/products";
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const error = (axiosError.response?.data as any).message;
      toast.error("An error occurred while updating product");
      return rejectWithValue(error || "Failed to update product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/product/${id}`);
      toast.success("Product deleted successfully");
      return id;
    } catch (err: any) {
      toast.error("Failed to delete product");
      return rejectWithValue(err.response?.data || "Failed to delete product");
    }
  }
);

const initialState: ProductState = {
  products: [],
  // favourites: [],
  selectedProduct: null,
  filteredProduct: [],
  searchProduct: [],
  sortProduct: [],
  status: "idle",
  error: null,
  currentPage: 0,
  totalPages: 0,
  pageSize: 0,
  searchTerm: "",
  filterParams: {
    category: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  },
  sortOrder: "asc",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.searchProduct = state.products.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    filterProducts: (
      state,
      action: PayloadAction<{
        category?: string;
        minPrice?: number;
        maxPrice?: number;
      }>
    ) => {
      const { category, minPrice, maxPrice } = action.payload;
      state.filteredProduct = state.products.filter((product) => {
        return (
          (!category || product.category === category) &&
          (!minPrice || product.price >= minPrice) &&
          (!maxPrice || product.price <= maxPrice)
        );
      });
    },

    sortProducts: (
      state,
      action: PayloadAction<{
        field: "price" | "ratings" | "name";
        order: "asc" | "desc";
      }>
    ) => {
      const { field, order } = action.payload;
      state.products.sort((a, b) => {
        if (field === "price")
          return order === "asc" ? a.price - b.price : b.price - a.price;
        if (field === "ratings")
          return order === "asc"
            ? a.ratings - b.ratings
            : b.ratings - a.ratings;
        if (field === "name")
          return order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        return 0;
      });
    },

    clearModifiedProduct: (state) => {
      state.selectedProduct = null;
      state.filteredProduct = [];
      state.searchProduct = [];
      state.sortProduct = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })

      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Failed to delete product";
      });
  },
});

export const {
  setProducts,
  searchProducts,
  filterProducts,
  sortProducts,
  clearModifiedProduct,
} = productSlice.actions;
export default productSlice.reducer;
