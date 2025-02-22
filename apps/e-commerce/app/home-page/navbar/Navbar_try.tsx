"use client";

import React from "react";
import { Search, ShoppingCart, User, Mic, Camera, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white py-4 px-12 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* Left Section - Logo & Categories */}
      <div className="flex items-center gap-6">
        <button className="text-gray-300 hover:text-orange-500">
          <Menu size={26} />
        </button>
        <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          AICommerce
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-1/2 flex items-center bg-white rounded-full shadow-md overflow-hidden">
        <input
          type="text"
          placeholder="Search for products, categories, or brands..."
          className="w-full px-6 py-3 text-black focus:outline-none text-lg"
        />
        <button className="px-4 text-gray-600 hover:text-orange-500">
          <Mic size={22} />
        </button>
        <button className="px-4 text-gray-600 hover:text-orange-500">
          <Camera size={22} />
        </button>
        <button className="px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-r-full">
          <Search size={22} />
        </button>
      </div>

      {/* Right Section - User & Cart */}
      <div className="flex items-center gap-6">
        <button className="text-gray-300 hover:text-orange-500 text-lg font-medium">
          Sign In
        </button>
        <button className="text-gray-300 hover:text-orange-500 relative">
          <ShoppingCart size={26} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 py-0.5 rounded-full">
            3
          </span>
        </button>
      </div>
    </nav>
  );
}
