"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Filter,
  ShoppingCart,
  Search,
  Grid,
  List,
  ChevronDown,
  Eye,
  Sliders,
  X,
  SlidersHorizontal,
  Heart,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/productSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

export default function CategoryProductPage() {
  const [gridView, setGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const { products } = useSelector((state: RootState) => state.product);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      icon: "🛍️",
    });
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(String(product.brand));
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.includes(Math.floor(product.ratings));
      return matchesSearch && matchesBrand && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.ratings - a.ratings;
        default:
          return 0;
      }
    });

  const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"];
  const colors = ["red", "blue", "green", "black", "white", "yellow"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Fashion Products
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-grow md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  Filters
                </Button>

                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                  <button
                    onClick={() => setGridView(true)}
                    className={`p-2 rounded ${
                      gridView ? "bg-white dark:bg-gray-600 shadow" : ""
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridView(false)}
                    className={`p-2 rounded ${
                      !gridView ? "bg-white dark:bg-gray-600 shadow" : ""
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <select
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="lg:sticky lg:top-24 h-fit"
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5" /> Filters
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium mb-4">Price Range</h3>
                      <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Brands */}
                    <div>
                      <h3 className="font-medium mb-3">Brands</h3>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <label
                            key={brand}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedBrands([...selectedBrands, brand]);
                                } else {
                                  setSelectedBrands(
                                    selectedBrands.filter((b) => b !== brand)
                                  );
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                            <span>{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div>
                      <h3 className="font-medium mb-3">Colors</h3>
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 ${
                              selectedColors.includes(color)
                                ? "border-primary"
                                : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              if (selectedColors.includes(color)) {
                                setSelectedColors(
                                  selectedColors.filter((c) => c !== color)
                                );
                              } else {
                                setSelectedColors([...selectedColors, color]);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Ratings */}
                    <div>
                      <h3 className="font-medium mb-3">Ratings</h3>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <label
                            key={rating}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedRatings.includes(rating)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRatings([
                                    ...selectedRatings,
                                    rating,
                                  ]);
                                } else {
                                  setSelectedRatings(
                                    selectedRatings.filter((r) => r !== rating)
                                  );
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                            <div className="flex items-center">
                              {[...Array(rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                              <span className="ml-1">& up</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div
            className={
              gridView
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="group h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>

                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">
                          ${product.price}
                        </span>
                        {product.discount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < product.ratings
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">
                          ({product.ratings})
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => router.push(`fashion/${product.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
