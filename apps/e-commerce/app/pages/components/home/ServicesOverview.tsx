"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Bot,
  BarChart,
  Users,
  Shield,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: ShoppingCart,
    title: "AI-Powered E-commerce",
    description: "Revolutionize your business with AI-driven solutions",
  },
  {
    icon: Bot,
    title: "Intelligent Support",
    description: "services.support.description",
  },
  {
    icon: BarChart,
    title: "Analytics & Insights",
    description: "services.analytics.description",
  },
  {
    icon: Users,
    title: "Customer Experience",
    description: "services.experience.description",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "services.security.description",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "services.global.description",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Services Overview
          </h2>
          <p className="text-xl text-gray-600">
            Discover how our services can help you achieve your business goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
