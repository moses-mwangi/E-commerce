"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowRight, Grid2x2, LayoutList } from "lucide-react";
import fash_1 from "../../../public/category_Image/fash_1.png";
import fash_2 from "../../../public/fashion/image.png";
import Navbar from "@/app/home-page/navbar/Navbar";
import { ProductCard } from "./[subcategory]/subcategoryComponents/ProductCard";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import { fetchCategories } from "@/redux/slices/categorySlice";
import Category from "./categoryComponents/Category";
import Footer from "@/app/home-page/footer/Footer";

export default function CategoryPage() {
  const { category } = useParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
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
        {/* Category Banner */}
        {/* {categories.map((categoryData) => (
          <div key={categoryData.id}> */}
        <div className="relative h-[300px] bg-gray-900">
          <Image
            src={fash_1}
            alt="{categoryData}"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                {categoryData?.name}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
                {categoryData?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="containehr rounded-lg mt-4 mx-auto px-4 py-3">
          <Category />
        </div>
      </div>
      <Footer />
    </div>
  );
}
