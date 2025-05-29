"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import React, { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="py-6 sm:py-12 mx-auto sm:px-6 md:px-7 lg:px-9 bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className=" bg-[#f4f4f4] mx-auto py-6 px-4 sm:rounded-2xl">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-8 h-8 sm:w-12 sm:h-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 text-[15px] sm:text-base mb-8">
            Get updates about new products and special offers
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-[15px] sm:text-base focus-visible:ring-orange-500 bg-white"
            />
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
