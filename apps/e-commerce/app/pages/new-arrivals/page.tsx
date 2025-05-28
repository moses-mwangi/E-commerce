"use client";

import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Reusable_Category_Sub_Products from "../deals/Reusable_Category_Sub_Products";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import LoadingState from "@/app/components/loaders/LoadingState";
import { differenceInDays } from "date-fns";

export default function NewArrivalsPage() {
  const dispatch: AppDispatch = useDispatch();
  const { push, back } = useRouter();
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

  const [active, setActive] = useState<string | number | null>(
    subCategory[0]?.id || null
  );

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

  const NEW_ARRIVALS = [...products].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const daysAgo = (createdAt: Date | string) => {
    return Number(differenceInDays(new Date(), createdAt));
  };

  return (
    <div>
      {isLoading === true && <LoadingState />}

      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl p-4 sm:px-6 sm:py-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-2xl font-bold">New Arrivals</h1>
          </div>
          <p className="mb-4">
            Discover the latest additions to our collection — fresh, stylish,
            and ready to ship.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-[15px]">
            <div className="bg-white/20  px-2 py-1 sm:py-2 rounded-lg flex items-center gap-2">
              <Truck size={16} />
              <span>Fast & reliable delivery across Kenya</span>
            </div>
          </div>
        </div>

        {NEW_ARRIVALS.length ? (
          <div className="flex items-center justify-start overflow-x-scroll hide-scrollbar gap-4 mb-8">
            {NEW_ARRIVALS.map((arrival) => (
              <div
                key={arrival.id}
                onClick={() => {
                  setIsLoading(true);
                  push(
                    `/category/${arrival.category}/${arrival.subCategory}/${arrival.name}?id=${arrival.id}`
                  );
                }}
                className="border cursor-pointer min-w-52 bg-white sm:min-w-56 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={String(
                      arrival.productImages.find((el) => el.isMain === true)
                        ?.url
                    )}
                    alt={arrival.name}
                    width={300}
                    height={300}
                    className="w-full hover:scale-105 transition-all duration-200 aspect-square object-cover"
                  />

                  <div className="absolute top-2 left-2">
                    <NewArrivalBadge
                      type="Featured"
                      daysSinceAdded={daysAgo(arrival.createdAt)}
                    />
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-1 rounded">
                    <div className="flex justify-between">
                      <span>Sold: {arrival.sold}</span>
                      <span>Stock: {arrival.stock}</span>
                    </div>
                    <div className="w-full bg-gray-300 h-1 mt-1">
                      <div
                        className="bg-red-500 h-1"
                        style={{
                          width: `${
                            (arrival.sold / (arrival.sold + arrival.stock)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-medium line-clamp-2 mb-2">
                    {arrival.name}
                  </h3>

                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-red-600 font-bold text-lg">
                      {`${arrival.currency} ${arrival.price}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
                Offers Products Coming Soon!
              </h3>
              <p className="text-gray-600 mb-6 text-[15px] sm:text-base">
                Our hottest items are currently flying off the shelves! Check
                back soon as we&apos;re restocking these deals products.
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

interface NewArrivalBadgeProps {
  type: string;
  daysSinceAdded: number;
}

const NewArrivalBadge = ({ type, daysSinceAdded }: NewArrivalBadgeProps) => {
  const badgeStyles: { [key: string]: string } = {
    "Just Added": "bg-gradient-to-r from-emerald-500 to-teal-400",
    "New This Week": "bg-gradient-to-r from-blue-500 to-cyan-400",
    "New Arrival": "bg-gradient-to-r from-purple-500 to-pink-400",
    "Brand New": "bg-gradient-to-r from-rose-500 to-pink-400",
  };

  const getTimeText = () => {
    if (daysSinceAdded === 0) return "Just Added";
    if (daysSinceAdded <= 7) return "New This Week";
    if (daysSinceAdded <= 14) return "New Arrival";
    return "Brand New";
  };

  return (
    <div
      className={`${
        badgeStyles[getTimeText()]
      } text-white text-xs font-bold px-2 py-1 rounded-full inline-flex items-center gap-1`}
    >
      <span>🆕</span>
      {getTimeText()} | {type}
    </div>
  );
};
