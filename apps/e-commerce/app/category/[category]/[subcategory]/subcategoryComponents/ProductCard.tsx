import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, Eye, ShoppingCart } from "lucide-react";
// import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Product } from "../../categoryComponents/product";
import { Card, CardContent } from "@/components/ui/card";
// import { Product } from "../product";

interface ProductCardProps {
  product: Product;
  view: string;
}

export function ProductCard({ product, view }: ProductCardProps) {
  const { category, subcategory } = useParams();

  if (view === "list") {
    return (
      <div className="">
        <Card
          className={`grid ${" grid-cols-3 gap-3 h-auto"}   hover:cursor-pointer gap-2  bg-white dark:bg-gray-800 shadow-lg rounded-xl`}
          key={product.id}
        >
          <div
            className={`group ${" h-[260px] rounded-b-none rounded-t-md"} bg-gray-200 relative dark:bg-gray-700 overflow-hidden hover:cursor-pointer`}
          >
            <Image
              className="h-full w-full hover:scale-110 transition-all duration-200 object-cover"
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={300}
            />

            <Button
              // onClick={() => handleAddToFavourite(product.id)}
              className="bg-gray-100/65 hover:bg-gray-100 absolute top-2 right-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Heart className="w-6 h-6 text-red-500" />
            </Button>
          </div>

          <CardContent
            className={`${view ? " p-4" : "p-2"} flex flex-col justify-between`}
          >
            <div className={`${view ? "space-y-[14px]" : "space-y-1"}`}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mt-2 text-lg font-semibold">
                <p className="text-gray-800 dark:text-gray-200">
                  ${product.price}
                </p>
                {/* {product.discount > 0 && (
                  <p className="text-red-500 bg-red-100 dark:bg-red-900 px-2 py-1 text-xs rounded-md">
                    -{product.}%
                  </p>
                )} */}
              </div>

              <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < product.rating
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  />
                ))}
                <span className="ml-1">({product.rating})</span>
              </div>

              <div
                className={`${
                  view ? " grid-cols-1" : "grid-cols-3"
                } mt-2 text-sm grid `}
              >
                {/* {product.specifications
                  ?.slice(0, 6)
                  .map((spec: any, idx: any) => (
                    <div className="flex gap-1" key={idx}>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {spec.key}:
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {spec.value}
                      </p>
                    </div>
                  ))} */}
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 flex items-center gap-2 shadow-md"
                // onClick={() => handleAddToCart(product.id)}
              >
                <ShoppingCart /> Add to Cart
              </Button>
              <Button
                className="w-full flex items-center gap-2 border-gray-300 dark:border-gray-600 shadow-md"
                variant="outline"
                // onClick={() => handleRoute(product.id)}
              >
                <Eye /> Quick View
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* ))} */}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <Link
        href={`/category/${product.category}/${subcategory}/${product.name}`}
        className="block"
      >
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
