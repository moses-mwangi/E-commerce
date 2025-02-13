"use client";

import React from "react";
import Navbar from "./home-page/navbar/Navbar";
import Hero_Section from "./home-page/hero_section/Hero_Section";
import ProductCategories from "./home-page/ProductCategory";
import TrendingProducts from "./home-page/TredingProduct";
import RecommendedForYou from "./home-page/RecommedationProduct";
import BestSellers from "./home-page/BestSell";
import BrowsingHistory from "./home-page/UserBrowsingHistory";
import NewArrivals from "./home-page/New Arrivals";
import Footer from "./home-page/footer/Footer";
// import DiagonalDivider from "./home-page/hero_section/try";

export default function HomePage() {
  // const name: any = "mmm";
  return (
    <div>
      <Navbar />
      <Hero_Section />
      <ProductCategories />
      <TrendingProducts />
      <BestSellers />
      <NewArrivals />
      <RecommendedForYou />
      <BrowsingHistory />
      <Footer />
    </div>
  );
}
