"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Your Business with
              <span className="text-primary">AI-Powered E-commerce</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* Replace t("description") with hardcoded text */}
              Transform your business with AI-powered e-commerce solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button size="lg" asChild>
                <Link href="/services">
                  {/* Replace t("exploreButton") with hardcoded text */}
                  Explore Services <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://store.yourcompany.com">
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  {/* Replace t("visitStoreButton") with hardcoded text */}
                  Visit Store
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div>
                <h4 className="text-3xl font-bold text-gray-900">50K+</h4>
                <p className="text-gray-600">Products</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900">98%</h4>
                <p className="text-gray-600">Satisfaction</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900">24/7</h4>
                <p className="text-gray-600">Support</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square">
              <Image
                src="/images/hero-illustration.svg"
                alt="AI-Powered E-commerce"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -right-8 top-1/4 bg-white rounded-xl shadow-lg p-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Bot className="w-8 h-8 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
