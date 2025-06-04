"use client";

import React from "react";
import Navbar from "./home-page/navbar/Navbar";

import ProductCategories from "./home-page/category/ProductCategorySection";

import TrendingProducts from "./home-page/trend/TredingProduct";
import RecommendedForYou from "./home-page/recommedation/RecommedationProduct";
import NewArrivals from "./home-page/new_arrivals/New Arrivals";
import Footer from "./components/footer/Footer";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import NewsletterSection from "./home-page/newsletter/NewsletterSection";
import LiveChat from "./home-page/hero_section/LiveChat";
import FrequencySearched from "./home-page/frequencySearched/FrequencySearched";
import Carosoul from "./home-page/Carosoul";
import dynamic from "next/dynamic";

const Hero_Section = dynamic(
  () => import("./home-page/hero_section/Hero_Section")
);

// import UserBrowsingHistory from "./home-page/userBrowser/UserBrowsingHistory";

const UserBrowsingHistory = dynamic(
  () => import("./home-page/userBrowser/UserBrowsingHistory"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function HomePage() {
  const { recentlyViewed } = useSelector((state: RootState) => state.recently);

  return (
    <div className=" overflow-x-hidden">
      <Navbar />
      <Hero_Section />
      <ProductCategories />

      <div
        className={`sm:grid ${
          recentlyViewed.length > 0
            ? "sm:grid-cols-2 space-y-3 sm:space-y-0 sm:gap-5"
            : " grid-cols-1"
        } py-4 sm:py-7 mx-auto sm:px-6 md:px-7 lg:px-9`}
      >
        <UserBrowsingHistory />
        {/* <FrequencySearched /> */}
      </div>

      <Carosoul />

      <NewArrivals />
      <TrendingProducts />
      <RecommendedForYou />
      <NewsletterSection />
      <Footer />
      <LiveChat />
    </div>
  );
}
