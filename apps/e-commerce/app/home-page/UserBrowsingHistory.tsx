"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import foldedlaptop from "../../public/newArrival/foldedLaptop.png";

const getBrowsingHistory = () => {
  if (typeof window !== "undefined") {
    const history = localStorage.getItem("browsingHistory");
    return history ? JSON.parse(history) : [];
  }
  return [];
};

interface Product {
  id: number;
  name: string;
  image: StaticImageData;
  price: number;
}

// Sample browsing history data
const history: Product[] = [
  {
    id: 1,
    name: "Smartwatch Pro",
    image: foldedlaptop,
    price: 199.99,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    image: foldedlaptop,
    price: 89.99,
  },
  {
    id: 3,
    name: "Gaming Headset",
    image: foldedlaptop,
    price: 129.99,
  },
];

export default function BrowsingHistory() {
  // const [history, setHistory] = useState([]);

  // useEffect(() => {
  //   setHistory(getBrowsingHistory());
  // }, []);

  if (history.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-8 py-12 rounded-xl">
        <motion.h2
          className="text-3xl font-bold text-gray-900 text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 🔄 Recently Viewed */}
          Your Browsing History
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {history.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative w-full h-48">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
