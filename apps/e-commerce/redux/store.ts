import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
