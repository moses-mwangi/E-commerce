"use client";

import Footer from "@/app/home-page/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import React from "react";
import SingleProductDetails from "./SingleProductDetails";

export default function SingleProduct() {
  return (
    <div>
      <Navbar />
      <SingleProductDetails />
      <Footer />
    </div>
  );
}
