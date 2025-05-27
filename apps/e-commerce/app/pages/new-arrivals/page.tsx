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
  {
    id: 6,
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
  {
    id: 7,
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
  {
    id: 8,
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

export default function NewArrivalsPage() {
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl p-4 sm:px-6 sm:py-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-2xl font-bold">New Arrivals</h1>
          </div>
          <p className="mb-4">Stay ahead with the latest products offerings</p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg flex items-center gap-2">
              <Truck size={16} />
              <span>FREE shipping capped at $25</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start overflow-x-scroll hide-scrollbar gap-4 mb-8">
          {FLASH_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="border min-w-52 bg-white sm:min-w-56 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="">
                <Image
                  src="/newArrival/foldedLaptop.png"
                  alt={deal.title}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover"
                />
              </div>

              <div className="p-3">
                <h3 className="font-medium line-clamp-2 mb-2">{deal.title}</h3>

                <div className="flex items-end gap-2 mb-2">
                  <span className="text-red-600 font-bold text-lg">
                    {`$${deal.price}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
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
