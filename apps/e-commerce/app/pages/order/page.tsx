"use client";
import Footer from "@/app/home-page/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrders } from "@/redux/slices/orderSlice";

// import OrderPage from "./OrderPage";
import OrderPage from "./Alibaba copy";
import OrdersPage from "./Alibaba";

export default function Orders() {
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return (
    <div>
      <Navbar />

      <OrderPage />
      <OrdersPage />

      <Footer />
    </div>
  );
}
