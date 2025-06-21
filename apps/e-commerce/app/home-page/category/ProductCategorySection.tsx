"use client";

import LoadingState from "@/app/components/loaders/LoadingState";
import { Card } from "@/components/ui/card";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoriesSection = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { categories, status } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  return (
    <>
      {isLoading === true && <LoadingState />}
      <div className="mx-auto sm:px-6 md:7 lg:px-9 pt-4 sm:pt-7">
        {/* Categories Section */}
        <div className=" sm:bg-[#f4f4f4] px-3 sm:px-6 py-3 sm:py-5 sm:rounded-2xl">
          <h2 className=" text-base sm:text-2xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-6">
            Shop by Category
          </h2>
          <div className="overflow-x-auto sm:overflow-x-hidden hide-scrollbar py-1 flex space-x-3 sm:space-x-0 sm:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                onClick={() => {
                  setIsLoading(true);
                  router.push(`/category/${category.name}`);
                }}
                className="flex-shrink-0 group sm:bg-white bg-gray-50/60 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex gap-2 sm:gap-0 sm:flex-col items-center cursor-pointer border border-gray-100 hover:border-blue-200"
              >
                <span className="sm:text-3xl text-2xl sm:mb-2">
                  {category.icon}
                </span>
                <div className="flex flex-col">
                  <h3 className="font-medium text-[14px] sm:text-base text-gray-800 text-center">
                    {category.name}
                  </h3>
                  <span className="text-sm text-gray-500 mt-1 sm:text-center">
                    {category.itemCount}+ items
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesSection;
