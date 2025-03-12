import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import favReducer from "./slices/favoriteSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import analyticReducer from "./slices/AnalyticsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    favourite: favReducer,
    order: orderReducer,
    analytic: analyticReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
