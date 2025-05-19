import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/redux/slices/productSlice";
import LoadingState from "../../components/loaders/LoadingState";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import useCategoryContex from "@/hooks/useCategoryContex";

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

  const popularProducts = products;

  const handleRouteProduct = (id: any) => {
    setIsLoading(true);
  };

  return (
    <>
      {isLoading === true && <LoadingState />}
      <section className="sm:py-7 py-4 sm:px-6 md:px-9 bg-white">
        <div className="w-full sm:bg-[#f4f4f4] mx-auto px-3 sm:px-6 sm:py-5 rounded-2xl">
          <div className="flex items-center sm:items-start justify-between mb-2 sm:mb-4">
            <div>
              <p className=" text-base sm:text-2xl font-semibold text-gray-900">
                Top Ranking
              </p>
              <p className="hidden sm:flex text-[16px] text-gray-600">
                Navigate the treding product with data-driven rankings
              </p>
            </div>
            <FaArrowRight size={16} className="md:hidden font-light" />
          </div>

          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 overflow-x-scroll hide-scrollbar py-1">
            {popularProducts?.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white dfhw-full min-w-36 rounded-lg shadow-sm cursor-pointer group"
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
                  href={`/category/${product.category}/${product.subCategory}/${product.name}?id=${product.id}`}
                  onClick={() => handleRouteProduct(product.id)}
                  className="flex flex-col items-center  px-2 pb-2 sm:px-3 sm:py-3 "
                >
                  <p className="truncate hover:text-orange-500 transition-all duration-200  w-full text-center overflow-hidden whitespace-nowrap sm:text-[16px] text-sm font-semibold text-gray-900">
                    {product.name}
                  </p>
                  <h3 className="truncate w-full text-center overflow-hidden whitespace-nowrap text-sm sm:text-[15px] text-gray-600">
                    Most Popular
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
