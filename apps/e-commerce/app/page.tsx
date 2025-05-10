"use client";

import React, { useEffect } from "react";
import Navbar from "./home-page/navbar/Navbar";
import Hero_Section from "./home-page/hero_section/Hero_Section";
import ProductCategories from "./home-page/category/ProductCategorySection";
import TrendingProducts from "./home-page/TredingProduct";
import RecommendedForYou from "./home-page/RecommedationProduct";
import BestSellers from "./home-page/BestSell";
import BrowsingHistory from "./home-page/userBrowser/UserBrowsingHistory";
import NewArrivals from "./home-page/New Arrivals";
import Footer from "./home-page/footer/Footer";
import { setCart } from "@/redux/slices/cartSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import NewsletterSection from "./home-page/newsletter/NewsletterSection";
import LiveChat from "./home-page/hero_section/LiveChat";

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);
  return (
    // <div className=" overflow-x-hidden">
    <div className=" overflow-x-hidden">
      <Navbar />
      <Hero_Section />
      <ProductCategories />
      <NewArrivals />
      <TrendingProducts />
      {/* <BestSellers /> */}
      <RecommendedForYou />

      <BrowsingHistory />
      <NewsletterSection />
      <Footer />
      <LiveChat />
    </div>
  );
}
