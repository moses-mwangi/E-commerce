"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Mic,
  TrendingUp,
  Star,
  Truck,
  Shield,
  HelpCircle,
  ShoppingBag,
  Search,
  ChevronRight,
} from "lucide-react";
import LoadingState from "@/app/components/loaders/LoadingState";
import { Card } from "@/components/ui/card";

// Product images
import featuredProduct from "../../../public/newArrival/smartSpeker.png";
import secondaryProduct from "../../../public/category_Image/beauty.png";
import product3 from "../../../public/fashion/image.png";
import product4 from "../../../public/newArrival/foldedLaptop.png";
import ModernEcommerceSearch from "@/app/home-page/navbar/search/ModernEcommerceSearch2";

const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  },
  imageScale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  float: {
    y: [0, -15, 0],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    },
  },
};

const features = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Trending Products",
    description: "Discover what's hot right now",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Best Deals",
    description: "Up to 50% off on selected items",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Fast Delivery",
    description: "Free shipping on orders over $50",
    color: "bg-emerald-100 text-emerald-600",
  },
];

const mobileCategories = [
  {
    icon: <TrendingUp className="w-4 h-4" />,
    title: "Trending",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Star className="w-4 h-4" />,
    title: "Deals",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: <ShoppingBag className="w-4 h-4" />,
    title: "New Arrivals",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <Truck className="w-4 h-4" />,
    title: "Delivery",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: <Shield className="w-4 h-4" />,
    title: "Security",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <HelpCircle className="w-4 h-4" />,
    title: "Support",
    color: "bg-indigo-100 text-indigo-600",
  },
];

const MobileHeroSection = () => {
  return (
    <div className="sm:hidden w-full pt-4 px-3">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl py-6 px-4 mb-4 relative">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-200 rounded-full opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">
            Smart <span className="text-orange-600">Shopping</span>
          </h1>
          <p className="text-gray-600 mb-4">Discover amazing deals today</p>

          <div className="z-50 mb-3">
            <ModernEcommerceSearch />
          </div>
          <Button className="w-full bg-orange-600 hover:bg-orange-700">
            <ShoppingBag className="mr-2 w-4 h-4" />
            Shop Now
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto hide-scrollbar pt-2">
        <div className="flex space-x-3">
          {mobileCategories.map((item, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Card className="p-3 flex items-center space-x-2 rounded-md">
                <div className={`${item.color} p-2 rounded-lg`}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.title}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  const products = [
    {
      name: "Premium Smart Speaker",
      description: "Voice-controlled with premium sound quality",
      price: 199.99,
      discountPrice: 169.99,
      image: featuredProduct,
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
    },
    {
      name: "Beauty Essentials Kit",
      description: "All your skincare needs in one package",
      price: 89.99,
      discountPrice: 69.99,
      image: secondaryProduct,
      colors: ["#FF9F1C", "#FF70A6", "#9775FA"],
    },
  ];

  const showLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <>
      {isLoading && <LoadingState />}
      <MobileHeroSection />

      <section className="hidden sm:block relative min-h-[90vh] bg-gradient-to-br from-orange-50 via-white to-amber-50 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300 rounded-full blur-3xl opacity-20" />
          <div className="absolute top-1/2 left-1/2 w-full h-96 bg-gradient-radial from-orange-100 to-transparent opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={animations.stagger}
            >
              <motion.div className="space-y-4" variants={animations.fadeInUp}>
                <div className="inline-flex items-center bg-white px-3 py-1 rounded-full text-sm font-medium mb-3 shadow-sm border border-orange-100">
                  <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
                  Summer Sale Live Now
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Discover
                  <span className="text-orange-600 block">Smart Shopping</span>
                  Experience
                </h1>
                <p className="text-lg text-gray-600 max-w-xl">
                  Experience the future of shopping with AI-powered
                  recommendations, personalized deals, and seamless checkout.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                variants={animations.fadeInUp}
              >
                <Button
                  size="lg"
                  onClick={showLoading}
                  className="h-10 px-6 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-lg transition-all duration-300 group"
                >
                  <ShoppingBag className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  {/* 🛍️ */}
                  <span>Shop Now</span>
                  <ChevronRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
                <Button
                  size="lg"
                  onClick={showLoading}
                  className="h-10 px-6 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-lg transition-all duration-300 group"
                >
                  <span>Explore category</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-10 px-6 border-2 hover:bg-orange-50 transition-colors"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("openVoiceSearch"))
                  }
                >
                  <Mic className="mr-2 w-5 h-5" />
                  Voice Search
                </Button>
              </motion.div>

              <motion.div
                className="grid sm:grid-cols-3 gap-6 pt-4"
                variants={animations.fadeInUp}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-orange-50 hover:shadow-md transition-all"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`${feature.color} w-10 h-10 rounded-lg flex items-center justify-center mb-[14px]`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-[2px]">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-6 pt-4"
                variants={animations.fadeInUp}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">
                    10K+ Happy Customers
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Product showcase */}
            <motion.div
              className="relative hidden md:block"
              initial="hidden"
              animate="visible"
              variants={animations.imageScale}
            >
              <div className="relative aspect-square max-w-[600px] mx-auto">
                {/* Main product */}
                <motion.div
                  className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50" />
                  <div className="relative w-full h-full p-8 flex items-center justify-center">
                    <motion.div
                      className="relative w-full h-full"
                      animate={animations.float}
                    >
                      <Image
                        src={products[activeProduct].image}
                        alt={products[activeProduct].name}
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-6 border-t border-orange-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {products[activeProduct].name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {products[activeProduct].description}
                        </p>
                        <div className="flex mt-2 space-x-2">
                          {products[activeProduct].colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-5 h-5 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        {products[activeProduct].discountPrice ? (
                          <>
                            <span className="text-xl font-bold text-gray-900">
                              $
                              {products[activeProduct].discountPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through block">
                              ${products[activeProduct].price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">
                            ${products[activeProduct].price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating product 1 */}
                <motion.div
                  className="absolute -right-8 top-1/4 bg-white rounded-xl shadow-lg p-4 w-40 cursor-pointer"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5 }}
                  onClick={() => setActiveProduct(0)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="mb-2 h-24 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Image
                      src={product3}
                      alt="Headphones"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm truncate">
                      Wireless Headphones
                    </p>
                    <p className="text-xs text-gray-500">$199.99</p>
                  </div>
                </motion.div>

                {/* Floating product 2 */}
                <motion.div
                  className="absolute -left-8 bottom-1/4 bg-white rounded-xl shadow-lg p-4 w-40 cursor-pointer"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  onClick={() => setActiveProduct(1)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="mb-2 h-24 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Image
                      src={product4}
                      alt="Smartwatch"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm truncate">
                      Smart Watch Pro
                    </p>
                    <p className="text-xs text-gray-500">$249.99</p>
                  </div>
                </motion.div>

                {/* Floating discount badge */}
                <motion.div
                  className="absolute -bottom-4 right-8 bg-orange-600 text-white px-4 py-2 rounded-full shadow-xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="flex items-center">
                    <span className="font-bold">50% OFF</span>
                    <span className="mx-1">|</span>
                    <span className="text-sm">Today Only</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
