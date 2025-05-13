"use client";

import React, { useEffect } from "react";
import Navbar from "./home-page/navbar/Navbar";
import Hero_Section from "./home-page/hero_section/Hero_Section";
import ProductCategories from "./home-page/category/ProductCategorySection";
import TrendingProducts from "./home-page/trend/TredingProduct";
import RecommendedForYou from "./home-page/recommedation/RecommedationProduct";
import NewArrivals from "./home-page/new_arrivals/New Arrivals";
import Footer from "./components/footer/Footer";
import { setCart } from "@/redux/slices/cartSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import NewsletterSection from "./home-page/newsletter/NewsletterSection";
import LiveChat from "./home-page/hero_section/LiveChat";
import UserBrowsingHistory from "./home-page/userBrowser/UserBrowsingHistory";
import FrequencySearched from "./home-page/frequencySearched/FrequencySearched";
import Carosoul from "./home-page/Carosoul";

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);
  return (
    <div className=" overflow-x-hidden">
      <Navbar />
      <Hero_Section />
      <ProductCategories />
      <div className="sm:grid sm:grid-cols-2 space-y-3 sm:space-y-0 sm:gap-5 py-4 sm:py-7 mx-auto sm:px-6 md:px-7 lg:px-9">
        <UserBrowsingHistory />
        <FrequencySearched />
      </div>
      <Carosoul />
      <NewArrivals />
      <TrendingProducts />
      {/* <BestSellers /> */}
      <RecommendedForYou />

      <NewsletterSection />
      <Footer />
      <LiveChat />
    </div>
  );
}
