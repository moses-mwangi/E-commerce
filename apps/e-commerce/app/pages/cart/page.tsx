import React from "react";
import ProductCartPage from "./productCartPage";
import Navbar from "@/app/home-page/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <ProductCartPage />
      </div>
      <Footer />
    </div>
  );
}
