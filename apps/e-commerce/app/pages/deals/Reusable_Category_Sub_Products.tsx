"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef } from "react";
// import { HorizontalCategories } from "./page";
import { Separator } from "@/components/ui/separator";
import { Subcategory } from "@/app/types/category";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/app/types/products";

interface Props {
  activeTabProduct: Product[];
  categories: { subcategories: Subcategory[] }[];
  subCategory: Subcategory[];
  active: string | number | null;
  setActive: Dispatch<SetStateAction<string | number | null>>;
}

export default function Reusable_Category_Sub_Products({
  activeTabProduct,
  categories,
  active,
  setActive,
  subCategory,
}: Props) {
  return (
    <div>
      <HorizontalCategories
        categories={categories}
        subCategory={subCategory}
        active={active}
        setActive={setActive}
      />
      <Separator />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-8">
        {activeTabProduct?.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <Image
                src={String(
                  product.productImages.find((el) => el.isMain === true)?.url
                )}
                alt={product.name}
                width={300}
                height={300}
                className="w-full aspect-square object-cover"
              />

              <div className=" hidden absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-1 rounded">
                <div className="flex justify-between">
                  <span>Sold: 200</span>
                  <span>Stock: {product.stock}</span>
                </div>
              </div>
            </div>

            <div className="p-3">
              <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>

              <div className="flex items-end gap-2 mb-2">
                <span className="text-red-600 font-bold text-lg">
                  {`${product.currency} ${product.price.toFixed(2).toString()}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type PartialCategoryProps = Pick<
  Props,
  "categories" | "active" | "setActive" | "subCategory"
>;

export function HorizontalCategories({
  categories,
  active,
  setActive,
  subCategory,
}: PartialCategoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mt-12 mb-3 pl-5">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-scroll hide-scrollbar items-center px-2"
      >
        <p
          onClick={() => {
            setActive(null);
          }}
          className={` cursor-pointer ${
            active === null
              ? "text-black font-bold"
              : "text-gray-600 font-semibold"
          }`}
        >
          All
        </p>
        {subCategory.map((cate) => (
          <div
            key={cate.id}
            className={`flex-shrink-0 py-2 cursor-pointer  whitespace-nowrap relative ${
              active === cate.id
                ? "text-black font-bold"
                : "text-gray-600 font-semibold"
            }`}
            onClick={() => {
              setActive(Number(cate?.id));
            }}
          >
            {cate.name}
            {active === cate.id && (
              <div className="absolute left-0 right-0 -bottom-1 h-0.5 bg-black rounded-full" />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleScrollLeft}
        className="absolute -left-5 top-1/2 -translate-y-1/2 bg-[#f4f4f4] opacity-95 border border-gray-300 rounded-full p-3 shadow hover:bg-gray-100"
      >
        <ChevronLeft size={16} />
      </button>

      <button
        onClick={handleScrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#f4f4f4] opacity-95 border border-gray-300 rounded-full p-3 shadow hover:bg-gray-100"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
