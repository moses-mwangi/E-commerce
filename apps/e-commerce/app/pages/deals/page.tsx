"use client";

import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { add } from "date-fns";
import { Clock, Clock1, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBoltLightning } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import LoadingState from "@/app/components/loaders/LoadingState";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Reusable_Category_Sub_Products from "./Reusable_Category_Sub_Products";
import { FaFire } from "react-icons/fa";
import { GiLightningFlame } from "react-icons/gi";
import { BsShieldLock } from "react-icons/bs";
import Reccomeded from "@/app/home-page/recommedation/RecommedationProduct";

const DISCOUNT_BANDS = [
  { min: 40, label: "Super Deal" },
  { min: 30, label: "Hot Deal" },
  { min: 20, label: "Special Offer" },
  { min: 10, label: "Limited Time" },
];

export default function FlashDealsPage() {
  const dispatch: AppDispatch = useDispatch();
  const { push, back } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);

  // const FLASH_DEALS = products.filter((product) => product.dealPrice > 0);
  const FLASH_DEALS = products;

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

  return (
    <div>
      {isLoading === true && <LoadingState />}

      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className=" hidden sm:block bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl p-4 sm:px-6 sm:py-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <FaBoltLightning size={24} />
            <h1 className="text-2xl font-bold">FLASH DEALS</h1>
          </div>

          <p className="mb-4">
            Grab unbeatable & hottest deals before they’re gone
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base">
            <div className="bg-white/20 px-2 py-1 sm:py-2 rounded-lg flex items-center gap-2">
              <Truck size={16} />
              <span>Secure packaging & timely delivery</span>
            </div>

            <div className="bg-white/20 px-2 py-1 sm:py-2 rounded-lg flex items-center gap-2">
              <Clock size={16} />
              <span>
                Ending in: <CountdownTimer endTime="2025-06-30T23:59:59" />
              </span>
            </div>
          </div>
        </div>

        <div className="sm:hidden mb-6">
          <div className="bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-lg p-4 shadow-lg relative overflow-hidden">
            <GiLightningFlame className="absolute -top-2 -right-2 text-white/10 text-6xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <FaBoltLightning
                  size={20}
                  className="text-yellow-300 animate-pulse"
                />
                <h1 className="text-xl font-bold">FLASH SALE</h1>
              </div>

              <p className="text-sm mb-3">Unbeatable deals ending soon!</p>

              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>HURRY!</span>
                  <span>
                    <CountdownTimer
                      endTime="2025-06-30T23:59:59"
                      className="font-mono bg-white/20 px-2 py-0.5 rounded"
                    />
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div
                    className="bg-yellow-400 h-1.5 rounded-full"
                    style={{ width: `${calculateTimePercentage()}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex overflow-x-auto gap-2 pb-1 hide-scrollbar">
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs flex items-center gap-1 whitespace-nowrap">
                  <FaBoltLightning size={12} />
                  50-80% OFF
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs flex items-center gap-1 whitespace-nowrap">
                  <Truck size={12} />
                  Free shipping
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs flex items-center gap-1 whitespace-nowrap">
                  <BsShieldLock size={12} />
                  Secure checkout
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-500/10 text-red-700 px-3 py-2 rounded-lg mt-2 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1">
              <FaFire size={12} />
              <span>Only 23 left at this price!</span>
            </span>
            <span className="font-medium">🔥 HOT</span>
          </div>
        </div>

        {FLASH_DEALS.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {FLASH_DEALS.map((deal) => {
              const dealType =
                DISCOUNT_BANDS.find((b) => deal.discount >= b.min)?.label ||
                "Deal";

              return (
                <div
                  key={deal.id}
                  className="border rounded-lg cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setIsLoading(true);
                    push(
                      `/category/${deal.category}/${deal.subCategory}/${deal.name}?id=${deal.id}`
                    );
                  }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={String(
                        deal.productImages.find((el) => el.isMain === true)?.url
                      )}
                      alt={deal.name}
                      width={300}
                      height={300}
                      className="w-full hover:scale-105 transition-all duration-200 aspect-square object-cover"
                    />

                    <div className="absolute top-2 left-2">
                      <DealBadge type={dealType} discount={deal.discount} />
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-1 rounded">
                      <div className="flex justify-between">
                        <span>Sold: {deal.sold}</span>
                        <span>Stock: {deal.stock}</span>
                      </div>
                      <div className="w-full bg-gray-300 h-1 mt-1">
                        <div
                          className="bg-red-500 h-1"
                          style={{
                            width: `${
                              (deal.sold / (deal.sold + deal.stock)) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2 mb-2">
                      {deal.name}
                    </h3>

                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-red-600 font-bold text-lg">
                        {`${deal.currency} ${deal.price}`}
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        {`${deal.originalPrice}`}
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

        {/* <Reusable_Category_Sub_Products
          activeTabProduct={activeTabProduct}
          categories={categories}
          subCategory={subCategory}
          active={active}
          setActive={setActive}
        /> */}
        <Reccomeded />
      </div>
      <Footer />
    </div>
  );
}

function DealBadge({ type, discount }: { type: string; discount: number }) {
  const badgeStyles: { [key: string]: string } = {
    "Super Deal": "bg-gradient-to-r from-red-600 to-orange-500",
    "Hot Deal": "bg-gradient-to-r from-orange-500 to-amber-500",
    "Special Offer": "bg-gradient-to-r from-amber-500 to-yellow-400",
    "Limited Time": "bg-gradient-to-r from-blue-500 to-cyan-400",
  };

  return (
    <div
      className={`${badgeStyles[type]} text-white text-xs font-bold px-2 py-1 rounded-full`}
    >
      {discount}% OFF | {type}
    </div>
  );
}

interface CountdownTimerProps {
  endTime: string;
  className?: string;
}

function CountdownTimer({ endTime, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  function calculateTimeLeft() {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor(difference / 1000 / 60) % 60,
      seconds: Math.floor(difference / 1000) % 60,
    };
  }

  return (
    <span className={className}>
      {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
    </span>
  );
}

function calculateTimePercentage() {
  const end = new Date("2025-06-30T23:59:59").getTime();
  const now = new Date().getTime();
  const start = new Date("2025-06-28T00:00:00").getTime(); // Adjust start date as needed
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
}
