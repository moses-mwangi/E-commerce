/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import aismartwatch from "../../../public/images/ai-smartwatch.png";
// import aiBgHero from "../../../public/images/ai-bg-hero.png";

interface Product {
  id: number;
  name: string;
  image: StaticImageData;
}

export default function Recomedation() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      { id: 1, name: "AI Smartwatch", image: aismartwatch },
      { id: 2, name: "Wireless Earbuds", image: aismartwatch },
      { id: 3, name: "Smart Home Hub", image: aismartwatch },
    ]);
  }, []);

  return (
    <div className=" absolute -bottom-32 right-72 w-[70%] h-auto z-50">
      <div>
        <Card className=" w-full h-auto">
          <div
            className="flex overflow-x-auto justify-between"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ duration: 1 }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 p-6 rounded-xl shadow-lg min-w-[180px] text-center"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="rounded-lg"
                />
                <p className="mt-3 text-lg font-semibold">{product.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
