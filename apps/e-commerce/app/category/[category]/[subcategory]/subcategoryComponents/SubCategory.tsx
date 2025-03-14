"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Grid2x2,
  LayoutList,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/home-page/navbar/Navbar";
import { ProductCard } from "@/app/category/[category]/categoryComponents/product/ProductCard";

// This would typically come from your API/database

const subcategoryData = {
  men: {
    name: "Men's Fashion",
    description: "Shop the latest men's clothing and accessories",
    filters: [
      {
        name: "Category",
        options: ["T-Shirts", "Shirts", "Pants", "Jackets", "Shoes"],
      },
      {
        name: "Size",
        options: ["S", "M", "L", "XL", "XXL"],
      },
      {
        name: "Color",
        options: ["Black", "White", "Blue", "Gray", "Red"],
      },
      {
        name: "Price Range",
        options: ["Under $50", "$50-$100", "$100-$200", "Over $200"],
      },
    ],
    products: [
      // Add product data here
    ],
  },
  // Add more subcategories
};

const demoProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description:
      "Experience superior sound quality with our premium wireless headphones.",
    price: 299.99,
    originalPrice: 399.99,
    images: ["/products/headphones-1.jpg"],
    category: "electronics",
    subcategory: "audio",
    rating: 4.8,
    reviews: 256,
    stock: 15,
  },
  // Add more demo products...
];

export default function Subcategory() {
  const { category, subcategory } = useParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const data = subcategoryData[subcategory as keyof typeof subcategoryData];

  if (!data) {
    return <div>Subcategory not found</div>;
  }

  return (
    <div className=" min-h-screen">
      <div className="">
        <div className="mx-auto px-7">
          <div className="flex items-center py-4 text-sm">
            <Link
              href="/category"
              className="text-gray-500 hover:text-gray-900"
            >
              Categories
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link
              href={`/category/${category}`}
              className="text-gray-500 hover:text-gray-900 capitalize"
            >
              {category}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-900 capitalize">{subcategory}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
          <p className="text-gray-600">{data.description}</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("grid")}
              className={view === "grid" ? "text-blue-600" : "text-gray-600"}
            >
              <Grid2x2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("list")}
              className={view === "list" ? "text-blue-600" : "text-gray-600"}
            >
              <LayoutList className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {data.filters.map((filter) => (
                <div key={filter.name}>
                  <h3 className="font-medium mb-3">{filter.name}</h3>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <input type="checkbox" className="rounded" />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Products Grid/List will go here */}
        {/* <div className="text-center text-gray-500 py-8">
          Products will be displayed here...
        </div> */}
        <div
          className={`grid ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          } gap-6`}
        >
          {demoProducts.map((product) => (
            <ProductCard key={product.id} product={product} view={view} />
          ))}
        </div>
      </div>
    </div>
  );
}
