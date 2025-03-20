"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import fash_1 from "../../../public/category_Image/fash_1.png";
import eletronicSBanner from "../../../public/category_Image/eletronicSBanner.png";
import Navbar from "@/app/home-page/navbar/Navbar";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import { fetchCategories } from "@/redux/slices/categorySlice";
import Category from "./categoryComponents/Category";
import Footer from "@/app/home-page/footer/Footer";

export default function CategoryPage() {
  const { category } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const decodedCategory = decodeURIComponent(String(category));

  const categoryData = categories.find(
    (el) => el.name.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-[320px] bg-gray-900 backsg bg-[url(../public/category_Image/eletronicSBanner.png)] bg-center bg-no-repeat bg-cover">
          {/* <Image
            src={eletronicSBanner || categoryData?.banner}
            alt="{categoryData}"
            fill
            className="object-cover opacity-60"
          /> */}
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                {categoryData?.name}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
                {categoryData?.description}
              </p>
            </div>
          </div> */}
        </div>

        <div className="containehr rounded-lg mt-4 mx-auto px-4 py-3">
          <Category />
        </div>
      </div>
      <Footer />
    </div>
  );
}
