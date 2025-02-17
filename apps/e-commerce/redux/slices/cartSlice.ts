import { CartState } from "@/app/types/cart";
import { Product } from "@/app/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  totalPrice: 0,
  status: "idle",
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
          product: undefined,
        });
      }
      state.totalPrice += action.payload.price;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemToRemove = state.items.find(
        (item) => item.productId === action.payload
      );
      if (itemToRemove) {
        state.totalPrice -= itemToRemove.quantity * action.payload;
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );
        localStorage.setItem("cart", JSON.stringify(state.items));
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
        const diff = action.payload.quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = action.payload.quantity;
        state.totalPrice += diff * itemToUpdate.productId;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      const discount = action.payload;
      const discountedPrice = state.totalPrice * ((100 - discount) / 100);
      state.totalPrice = discountedPrice;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
