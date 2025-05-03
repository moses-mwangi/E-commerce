"use client";

import { Category, Subcategory } from "@/app/types/category";
import { Product } from "@/app/types/products";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Cate {
  categories: Category[];
  isCategory: string | null;
  isSubCategory: string | null;
  setIsCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setIsSubCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  subCategories: Subcategory[] | undefined;
  subProducts: Product[];
}

export default function AllCategories({
  categories,
  isCategory,
  isSubCategory,
  setIsCategory,
  setIsSubCategory,
  setIsLoading,
  subCategories,
  subProducts,
}: Cate) {
  const { push } = useRouter();

  return (
    <div className="w-svw grid grid-cols-[1fr_1fr_1.5fr] px-10">
      <div className="overflow-y-scroll overflow-x-hidden h-full max-h-[300px]">
        {categories.map((category, index) => (
          <div key={index}>
            <div
              onMouseEnter={() => {
                setIsCategory(category.name);
                setIsSubCategory(category.subcategories[0].name);
              }}
              onClick={() => {
                setIsLoading(true);
                push(`/category/${category.name}`);
              }}
              className="py-1 cursor-pointer w-full text-[15px]"
            >
              <p
                className={`py-2 w-full flex-grow px-5 cursor-pointer ${
                  category.name === isCategory
                    ? "bg-gray-100 text-gray-900 font-medium scale-105 transition-all duration-300"
                    : ""
                }`}
              >
                {category.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-full max-h-[300px]">
        <div className="overflow-y-scroll overflow-x-hidden h-full">
          <Link
            href={`/category/${isCategory}`}
            onClick={() => setIsLoading(true)}
            className="text-[15px] font-semibold px-2 flex gap-2 hover:underline hover:text-blue-500 transition-all duration-200 items-center py-3"
          >
            {isCategory} <ArrowRightIcon size={20} />
          </Link>
          {subCategories?.map((subCategory, index) => (
            <div key={index}>
              <div
                className="py-1 cursor-pointer text-gray-700 w-full text-[15px]"
                onClick={() => {
                  setIsLoading(true);
                  push(`/category/${isCategory}/${subCategory.name}`);
                }}
                onMouseEnter={() => {
                  setIsSubCategory(subCategory.name);
                }}
              >
                <p
                  className={`py-2 w-full flex-grow px-5 cursor-pointer ${
                    subCategory.name === isSubCategory
                      ? "bg-gray-100 text-gray-900 font-medium scale-105 transition-all duration-300"
                      : ""
                  }`}
                >
                  {subCategory.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mr-4 overflow-y-scroll overflow-x-hidden h-full max-h-[300px]">
        <Link
          href={`/category/${isCategory}/${isSubCategory}`}
          onClick={() => setIsLoading(true)}
          className="text-[15px] font-semibold px-2 flex gap-2 hover:underline hover:text-blue-500 transition-all duration-200 items-center py-3"
        >
          {isSubCategory} <ArrowRightIcon size={20} />
        </Link>
        <div className="w-auto grid grid-cols-4 px-1 items-center justify-between">
          {subProducts?.map((subProduct, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setIsLoading(true);
                push(
                  `/category/${isCategory}/${isSubCategory}/${subProduct.name}?id=${subProduct.id}`
                );
              }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full">
                  <Image
                    src={String(
                      subProduct.productImages.find(
                        (image) => image.isMain === true
                      )?.url
                    )}
                    alt={subProduct.name}
                    width={40}
                    height={40}
                    className="h-full w-full rounded-full"
                  />
                </div>
                <p className="text-[15px] text-gray-700 flex text-center flex-wrap">
                  {subProduct.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
