"use client";

import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Clock, Flame, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Reusable_Category_Sub_Products from "../deals/Reusable_Category_Sub_Products";

const TRENDING_PRODUCTS = [
  {
    id: 1,
    title: "Wireless Earbuds Pro",
    price: 59.99,
    rating: 4.8,
    reviews: 1245,
    sold: 1024,
    stock: 156,
    image: "/earbuds.jpg",
    shipping: "Free shipping",
    trendingScore: 95, // out of 100
  },
  {
    id: 2,
    title: "Smart Watch Series 5",
    price: 199.99,
    rating: 4.6,
    reviews: 892,
    sold: 756,
    stock: 89,
    image: "/smartwatch.jpg",
    shipping: "Free shipping",
    trendingScore: 87,
  },
  {
    id: 3,
    title: "Foldable Bluetooth Keyboard",
    price: 45.99,
    rating: 4.4,
    reviews: 567,
    sold: 489,
    stock: 72,
    image: "/keyboard.jpg",
    shipping: "Free shipping",
    trendingScore: 82,
  },
  {
    id: 4,
    title: "Portable SSD 1TB",
    price: 129.99,
    rating: 4.9,
    reviews: 2103,
    sold: 1842,
    stock: 261,
    image: "/ssd.jpg",
    shipping: "Free shipping",
    trendingScore: 98,
  },
  {
    id: 5,
    title: "Noise Cancelling Headphones",
    price: 179.99,
    rating: 4.7,
    reviews: 1532,
    sold: 1208,
    stock: 324,
    image: "/headphones.jpg",
    shipping: "Free shipping",
    trendingScore: 91,
  },
];

const TRENDING_BANDS = [
  { min: 90, label: "Hot 🔥" },
  { min: 80, label: "Popular ⭐" },
  { min: 70, label: "Trending ↗" },
  { min: 60, label: "Rising ↑" },
];

export default function TrendingProductsPage() {
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl p-4 sm:px-6 sm:py-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Flame size={24} />
            <h1 className="text-2xl font-bold">TRENDING PRODUCTS</h1>
          </div>
          <p className="mb-4">Discover what everyone is loving right now</p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg flex items-center gap-2">
              <Truck size={16} />
              <span>FREE shipping capped at $25</span>
            </div>

            <div className="bg-white/20 p-2 rounded-lg flex items-center gap-2">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {TRENDING_PRODUCTS.map((product) => {
            const trendingLevel =
              TRENDING_BANDS.find((b) => product.trendingScore >= b.min)
                ?.label || "Popular";

            return (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src="/newArrival/foldedLaptop.png"
                    // src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover"
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
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < Math.floor(product.rating)}
                        half={
                          i === Math.floor(product.rating) &&
                          product.rating % 1 >= 0.5
                        }
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">
                      ${product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck size={12} />
                    <span>{product.shipping}</span>
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

function TrendingBadge({ type, score }: { type: string; score: number }) {
  const badgeStyles: { [key: string]: string } = {
    "Hot 🔥": "bg-gradient-to-r from-red-600 to-pink-500",
    "Popular ⭐": "bg-gradient-to-r from-purple-600 to-indigo-500",
    "Trending ↗": "bg-gradient-to-r from-blue-600 to-cyan-500",
    "Rising ↑": "bg-gradient-to-r from-green-600 to-teal-500",
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
