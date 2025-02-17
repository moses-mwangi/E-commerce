import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for events and analytics data
interface AnalyticsState {
  events: Array<{
    type: string;
    productId: number;
    timestamp: string;
    quantity?: number;
  }>;
  bestSellingProducts: Array<{
    productId: number;
    viewCount: number;
    cartAddCount: number;
  }>;
  userActivity: {
    [key: string]: number; // Track activity counts like category browsed or search terms used
  };
}

const initialState: AnalyticsState = {
  events: [],
  bestSellingProducts: [],
  userActivity: {},
};

// Create the slice
const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    // Track product view event
    trackProductView(state, action: PayloadAction<number>) {
      const timestamp = new Date().toISOString();
      state.events.push({ type: "view", productId: action.payload, timestamp });

      // Track best-selling products based on product views
      const productIndex = state.bestSellingProducts.findIndex(
        (product) => product.productId === action.payload
      );
      if (productIndex !== -1) {
        state.bestSellingProducts[productIndex].viewCount += 1;
      } else {
        state.bestSellingProducts.push({
          productId: action.payload,
          viewCount: 1,
          cartAddCount: 0,
        });
      }
    },

    // Track add-to-cart event
    trackAddToCart(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;
      const timestamp = new Date().toISOString();
      state.events.push({
        type: "add_to_cart",
        productId,
        timestamp,
        quantity,
      });

      // Track best-selling products based on add-to-cart count
      const productIndex = state.bestSellingProducts.findIndex(
        (product) => product.productId === productId
      );
      if (productIndex !== -1) {
        state.bestSellingProducts[productIndex].cartAddCount += quantity;
      } else {
        state.bestSellingProducts.push({
          productId,
          viewCount: 0,
          cartAddCount: quantity,
        });
      }
    },

    // Track user activity like category browsed or search term
    trackUserActivity(state, action: PayloadAction<string>) {
      const activity = action.payload;
      if (state.userActivity[activity]) {
        state.userActivity[activity] += 1;
      } else {
        state.userActivity[activity] = 1;
      }
    },

    // Optionally clear events (e.g., after sending to backend)
    clearEvents(state) {
      state.events = [];
    },
  },
});

export const {
  trackProductView,
  trackAddToCart,
  trackUserActivity,
  clearEvents,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
