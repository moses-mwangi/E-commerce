"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Search, ArrowRight, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import LoadingState from "@/app/components/loaders/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function ProductCategories() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "featured">("grid");
  const { categories } = useSelector((state: RootState) => state.category);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [endSlide, setEndSlide] = useState(6);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleNext = () => {
    if (endSlide < filteredCategories.length) {
      console.log("NEXT");
      setCurrentSlide((s) => s + 1);
      setEndSlide((s) => s + 1);
    }
  };

  // Function to handle previous button click
  const handlePrevious = () => {
    if (currentSlide > 0) {
      console.log("PREVIOUS");
      setCurrentSlide((s) => s - 1);
      setEndSlide((s) => s - 1);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredCategories = categories.filter((cat) => cat.featured);
  const trendingCategories = categories.filter((cat) => cat.trending);

  return (
    <>
      {isLoading === true && <LoadingState />}
      <section className="py-16 bg-gradient-to-b from-whitte to-gray-50">
        <div className="container mx-auto rounded-lg px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-[27px] font-semibold text-gray-900">
                    Discover products by category
                  </h2>
                  {/* <p className="text-gray-500 mt-1">
                    Discover products by category
                  </p> */}
                </div>
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
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentSlide === 0}
                className={`disabled:cursor-not-allowed bg-card p-3  rounded-full ${
                  currentSlide !== 0
                    ? "text-gray-900 hover:bg-slate-700 hover:text-white"
                    : "text-gray-700 bg-slate-50"
                }  transition-all duration-300`}
              >
                <GrPrevious size={19} className="" />
              </button>
              <AnimatePresence mode="wait">
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-6 gap-4"
                  onClick={() => {
                    setIsLoading(true);
                  }}
                >
                  {filteredCategories
                    ?.slice(currentSlide, endSlide)
                    .map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.05 }}
                        className="group cursor-pointer relative w-full"
                        onMouseEnter={() => setActiveCategory(category.name)}
                        onMouseLeave={() => setActiveCategory(null)}
                        onClick={() =>
                          router.push(
                            `/category/${category.name.toLowerCase()}`
                          )
                        }
                      >
                        <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 py-4 px-1 w-full h-full">
                          <div className="relative space-y-2">
                            <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm">
                              <div
                                className="relative w-16 h-16 mx-auto bg-gray-100 rounded-full shadow-sm"
                                style={{
                                  backgroundImage: category?.icon
                                    ? `url(${category.icon})`
                                    : "none",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                }}
                              />
                            </div>

                            <div className="text-center space-y-2">
                              <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                                {category.name}
                              </h3>

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
                                    {category?.subcategories?.map(
                                      (sub, idx) => (
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
                                          <span>{sub.name.split(" ")[0]}</span>
                                          <ArrowRight className="w-4 h-4" />
                                        </div>
                                      )
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </AnimatePresence>
              <button
                onClick={handleNext}
                disabled={endSlide === filteredCategories.length}
                className={` disabled:cursor-not-allowed bg-card p-3 flex items-center justify-center rounded-full ${
                  endSlide === filteredCategories.length
                    ? "text-gray-700 bg-slate-50"
                    : "text-gray-900 hover:bg-slate-700 hover:text-white"
                } transition-all duration-300`}
              >
                <GrNext size={19} className="" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
