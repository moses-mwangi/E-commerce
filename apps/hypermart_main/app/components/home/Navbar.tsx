"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Bot,
  Sparkles,
  BarChart,
  Users,
} from "lucide-react";

const navigation = [
  {
    name: "Products",
    href: "#",
    dropdownItems: [
      {
        name: "AI Commerce Platform",
        description: "Intelligent e-commerce solution for modern businesses",
        href: "/products/ai-commerce",
        icon: Bot,
      },
      {
        name: "Analytics Suite",
        description: "Deep insights into your business performance",
        href: "/products/analytics",
        icon: BarChart,
      },
      {
        name: "Team Collaboration",
        description: "Tools for seamless team coordination",
        href: "/products/team",
        icon: Users,
      },
    ],
  },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              AiCommerce
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-gray-600 hover:text-gray-900 flex items-center gap-2 py-2">
                  {item.name}
                  {item.dropdownItems && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  )}
                </button>

                <AnimatePresence>
                  {item.dropdownItems && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="p-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <dropdownItem.icon className="w-6 h-6 text-blue-600" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {dropdownItem.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {dropdownItem.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-8 py-2 text-sm text-gray-500 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="px-4 py-4 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    size="sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
