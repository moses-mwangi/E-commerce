import Footer from "@/app/home-page/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import React from "react";
import SingleSuCategoricalProductPage from "./SingleSubcategoricalProduct";

export default function page() {
  return (
    <div>
      <Navbar />
      <SingleSuCategoricalProductPage />
      <Footer />
    </div>
  );
}
