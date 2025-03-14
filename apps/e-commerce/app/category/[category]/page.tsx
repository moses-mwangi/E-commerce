"use client";

import React, { useState } from "react";
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
import { ProductCard } from "./categoryComponents/product/ProductCard";

const categories = {
  fashion: {
    name: "Fashion",
    description:
      "Stay ahead with the latest styles in fashion. Explore trendy outfits, footwear, and accessories for every occasion.",
    banner: fash_2,
    subcategories: [
      { name: "Men", count: 850 },
      { name: "Women", count: 1200 },
      { name: "Kids", count: 450 },
      { name: "Accessories", count: 680 },
      // { name: "Sports", count: 680 },
    ],
    filters: [
      {
        name: "Brand",
        options: ["Nike", "Adidas", "Zara", "H&M", "Uniqlo"],
      },
      {
        name: "Size",
        options: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      {
        name: "Color",
        options: ["Black", "White", "Red", "Blue", "Green"],
      },
    ],
  },

  electronics: {
    name: "Electronics",
    description:
      "Upgrade your tech with the newest smartphones, laptops, and gadgets. Discover cutting-edge innovation at your fingertips.",
    banner: "/category/electronics-banner.jpg",
    subcategories: [
      { name: "Smartphones", count: 120 },
      { name: "Laptops", count: 85 },
      { name: "Audio", count: 230 },
      { name: "Cameras", count: 95 },
    ],
    filters: [
      {
        name: "Brand",
        options: ["Apple", "Samsung", "Sony", "LG", "Dell"],
      },
      {
        name: "Price Range",
        options: ["$0-$100", "$100-$500", "$500-$1000", "$1000+"],
      },
      {
        name: "Rating",
        options: ["4★ & up", "3★ & up", "2★ & up"],
      },
    ],
  },
  // Add more categories as needed
};

export default function CategoryPage() {
  const { category } = useParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categoryData = categories[category as keyof typeof categories];

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  return (
    <div className="">
      <Navbar />
      {/* <Card className="flex items-center justify-between rounded-none bg-gray-300/50">
        <div>LOGO</div>
        <div>Moses Mwangi</div>
      </Card> */}
      <div className="min-h-screen bg-gray-50">
        {/* Category Banner */}
        <div className="relative h-[300px] bg-gray-900">
          <Image
            src={categoryData.banner}
            alt={categoryData.name}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                {categoryData.name}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
                {categoryData.description}
              </p>
            </div>
          </div>
        </div>

        <div className="container rounded-lg mt-4 mx-auto px-4 py-8">
          {/* Subcategories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryData.subcategories.map((sub) => (
                <Link
                  key={sub.name}
                  href={`/category/${category}/${sub.name.toLowerCase()}`}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                          {sub.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {sub.count} products
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categoryData.filters.map((filter) => (
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

          <div className="text-center text-gray-500 py-8">
            Products will be displayed here...
          </div>
          {/* <ProductCard /> */}
        </div>
      </div>
    </div>
  );
}
