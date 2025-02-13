"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import earbuds from "../../public/newArrival/wireless_Earbud.png";

// Sample recommended products data
const recommendedProducts = [
  {
    id: 1,
    name: "Noise-Canceling Earbuds",
    price: "$79.99",
    image: earbuds,
    rating: 4.7,
  },
  {
    id: 2,
    name: "Portable Blender",
    price: "$49.99",
    image: earbuds,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Smart Fitness Band",
    price: "$69.99",
    image: earbuds,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: "$199.99",
    image: earbuds,
    rating: 4.8,
  },
  {
    id: 5,
    name: "4-in-1 Wireless Charger",
    price: "$39.99",
    image: earbuds,
    rating: 4.4,
  },
  {
    id: 6,
    name: "Home Security Camera",
    price: "$149.99",
    image: earbuds,
    rating: 4.7,
  },
];

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.1, type: "spring" },
  }),
};

export default function RecommendedForYou() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-8">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎯 Recommended For You
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recommendedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={fadeInUp}
            >
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-1">{product.price}</p>
              <p className="text-yellow-500 mt-1">⭐ {product.rating}</p>

              <div className="mt-4 flex gap-3">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2">
                  🛒 Add to Cart
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                  🔍 View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
