"use client";

import React from "react";

import FashionProduct from "./fashionProduct";
import Navbar from "@/app/home-page/navbar/Navbar";
import Footer from "@/app/home-page/footer/Footer";

export default function FashionsPage() {
  return (
    <div>
      <Navbar />
      <FashionProduct />
      <Footer />
    </div>
  );
}
