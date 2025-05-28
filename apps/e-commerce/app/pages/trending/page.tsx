"use client";

import Footer from "@/app/components/footer/Footer";
import LoadingState from "@/app/components/loaders/LoadingState";
import Navbar from "@/app/home-page/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Clock, Flame, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Reusable_Category_Sub_Products from "../deals/Reusable_Category_Sub_Products";

const TRENDING_BANDS = [
  { min: 90, label: "Hot 🔥" },
  { min: 80, label: "Popular ⭐" },
  { min: 70, label: "Trending ↗" },
  { min: 60, label: "Rising ↑" },
  { min: 0, label: "Normal →" },
];

export default function TrendingProductsPage() {
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();
  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);
  const [isLoading, setIsLoading] = useState(false);

  const subCategory = categories
    .flatMap((el) => el.subcategories)
    .map((sub) => {
      const count = products.filter(
        (product) =>
          product.subCategory?.toLowerCase() === sub.name.toLowerCase()
      ).length;

      return { ...sub, productCount: count };
    })
    .sort((a, b) => b.productCount - a.productCount);

  const [active, setActive] = useState<string | number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const activeSub = subCategory.find((sub) => sub.id === active);
  const activeTabProduct =
    active === null
      ? products
      : products.filter(
          (product) =>
            product.subCategory.toLowerCase() === activeSub?.name.toLowerCase()
        );

  const TRENDING_PRODUCTS = products.filter((el) => el.trendingScore >= 60);

  return (
    <div>
      {isLoading === true && <LoadingState />}

      <Navbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl p-4 sm:px-6 sm:py-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Flame size={24} />
            <h1 className="text-2xl font-bold">TRENDING PRODUCTS</h1>
          </div>
          <p className="mb-4">See what’s trending and flying off the shelves</p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base">
            <div className="bg-white/20 px-2 py-1 sm:py-2 rounded-lg flex items-center gap-2">
              <Truck size={16} />
              <span>Affordable delivery rates — no hidden fees</span>
            </div>

            <div className="bg-white/20 px-2 py-1 sm:py-2 rounded-lg flex items-center gap-2">
              <Clock size={16} />
              <span className=" hidden sm:flex">
                Updated hourly based on customer demand
              </span>
              <span className=" sm:hidden">
                Updated based on customer demand
              </span>
            </div>
          </div>
        </div>

        {TRENDING_PRODUCTS.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {TRENDING_PRODUCTS.map((product) => {
              const trendingLevel =
                TRENDING_BANDS.find((b) => product.trendingScore >= b.min)
                  ?.label || "Normal →";

              return (
                <div
                  key={product.id}
                  className="border cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setIsLoading(true);
                    push(
                      `/category/${product.category}/${product.subCategory}/${product.name}?id=${product.id}`
                    );
                  }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={String(
                        product.productImages.find((el) => el.isMain === true)
                          ?.url
                      )}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full hover:scale-105 transition-all duration-200 aspect-square object-cover"
                    />

                    <div className="absolute top-2 left-2">
                      <TrendingBadge
                        type={trendingLevel}
                        score={product.trendingScore}
                      />
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-1 rounded">
                      <div className="flex justify-between">
                        <span>Sold: {product.sold}</span>
                        <span>Stock: {product.stock}</span>
                      </div>
                      <div className="w-full bg-gray-300 h-1 mt-1">
                        <div
                          className="bg-green-500 h-1"
                          style={{
                            width: `${
                              (product.sold / (product.sold + product.stock)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2 mb-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          filled={i < Math.floor(product.ratings)}
                          half={
                            i === Math.floor(product.ratings) &&
                            product.ratings % 1 >= 0.5
                          }
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">
                        ({product.reviews?.length})
                      </span>
                    </div>

                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-primary font-bold text-lg">
                        {`${product.currency} ${product.price}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck size={12} />
                      <span>Shipping Now</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="col-span-full text-center">
            <div className="max-w-md mx-auto">
              <Image
                src="/emptyTred.png"
                alt="No trending products"
                width={200}
                height={200}
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">
                Trending Products Coming Soon!
              </h3>
              <p className="text-gray-600 mb-6 text-[15px] sm:text-base">
                Our hottest items are currently flying off the shelves! Check
                back soon as we&apos;re restocking these popular products.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  className="bg-orange-500/90 hover:bg-orange-600/90 text-sm"
                  onClick={() => {
                    setIsLoading(true);
                    push("/category");
                  }}
                >
                  Browse Other Categories
                </Button>
                <Button
                  className="text-sm"
                  onClick={() => {
                    /* Add newsletter signup or notification function */
                    toast.success("Notified soon");
                  }}
                  variant="outline"
                >
                  Notify Me When Available
                </Button>
              </div>
            </div>
          </div>
        )}

        <Reusable_Category_Sub_Products
          activeTabProduct={activeTabProduct}
          categories={categories}
          subCategory={subCategory}
          active={active}
          setActive={setActive}
        />
      </div>
      <Footer />
    </div>
  );
}

function TrendingBadge({ type, score }: { type: string; score: number }) {
  const badgeStyles: { [key: string]: string } = {
    "Hot 🔥": "bg-gradient-to-r from-red-600 to-pink-500",
    "Popular ⭐": "bg-gradient-to-r from-purple-600 to-indigo-500",
    "Trending ↗": "bg-gradient-to-r from-blue-600 to-cyan-500",
    "Rising ↑": "bg-gradient-to-r from-green-600 to-teal-500",
    "Normal →": "bg-gradient-to-r from-green-600 to-teal-500",
  };

  return (
    <div
      className={`${badgeStyles[type]} text-white text-xs font-bold px-2 py-1 rounded-full`}
    >
      {type} | {score}%
    </div>
  );
}

function StarIcon({ filled, half }: { filled: boolean; half?: boolean }) {
  if (half) {
    return (
      <div className="relative w-3 h-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-3 h-3 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
        <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 text-yellow-400"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={`w-3 h-3 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
