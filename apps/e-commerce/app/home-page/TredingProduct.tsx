import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/redux/slices/productSlice";
import LoadingState from "../components/loaders/LoadingState";

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

  const popularProducts = products;

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
      <section className="sm:py-1 py-4 sm:px-9 bg-white">
        <div className="w-full sm:bg-gray-50 mx-auto px-3 sm:px-6 sm:py-6 rounded-2xl">
          <div className=" flex items-center justify-between mb-2 sm:mb-8">
            <p className=" text-base sm:text-2xl font-semibold text-gray-900">
              Top Ranking
            </p>
            <FaArrowRight size={16} className="sm:hidden font-light" />
          </div>

          <div className="flex gap-3 sm:gap-6 overflow-x-scroll hide-scrollbar py-1">
            {popularProducts?.map((product, index) => (
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

                <div className="flex flex-col items-center px-2 pb-2 sm:px-3 sm:py-3 ">
                  <p className="truncate overflow-hidden whitespace-nowrap sm:text-[16px] text-sm font-semibold text-gray-900">
                    {product.name}
                  </p>
                  <h3 className="truncate overflow-hidden whitespace-nowrap text-sm sm:text-[15px] text-gray-600">
                    Most Popular
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
