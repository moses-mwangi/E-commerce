"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import smartWatch from "../../../public/newArrival/smart_watch.png";
import smartWatchs from "../../../public/newArrival/smartSpeker.png";
import smartWatchb from "../../../public/category_Image/beauty.png";
import {
  ShoppingBag,
  Mic,
  Camera,
  TrendingUp,
  Star,
  Truck,
  Shield,
} from "lucide-react";

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

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={animations.stagger}
          >
            {/* Main Heading */}
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

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={animations.fadeInUp}
            >
              <Link href="/pages/fashion">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200 flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-orange-50"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openVoiceSearch"))
                }
              >
                <Mic className="w-5 h-5 mr-2" />
                Voice Search
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-orange-50"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openImageSearch"))
                }
              >
                <Camera className="w-5 h-5 mr-2" />
                Image Search
              </Button>
            </motion.div>

            {/* Features */}
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
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Badges */}
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
  );
};

export default HeroSection;
