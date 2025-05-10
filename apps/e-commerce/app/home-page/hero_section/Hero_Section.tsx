"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import smartWatchs from "../../../public/newArrival/smartSpeker.png";
import smartWatchb from "../../../public/category_Image/beauty.png";
import {
  Mic,
  TrendingUp,
  Star,
  Truck,
  Shield,
  HelpCircle,
  ListOrdered,
} from "lucide-react";
import LoadingState from "@/app/components/loaders/LoadingState";
import { Card } from "@/components/ui/card";
import { FaListUl } from "react-icons/fa";
import { FcDataProtection } from "react-icons/fc";

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
};

const features = [
  {
    icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
    title: "Trending Products",
    description: "Discover what's hot right now",
  },
  {
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    title: "Best Deals",
    description: "Up to 50% off on selected items",
  },
  {
    icon: <Truck className="w-5 h-5 text-green-500" />,
    title: "Fast Delivery",
    description: "Free shipping on orders over $50",
  },
];

const mobile = [
  {
    icon: <FaListUl className="w-4 h-4 text-orange-500" />,
    title: "All categories",
    color: "or",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
    title: "Trending Products",
    color: "",
  },
  {
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    title: "Best Deals",
    color: "blu",
  },
  {
    icon: <Truck className="w-5 h-5 text-green-500" />,
    title: "Fast Delivery",
    color: "gr",
  },
  {
    icon: <HelpCircle className="w-5 h-5 text-green-500" />,
    title: "Help Center",
    color: "gr",
  },

  {
    icon: <FcDataProtection className="w-5 h-5 text-green-500" />,
    title: "Protection",
    color: "gr",
  },
];

const MobileHeroSection: React.FC = () => {
  return (
    <div className=" sm:hidden w-full flex flex-col gap-2 rounded-sm p-3 ">
      <p className=" text-[15px] font-semibold">For your busines</p>
      <div className=" overflow-x-scroll flex cursor-pointer  gap-3 sm:gap-4 hide-scrollbar">
        {mobile.map((el, idx) => (
          <div
            onClick={() => {
              // subCategoryRoute(sub.name, sub.id);
            }}
            key={idx}
            className="group w-full"
          >
            <Card className="bg-white w-full rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="flex gap-2 items-center justify-between h-full">
                <div>
                  <h3 className="font-medium whitespace-nowrap text-sm sm:text-base text-gray-900 group-hover:text-blue-600">
                    {el.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">{el.icon}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };
  return (
    <>
      {isLoading === true && <LoadingState />}
      <MobileHeroSection />
      <section className=" hidden sm:block relative min-h-[90vh] bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={animations.stagger}
            >
              <motion.div className="space-y-4" variants={animations.fadeInUp}>
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
                  className="flex gap-5 h-9 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 py-3 shadow-lg transition-all duration-300"
                >
                  <Link href="/category" className="">
                    🛍️ Shop Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  onClick={showLoading}
                  className="h-9 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 py-3 shadow-lg transition-all duration-300"
                >
                  <Link href="/category">Explore Category</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 hover:bg-orange-50 h-9 py-3"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("openVoiceSearch"))
                  }
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Voice Search
                </Button>
              </motion.div>

              <motion.div
                className="grid sm:grid-cols-3 gap-6 pt-8"
                variants={animations.fadeInUp}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-orange-100"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex items-center gap-6 pt-4"
                variants={animations.fadeInUp}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">
                    Trusted by 10K+ Users
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Hero Images */}
            <motion.div
              className="relative"
              initial="hidden"
              animate="visible"
              variants={animations.imageScale}
            >
              <div className="relative aspect-square max-w-[600px] mx-auto">
                {/* Main Product Image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-transparent rounded-2xl" />
                <div className="relative w-full h-full p-6">
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={smartWatchs} // Update with your image
                      alt="Featured Products"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -right-8 top-1/4 bg-white rounded-lg shadow-lg p-4"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={smartWatchb} // Update with your image
                        alt="Product"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">New Arrival</p>
                      <p className="text-sm text-gray-600">Just added!</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -left-8 bottom-1/4 bg-white rounded-lg shadow-lg p-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  <div className="text-center">
                    <p className="font-bold text-orange-600">50% OFF</p>
                    <p className="text-sm text-gray-600">Limited time offer</p>
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
