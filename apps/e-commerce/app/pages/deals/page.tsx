"use client";

import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { add } from "date-fns";
import { Clock, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBoltLightning } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import LoadingState from "@/app/components/loaders/LoadingState";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Reusable_Category_Sub_Products from "./Reusable_Category_Sub_Products";

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

  const FLASH_DEALS = products.filter((product) => product.dealPrice > 0);

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
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl p-4 sm:px-6 sm:py-6 mb-8">
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

function CountdownTimer({ endTime }: { endTime: string | Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      // const end = new Date(endTime);
      const end = add(new Date(), { hours: 4 });
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <span className="font-mono">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}
