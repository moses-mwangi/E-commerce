"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import aiDashboard from "../../../public/images/image copy.png";

export default function HeroSection() {
  return (
    <section className="back bg-gradient-to-br from-gray-50 to-gray-100 flex  h-[87svh] items-center justify-between py-16">
      <div className="w-[55%] flex flex-col justify-center px-12">
        <motion.h1
          className="leading-tight text-gray-900 text-5xl font-bold mb-[18px]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The Future of AI-Driven <br />
          <span className="text-orange-600">B2B & B2C Commerce</span>
        </motion.h1>
        <motion.p
          className="text-[18px] mb-6 text-gray-700 mt-5 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Transform your shopping experience with AI-powered product discovery,
          voice & image search, and intelligent recommendations. Whether you’re
          a business looking to scale or a consumer seeking smarter deals, we’ve
          got you covered!
        </motion.p>

        <div className="mt-8 flex gap-4">
          <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 px-6 py-3 shadow-lg">
            🛍️ Shop Now
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-6 py-3 shadow-lg">
            🎙️ Search by Voice
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 px-6 py-3 shadow-lg">
            📷 Search by Image
          </Button>
        </div>
      </div>

      <div className="w-[45%] flex items-center justify-center">
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
