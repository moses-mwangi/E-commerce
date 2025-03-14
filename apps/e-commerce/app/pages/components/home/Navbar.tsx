"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Bot,
  BarChart,
  Users,
  Shield,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const navigation = [
  {
    name: "Solutions",
    href: "#",
    dropdownItems: [
      { name: "AI Commerce", href: "/solutions/ai-commerce", icon: Bot },
      { name: "Analytics", href: "/solutions/analytics", icon: BarChart },
      { name: "Team Management", href: "/solutions/teams", icon: Users },
      { name: "Security", href: "/solutions/security", icon: Shield },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
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
    <Card
      className={` rounded-none fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AiCommerce</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  {item.name}
                  {item.dropdownItems && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdownItems && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 w-56 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50"
                      >
                        <dropdownItem.icon className="w-4 h-4 text-blue-600" />
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/support" className="gap-2">
                <HelpCircle className="w-4 h-4" />
                Support
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="gap-2">
                <Settings className="w-4 h-4" />
                Dashboard
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="https://store.yourcompany.com" className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Store
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
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
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
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
                    className="block px-8 py-2 text-gray-500 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {dropdownItem.name}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 space-y-2 px-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <HelpCircle className="w-4 h-4" />
                Support
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="w-4 h-4" />
                Dashboard
              </Button>
              <Button className="w-full justify-start gap-2">
                <ShoppingCart className="w-4 h-4" />
                Store
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </Card>
  );
}
