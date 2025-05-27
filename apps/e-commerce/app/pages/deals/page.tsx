"use client";

import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import { Category, Subcategory } from "@/app/types/category";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { add } from "date-fns";
import { ChevronLeft, ChevronRight, Clock, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { GiLightningFlame } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";

import imgs from "../../../public/newArrival/foldedLaptop.png";
import { Console } from "console";
import Reusable_Category_Sub_Products from "./Reusable_Category_Sub_Products";

const FLASH_DEALS = [
  {
    id: 1,
    title: "Wireless Earbuds Pro",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    sold: 78,
    stock: 22,
    image: "/earbuds.jpg",
    shipping: "Free shipping",
    expiry: "2024-06-30T23:59:59", // ISO format
  },
  {
    id: 2,
    title: "Wireless Earbuds Pro",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    sold: 78,
    stock: 22,
    image: "/earbuds.jpg",
    shipping: "Free shipping",
    expiry: "2024-06-30T23:59:59", // ISO format
  },
  {
    id: 3,
    title: "Wireless Earbuds Pro",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    sold: 78,
    stock: 22,
    image: "/earbuds.jpg",
    shipping: "Free shipping",
    expiry: "2024-06-30T23:59:59", // ISO format
  },
  {
    id: 4,
    title: "Wireless Earbuds Pro",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    sold: 78,
    stock: 22,
    image: "/earbuds.jpg",
    shipping: "Free shipping",
    expiry: "2024-06-30T23:59:59", // ISO format
  },
  {
    id: 5,
    title: "Wireless Earbuds Pro",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    sold: 78,
    stock: 22,
    image: "/earbuds.jpg",
    shipping: "Free shipping",
    expiry: "2024-06-30T23:59:59",
  },
  // 5-10 more deals...
];

const DISCOUNT_BANDS = [
  { min: 40, label: "Super Deal" },
  { min: 30, label: "Hot Deal" },
  { min: 20, label: "Special Offer" },
  { min: 10, label: "Limited Time" },
];

export default function FlashDealsPage() {
  const dispatch: AppDispatch = useDispatch();
  const { push, back } = useRouter();
  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);

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
      <Navbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl p-4 sm:px-6 sm:py-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <GiLightningFlame size={24} />
            <h1 className="text-2xl font-bold">FLASH DEALS</h1>
          </div>
          <p className="mb-4">
            Score the lowest prices with limited-time offers
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg flex items-center gap-2">
              <Truck size={16} />
              <span>FREE shipping capped at $25</span>
            </div>

            <div className="bg-white/20 p-2 rounded-lg flex items-center gap-2">
              <Clock size={16} />
              <span>
                Ending in: <CountdownTimer endTime="2024-06-30T23:59:59" />
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {FLASH_DEALS.map((deal) => {
            const dealType =
              DISCOUNT_BANDS.find((b) => deal.discount >= b.min)?.label ||
              "Deal";

            return (
              <div
                key={deal.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src="/newArrival/foldedLaptop.png"
                    // src={deal.image}
                    alt={deal.title}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover"
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
                    {deal.title}
                  </h3>

                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-red-600 font-bold text-lg">
                      ${deal.price}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ${deal.originalPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck size={12} />
                    <span>{deal.shipping}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
