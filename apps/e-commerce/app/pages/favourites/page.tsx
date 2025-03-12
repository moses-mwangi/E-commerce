"use client";

import Footer from "@/app/home-page/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import FavouritesProductPage from "./FavouriteProductPage";

export default function FavouritesPage() {
  return (
    <div className="">
      <Navbar />
      <FavouritesProductPage />

      <Footer />
    </div>
  );
}
