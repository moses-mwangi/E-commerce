"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";

// Demo product data (you would typically fetch this from an API)
const product = {
  id: "1",
  name: "Premium Wireless Headphones",
  description:
    "Experience superior sound quality with our premium wireless headphones. Features active noise cancellation, long battery life, and comfortable design.",
  price: 299.99,
  originalPrice: 399.99,
  images: [
    "/products/headphones-1.jpg",
    "/products/headphones-2.jpg",
    "/products/headphones-3.jpg",
    "/products/headphones-4.jpg",
  ],
  category: "electronics",
  subcategory: "audio",
  rating: 4.8,
  reviews: 256,
  stock: 15,
  specifications: {
    "Battery Life": "Up to 30 hours",
    "Bluetooth Version": "5.0",
    "Noise Cancellation": "Active",
    "Driver Size": "40mm",
    Weight: "250g",
  },
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Quick charging - 5 hours in 10 minutes",
    "Bluetooth 5.0 connectivity",
    "Built-in voice assistant",
  ],
  colors: ["Black", "Silver", "Midnight Blue"],
  sizes: null,
};

export default function SingleSuCategoricalProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="">
      <div className="min-h-screen bg-gray-50d">
        <div className="flex items-center text-sm px-6 py-8">
          <Link
            href={`/category/${product.category}`}
            className="text-gray-500 hover:text-gray-900"
          >
            Categories
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link
            href={`/category/${product.category}`}
            className="text-gray-500 hover:text-gray-900 capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link
            href={`/category/${product.category}/${product.subcategory}`}
            className="text-gray-500 hover:text-gray-900 capitalize"
          >
            {product.subcategory}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Label className="text-gray-900 capitalize">{product.name}</Label>
        </div>
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-white ${
                      selectedImage === index
                        ? "ring-2 ring-blue-600"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < product.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.reviews} reviews
                  </span>
                </div>
              </div>

              <p className="text-gray-600">{product.description}</p>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 rounded-full border ${
                          selectedColor === color
                            ? "border-blue-600 text-blue-600"
                            : "border-gray-300 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Quantity</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button className="flex-1">Add to Cart</Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm">Free shipping</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">2-year warranty</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RefreshCw className="w-5 h-5" />
                  <span className="text-sm">30-day returns</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="border-t pt-8">
                <h3 className="font-medium text-gray-900 mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
