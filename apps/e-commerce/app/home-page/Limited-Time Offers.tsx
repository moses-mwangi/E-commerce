"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Sample Limited-Time Offers
const offers = [
  {
    id: 1,
    name: "Gaming Headset Pro",
    price: "$79.99",
    oldPrice: "$129.99",
    image: "/products/gaming-headset.png",
    discount: "40%",
  },
  {
    id: 2,
    name: "4K Smart TV - 55 inch",
    price: "$499.99",
    oldPrice: "$799.99",
    image: "/products/smart-tv.png",
    discount: "37%",
  },
  {
    id: 3,
    name: "Air Fryer XL",
    price: "$89.99",
    oldPrice: "$149.99",
    image: "/products/airfryer.png",
    discount: "40%",
  },
  {
    id: 4,
    name: "Premium Leather Wallet",
    price: "$29.99",
    oldPrice: "$59.99",
    image: "/products/wallet.png",
    discount: "50%",
  },
];

// Countdown Timer Function
const useCountdown = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return { hours, minutes, seconds };
};

export default function LimitedTimeOffers() {
  const { hours, minutes, seconds } = useCountdown(7200); // 2 hours countdown

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-8">
        <motion.h2
          className="text-4xl font-extrabold text-red-600 text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ⏳ Limited-Time Offers
        </motion.h2>

        <div className="flex justify-center text-lg font-bold text-white bg-red-500 px-6 py-2 rounded-lg mb-8">
          🔥 Hurry! Offer Ends in {hours}h {minutes}m {seconds}s
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="relative w-full h-48">
                <Image
                  src={offer.image}
                  alt={offer.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {offer.name}
              </h3>
              <p className="text-gray-600 mt-1">
                <span className="text-red-600 font-bold">{offer.price}</span>{" "}
                <span className="line-through text-gray-400">
                  {offer.oldPrice}
                </span>
              </p>
              <p className="text-green-500 font-semibold mt-1">
                💰 Save {offer.discount}
              </p>

              <div className="mt-4 flex gap-3">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2">
                  🛒 Buy Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
