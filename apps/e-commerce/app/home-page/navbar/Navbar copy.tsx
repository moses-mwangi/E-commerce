"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart, User, Search, Camera, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 flex items-center"
        >
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="ml-2">AI Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="hover:text-orange-600 font-medium">
            Home
          </Link>
          <div className="relative group">
            <button className="hover:text-orange-600 font-medium">
              Categories
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md w-48 mt-2">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/category/fashion">Fashion</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/category/electronics">Electronics</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/category/beauty">Beauty</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/category/kitchen">Kitchen</Link>
                </li>
              </ul>
            </div>
          </div>
          <Link href="/trending" className="hover:text-orange-600 font-medium">
            Trending
          </Link>
          <Link
            href="/best-sellers"
            className="hover:text-orange-600 font-medium"
          >
            Best Sellers
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent focus:outline-none px-2"
          />
          <Mic className="text-gray-500 cursor-pointer mx-2" size={20} />
          <Camera className="text-gray-500 cursor-pointer" size={20} />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-gray-800" size={24} />
            <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
              3
            </span>
          </Link>
          <Link href="/profile">
            <User className="text-gray-800" size={24} />
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-md p-4"
        >
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/category" onClick={() => setMenuOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link href="/trending" onClick={() => setMenuOpen(false)}>
                Trending
              </Link>
            </li>
            <li>
              <Link href="/best-sellers" onClick={() => setMenuOpen(false)}>
                Best Sellers
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={() => setMenuOpen(false)}>
                Cart
              </Link>
            </li>
            <li>
              <Link href="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
            </li>
          </ul>
        </motion.nav>
      )}
    </header>
  );
}
