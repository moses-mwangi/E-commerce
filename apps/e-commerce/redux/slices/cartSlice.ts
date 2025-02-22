import { CartState } from "@/app/types/cart";
import { Product } from "@/app/types/products";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const createCartToBackened = createAsyncThunk("", async (item: any) => {
  try {
    // const res = await axios.post("", item);
  } catch (err) {
    console.error(err);
  }
});

export const getCartToBackened = createAsyncThunk("", async () => {
  try {
    // const res = await axios.get("");
  } catch (err) {
    console.error(err);
  }
});

export const deleteCartToBackened = createAsyncThunk("", async () => {
  try {
    // const res = await axios.delete("");
    if (true) {
    } else {
    }
  } catch (err) {
    console.error(err);
  }
});

export const updateCartToBackened = createAsyncThunk("", async (item: any) => {
  try {
    const res = await axios.patch("", item);
  } catch (err) {
    console.error(err);
  }
});

const storedCart =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [];

const calculateTotalPrice = (items: any[]) => {
  return items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
};

const initialState: CartState = {
  items: [],
  totalPrice: calculateTotalPrice(storedCart) || 0,
  status: "idle",
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          productId: action.payload.id,
          quantity: 1,
          product: action.payload,
        });
      }

      // ✅ Ensure total price updates correctly
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      );

      // ✅ Ensure localStorage updates correctly
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemToRemove = state.items.find(
        (item) => item.productId === action.payload
      );

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.quantity * itemToRemove.product.price;
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );

        // Ensure localStorage updates correctly after removing the item
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.items));
        }
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const itemToUpdate = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (itemToUpdate) {
        const newQuantity = Math.max(0, action.payload.quantity);
        const diff = newQuantity - itemToUpdate.quantity;

        itemToUpdate.quantity = newQuantity;
        state.totalPrice += diff * itemToUpdate.product.price;

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.items)); // ✅ Update localStorage
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      const discount = Math.max(0, Math.min(action.payload, 100)); // ✅ Ensure discount is between 0-100
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      );

      state.totalPrice = state.totalPrice * ((100 - discount) / 100); // ✅ Apply discount correctly
    },
  },
});

export const {
  addToCart,
  setCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
