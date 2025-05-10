import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import Image from "next/image";
import { ForwardIcon, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import smartSperker from "../../public/newArrival/smartSpeker.png";
import earbuds from "../../public/newArrival/wireless_Earbud.png";
import foldedlaptop from "../../public/newArrival/foldedLaptop.png";
import blender from "../../public/newArrival/blender.png";
import smartwatch from "../../public/newArrival/smart_watch.png";
import tablet from "../../public/newArrival/tablet.png";
import { IoArrowForward } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/redux/slices/productSlice";
import LoadingState from "../components/loaders/LoadingState";
// Sample New Arrivals Data
const newArrivals = [
  {
    id: 1,
    name: "Smart Home Speaker",
    price: "$89.99",
    image: smartSperker,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: "$129.99",
    image: earbuds,
  },
  {
    id: 3,
    name: "Foldable Laptop Stand",
    price: "$49.99",
    image: foldedlaptop,
  },
  {
    id: 4,
    name: "Portable Blender",
    price: "$39.99",
    image: blender,
  },
  {
    id: 5,
    name: "Smartwatch Pro",
    price: "$199.99",
    image: smartwatch,
  },
  {
    id: 6,
    name: "Digital Drawing Tablet",
    price: "$279.99",
    image: tablet,
  },
];

export default function NewArrivals() {
  const { push } = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { products, status } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const arrivedProducts = products;

  const handleRouteProduct = (id: any) => {
    const product = products.find((el) => el.id === Number(id));
    if (product) {
      setIsLoading(true);
      push(
        `/category/${product.category}/${product.subCategory}/${product.name}?id=${product.id}`
      );
    }
  };

  return (
    <>
      {isLoading === true && <LoadingState />}

      <section className="sm:py-10 py-4 sm:px-9 bg-white">
        <div className="w-full sm:bg-gray-50 mx-auto px-3 sm:px-6 sm:py-10 rounded-2xl">
          <div className=" flex items-center justify-between mb-2 sm:mb-8">
            <p className=" text-base font-semibold text-gray-900">
              New arrivals
            </p>
            <FaArrowRight size={16} className="sm:hidden font-light" />
          </div>

          <div className="flex gap-3 sm:gap-6 overflow-x-scroll hide-scrollbar py-1">
            {arrivedProducts?.map((product, index) => (
              <motion.div
                key={product.id}
                onClick={() => handleRouteProduct(product.id)}
                className="bg-white dfhw-full min-w-36 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className=" relative w-full h-32">
                  <Image
                    src={String(
                      product.productImages.find((el) => el.isMain === true)
                        ?.url
                    )}
                    alt={product.name}
                    width={300}
                    height={200}
                    objectFit="cover"
                    className="rounded-t-lg h-28 w-full"
                  />
                </div>

                <div className="flex flex-col px-2 pb-2 sm:px-3 sm:py-3 ">
                  <h3 className="truncate overflow-hidden whitespace-nowrap sm:text-[16px] text-sm font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-orange-500 sm:text-[15px] text-sm font-semibold">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
