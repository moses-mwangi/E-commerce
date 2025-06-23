"use client";

import { Product } from "@/app/types/products";
import useCategoryContex from "@/hooks/useCategoryContex";
import { addToRecentlyViewed } from "@/redux/slices/BrowsingHistory";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import LoadingState from "../../components/loaders/LoadingState";
import slugify from "@/utils/slungify";

export default function NewArrivals() {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { products, status } = useSelector((state: RootState) => state.product);

  const { items: favItems, handleAddToFavourite } = useCategoryContex();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const arrivedProducts = products;

  const handleRouteProduct = (product: Product) => {
    setIsLoading(true);
    dispatch(addToRecentlyViewed(product));
  };

  return (
    <>
      {isLoading === true && <LoadingState />}

      <section className="sm:pt-7 sm:pb-0 py-4 sm:px-6 md:px-9 bg-white">
        <div className="w-full sm:bg-[#f4f4f4] mx-auto px-3 sm:px-6 sm:py-5 rounded-2xl">
          <div className="flex sm:flex-col items-center sm:items-start justify-between mb-2 sm:mb-4">
            <p className=" text-base sm:text-2xl font-semibold text-gray-900">
              New arrivals
            </p>
            <p className="hidden sm:flex text-[16px] text-gray-600">
              Stay ahead of others with our latest product
            </p>
            <FaArrowRight size={16} className="sm:hidden font-light" />
          </div>

          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 overflow-x-scroll hide-scrollbar py-1">
            {arrivedProducts?.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white min-w-36 rounded-lg shadow-sm cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="relative h-32 shadow-sm md:h-36 lg:h-40 bg-gray-100 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-t-lg hover:scale-105 transition-all duration-200"
                    style={{
                      backgroundImage: `url('${
                        product.productImages.find((el) => el.isMain === true)
                          ?.url || ""
                      }')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <span
                    onClick={() => handleAddToFavourite(product.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <FiHeart
                      fill={
                        favItems.some((el) => el.product.id === product.id)
                          ? "oklch(70.4% 0.191 22.216)"
                          : "white"
                      }
                      className={`${
                        favItems.some((el) => el.product.id === product.id)
                          ? " text-red-400"
                          : ""
                      } text-gray-400 hover:text-red-400 cursor-pointer`}
                    />
                  </span>
                </div>

                <Link
                  href={`/category/${slugify(product.category)}/${slugify(
                    product.subCategory
                  )}/${slugify(product.name)}?id=${product.id}`}
                  onClick={() => handleRouteProduct(product)}
                  className="flex flex-col px-2 pb-2 sm:px-3 sm:py-3 "
                >
                  <h3 className="truncate overflow-hidden whitespace-nowrap w-full sm:text-[16px] text-sm font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-orange-500 sm:text-[15px] text-sm font-semibold">
                    {`${product.currency} ${product.price
                      .toFixed(2)
                      .toLocaleString()}`}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
