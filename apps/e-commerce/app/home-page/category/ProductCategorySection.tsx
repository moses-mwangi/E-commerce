"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import fash_1 from "../../../public/category_Image/fash_1.png";
import electronics from "../../../public/category_Image/electronics.png";
import kitchen from "../../../public/category_Image/kitchen.png";
import beauty from "../../../public/category_Image/beauty.png";
import fitness from "../../../public/category_Image/fittness.png";
import gaming from "../../../public/category_Image/gaming.png";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Search, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { fetchProducts } from "@/redux/slices/productSlice";
import LoadingState from "@/app/components/loaders/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories } from "@/redux/slices/categorySlice";

const defaultIcons: { [key: string]: any } = {
  Fashion: fash_1,
  Electronics: electronics,
  Kitchen: kitchen,
  Beauty: beauty,
  Fitness: fitness,
  Gaming: gaming,
};

export default function ProductCategories() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "featured">("grid");
  const { categories } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredCategories = categories.filter((cat) => cat.featured);
  const trendingCategories = categories.filter((cat) => cat.trending);

  return (
    <>
      {isLoading === true && <LoadingState />}
      <section className="py-16 bg-gradient-to-b from-whitte to-gray-5u0">
        <div className="container mx-auto rounded-lg px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-gray-900"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  Explore Categories
                </motion.h2>
                <p className="text-gray-600 text-[16px] max-w-2xl">
                  Discover our wide range of products across different
                  categories
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-[200px] md:w-[300px]"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setView(view === "grid" ? "featured" : "grid")}
                >
                  {view === "grid" ? "Featured View" : "Grid View"}
                </Button>
              </div>
            </div>

            {/* Trending Categories Scroll */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-4 py-4 overflow-x-auto scrollbar-hide"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                {trendingCategories.map((category) => (
                  <motion.div
                    key={`trending-${category.id}`}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0"
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer"
                      onClick={() =>
                        router.push(`/category/${category.name.toLowerCase()}`)
                      }
                    >
                      <TrendingUp className="w-4 h-4" />
                      {category.name}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {view === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                  onClick={() => {
                    setIsLoading(true);
                  }}
                >
                  {filteredCategories?.map((category) => (
                    <motion.div
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      className="group cursor-pointer relative"
                      onMouseEnter={() => setActiveCategory(category.name)}
                      onMouseLeave={() => setActiveCategory(null)}
                      onClick={() =>
                        router.push(`/category/${category.name.toLowerCase()}`)
                      }
                    >
                      <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`}
                        />

                        <div className="relative space-y-4">
                          <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm">
                            <div className="relative w-full h-full">
                              <Image
                                src={
                                  defaultIcons[category.name] ||
                                  defaultIcons.Electronics ||
                                  category.icon
                                }
                                alt={category.name}
                                fill
                                className=" w-full h-full rounded-full"
                              />
                            </div>
                          </div>

                          <div className="text-center space-y-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {category.description}
                            </p>
                            <p className="text-xs text-gray-400">
                              {category.itemCount} items
                            </p>
                          </div>

                          <AnimatePresence>
                            {activeCategory === category.name && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute inset-0 shadow-lg bg-white/90 custom-scroll backdrop-blur-sm rounded-xl p-4 flex flex-col justify-center"
                              >
                                <div className="space-y-2">
                                  {category?.subcategories?.map((sub, idx) => (
                                    <div
                                      key={idx}
                                      className="flex text-sm items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsLoading(true);
                                        const param = new URLSearchParams();
                                        param.set("id", String(sub.id));
                                        router.push(
                                          `/category/${category.name.toLowerCase()}/${
                                            sub.name
                                          }?${param.toString()}`
                                        );
                                      }}
                                    >
                                      <span>{sub.name}</span>
                                      <ArrowRight className="w-4 h-4" />
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="featured"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {featuredCategories.map((category) => (
                    <motion.div
                      key={`featured-${category.id}`}
                      whileHover={{ scale: 1.02 }}
                      className="group cursor-pointer"
                      onClick={() => {
                        router.push(`/category/${category.name.toLowerCase()}`);
                      }}
                    >
                      <div className="relative bg-white rounded-2xl shadow-md overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10`}
                        />
                        <div className="relative p-6 flex items-center gap-6">
                          <div className="w-24 h-24 relative rounded-xl overflow-hidden">
                            <Image
                              src={
                                defaultIcons[category.name] ||
                                defaultIcons.Electronics ||
                                category.icon
                              }
                              alt={category.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold">
                                {category.name}
                              </h3>
                              <Sparkles className="w-5 h-5 text-yellow-500" />
                            </div>
                            <p className="text-gray-600 text-[14px] mb-4">
                              {category.description.substring(0, 100)} ...
                            </p>
                            <div className="flex justify-between items-center gap-4">
                              <Badge variant="secondary">
                                {category.itemCount} items
                              </Badge>
                              <Button
                                size="sm"
                                className="bg-orange-500/85 hover:bg-orange-600"
                                onClick={() => {
                                  setIsLoading(true);
                                }}
                              >
                                Explore <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
