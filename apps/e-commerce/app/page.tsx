import React from "react";
import Navbar from "./home-page/navbar/Navbar";
import ProductCategories from "./home-page/category/ProductCategorySection";
import dynamic from "next/dynamic";
import Footer from "./components/footer/Footer";
import Carosoul from "./home-page/Carosoul";
import LiveChat from "./home-page/hero_section/LiveChat";
import NewArrivals from "./home-page/new_arrivals/New Arrivals";
import NewsletterSection from "./home-page/newsletter/NewsletterSection";
import RecommendedForYou from "./home-page/recommedation/RecommedationProduct";
import TrendingProducts from "./home-page/trend/TredingProduct";
import UserBrowsingHistory from "./home-page/userBrowser/UserBrowsingHistory";

const Hero_Section = dynamic(
  () => import("./home-page/hero_section/Hero_Section")
);

export default function HomePage() {
  return (
    <div className=" overflow-x-hidden">
      <Navbar />
      <Hero_Section />
      <ProductCategories />

      <UserBrowsingHistory />

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
