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
import {
  fetchProductById,
  fetchProducts,
  searchProducts,
  filterProducts,
} from "@/redux/slices/productSlice";
import LoadingState from "@/app/components/loaders/LoadingState";

const categories = [
  {
    name: "Fashion",
    icon: fash_1,
    color: "from-pink-500 to-red-500",
  },
  {
    name: "Electronics",
    icon: electronics,
    color: "from-blue-500 to-purple-500",
  },
  {
    name: "Beauty",
    icon: beauty,
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "Kitchen",
    icon: kitchen,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Fitness",
    icon: fitness,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Gaming",
    icon: gaming,
    color: "from-indigo-500 to-blue-500",
  },
];

export default function ProductCategories() {
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();
  const { filteredProduct, searchProduct, products } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch: AppDispatch = useDispatch();
  const pro = products.map((el) => el.category);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <LoadingState />}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-8 py-14 rounded-2xl">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-12">
            Explore Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map((category, index) => (
              <div
                onClick={() => {
                  setIsLoading(true);
                  push(
                    `/pages/${category.name
                      .at(0)
                      ?.toLowerCase()}${category.name.slice(1)}`
                  );
                }}
                key={index}
                className={`flex bg-slate-50  flex-col items-center p-6 rounded-xl shadow-md cursor-pointer transform hover:scale-105 transition-all duration-300`}
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Image
                    className=" w-full h-full rounded-full"
                    src={category.icon}
                    alt={category.name}
                    width={60}
                    height={60}
                  />
                </div>
                <p className="mt-4 text-gray-800 font-semibold text-[17px]">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
