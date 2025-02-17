"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import ProductCartPage from "./productCartPage";

export default function CartPage() {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  return (
    <div>
      <ProductCartPage />
    </div>
  );
}
