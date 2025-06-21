"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/home-page/navbar/Navbar";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import { fetchCategories } from "@/redux/slices/categorySlice";
import Category from "./categoryComponents/Category";
import Footer from "@/app/components/footer/Footer";

export default function CategoryPage() {
  const { category } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const decodedCategory = decodeURIComponent(String(category));

  const categoryData = categories.find(
    (el) => el.name.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <div className="">
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div
          className={`relative h-[240px] sm:h-[320px] bg-gray-900 backsg`}
          style={{
            backgroundImage: categoryData?.banner
              ? `url(${categoryData.banner})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="rounded-lg mt-2 sm:mt-4 mx-auto md:px-4 py-3">
          <Category />
        </div>
      </div>
      <Footer />
    </div>
  );
}
