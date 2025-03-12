import { FavState } from "@/app/types/favourite";
import { Product } from "@/app/types/products";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const storedFav =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("fav") || "[]")
    : [];

const initialState: FavState = {
  items: [],
  status: "idle",
  error: null,
};

export const favSlice = createSlice({
  // name: "cart",
  name: "favourite",
  initialState,
  reducers: {
    setFav: (state, action) => {
      state.items = action.payload;
    },
    addToFav: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (items) => items.product.id === action.payload.id
      );

      if (!existingItem) {
        state.items.push({
          product: action.payload,
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("fav", JSON.stringify(state.items));
      }
    },

    removeFromFav: (state, action: PayloadAction<number>) => {
      const itemToRemove = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (itemToRemove) {
        state.items = state.items.filter(
          (item) => item.product.id !== action.payload
        );

        if (typeof window !== "undefined") {
          localStorage.setItem("fav", JSON.stringify(state.items));
        }
      }
    },

    clearFav: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("fav");
      }
    },
  },
});

export const { addToFav, setFav, removeFromFav, clearFav } = favSlice.actions;
export default favSlice.reducer;
