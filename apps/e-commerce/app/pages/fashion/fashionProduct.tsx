"use client";
import React, { useEffect } from "react";

import { useState } from "react";
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
  Heart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/productSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import { addToFav, setFav } from "@/redux/slices/favoriteSlice";
import LoadingState from "@/app/components/loaders/LoadingState";
import { Slider } from "@/components/ui/slider";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";

export default function CategoryProductPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { products } = useSelector((state: RootState) => state.product);
  const { items } = useSelector((state: RootState) => state.favourite);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [gridView, setGridView] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    dispatch(fetchProducts());
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const savedFav = JSON.parse(localStorage.getItem("fav") || "[]");
      dispatch(setCart(savedCart));
      dispatch(setFav(savedFav));
    }
  }, [dispatch]);

  const handleAddToCart = (id: any) => {
    const product = products.find((el) => el.id === id);
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleAddToFavourite = (id: any) => {
    const product = products.find((el) => el.id === id);
    const inFavourite = items.find((el) => el.product.id === id);

    if (product) {
      dispatch(addToFav(product));
      if (inFavourite) {
        toast.success(`Product already in favourite!`);
      } else {
        toast.success(`${product.name} added to Fav!`);
      }
    }
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

  useEffect(() => {
    dispatch(fetchProducts());

    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);

  function handleRoute(id: any) {
    setIsLoading(true);
    router.push(`fashion/${id}`);
  }

  return (
    <>
      {isLoading && <LoadingState />}
      <div className="px-6 pt-6 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="sticky top-0 z-10 bg-white rounded-lg my-4 dark:bg-gray-800 shadow-md p-4">
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
                  <Button variant="outline" className="flex items-center gap-2">
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
        {/* <AnimatePresence>
          {showFilters && ( */}
        <div className="grid grid-cols-[1fr_3.5fr] gap-6">
          <AnimatePresence>
            {showFilters && (
              <div className="col-span-1 p-4 bg-white dark:bg-gray-800 rounded shadow-md">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div className="flex flex-col gap-3">
                  <details className="border-b pb-2">
                    <summary className="flex items-center justify-between cursor-pointer">
                      Price Range <ChevronDown />
                    </summary>
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
                  </details>
                  <details className="border-b pb-2">
                    <summary className="flex items-center justify-between cursor-pointer">
                      Brand <ChevronDown />
                    </summary>
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
                  </details>
                  <details className="border-b pb-2">
                    <summary className="flex items-center justify-between cursor-pointer">
                      Ratings <ChevronDown />
                    </summary>
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
                  </details>

                  {/* //////////////////// colors ///////////////////////////////*/}
                  <details className="border-b pb-2">
                    <summary className="flex items-center justify-between cursor-pointer">
                      Color <ChevronDown />
                    </summary>
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
                  </details>

                  {/*////////////////////////////// colors ////////////////////////*/}
                  <details className="border-b pb-2">
                    <summary className="flex items-center justify-between cursor-pointer">
                      Shipping <ChevronDown />
                    </summary>
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" /> Free Shipping
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" /> Express
                        Delivery
                      </label>
                    </div>
                  </details>

                  <details className="border-b pb-2">
                    <summary className="flex items-center justify-between cursor-pointer">
                      Delivery by <ChevronDown />
                    </summary>
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" /> Delivery by
                        Mar 08
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" /> Delivery by
                        Mar 14
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" /> Delivery by
                        Mar 20
                      </label>
                    </div>
                  </details>
                </div>
              </div>
            )}
          </AnimatePresence>
          <div
            className={` ${!gridView ? " grid" : " grid grid-cols-3"} gap-6`}
          >
            {filteredProducts?.map((product) => (
              <Card
                className={`grid ${
                  gridView
                    ? " grid-cols-1 gap-3 h-auto"
                    : "grid-cols-[1fr_2fr] h-[280px] p-4"
                }   hover:cursor-pointer gap-2  bg-white dark:bg-gray-800 shadow-lg rounded-xl`}
                key={product.id}
              >
                <div
                  className={`group ${
                    gridView
                      ? " h-[200px] rounded-b-none rounded-t-md"
                      : "h-[96%] rounded-md"
                  } bg-gray-200 relative dark:bg-gray-700 overflow-hidden hover:cursor-pointer`}
                >
                  <Image
                    className="h-full w-full hover:scale-110 transition-all duration-200 object-cover"
                    src={product.images[0]}
                    alt={product.name}
                    width={500}
                    height={300}
                  />

                  <Button
                    onClick={() => handleAddToFavourite(product.id)}
                    className="bg-gray-100/65 hover:bg-gray-100 absolute top-2 right-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Heart className="w-6 h-6 text-red-500" />
                  </Button>
                </div>

                <CardContent
                  className={`${
                    gridView ? " p-4" : "p-2"
                  } flex flex-col justify-between`}
                >
                  <div
                    className={`${gridView ? "space-y-[14px]" : "space-y-1"}`}
                  >
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-lg font-semibold">
                      <p className="text-gray-800 dark:text-gray-200">
                        ${product.price}
                      </p>
                      {product.discount > 0 && (
                        <p className="text-red-500 bg-red-100 dark:bg-red-900 px-2 py-1 text-xs rounded-md">
                          -{product.discount}%
                        </p>
                      )}
                    </div>

                    <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < product.ratings
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                      <span className="ml-1">({product.ratings})</span>
                    </div>

                    <div
                      className={`${
                        gridView ? " grid-cols-1" : "grid-cols-3"
                      } mt-2 text-sm grid `}
                    >
                      {product.specifications
                        ?.slice(0, 6)
                        .map((spec: any, idx: any) => (
                          <div className="flex gap-1" key={idx}>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                              {spec.key}:
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              {spec.value}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 flex items-center gap-2 shadow-md"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart /> Add to Cart
                    </Button>
                    <Button
                      className="w-full flex items-center gap-2 border-gray-300 dark:border-gray-600 shadow-md"
                      variant="outline"
                      onClick={() => handleRoute(product.id)}
                    >
                      <Eye /> Quick View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
