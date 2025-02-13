"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import aiDashboard from "../../../public/images/image copy.png";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSection() {
  return (
    <section className="relative flex bg-gray-50 h-[90vh] items-center justify-between px-12">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 opacity-60 blur-3xl"></div>

      {/* Left Content */}
      <div className="relative z-10 w-[55%] flex flex-col justify-center">
        <motion.h1
          className="leading-tight text-gray-900 text-6xl font-extrabold mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          AI-Powered <br />
          <span className="text-orange-600">Smart Shopping</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Discover the future of e-commerce with AI-driven recommendations,
          voice & image search, and real-time shopping insights.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex gap-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 px-6 py-3 shadow-lg">
            🛍️ Shop Now
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-6 py-3 shadow-lg">
            🎙️ Voice Search
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 px-6 py-3 shadow-lg">
            📷 Image Search
          </Button>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="relative z-10 w-[45%] flex items-center justify-center">
        <motion.div
          className="relative w-[90%] h-auto bg-gray-100 rounded-xl shadow-lg p-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={aiDashboard}
            alt="AI Commerce Dashboard"
            className="w-full h-auto object-contain rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
