"use client";

import React, { useEffect, useState, useCallback, useRef, act } from "react";
import {
  ListIcon,
  ChevronDown,
  HelpCircle,
  Truck,
  Smartphone,
  Boxes,
  Gem,
  ArrowRightIcon,
  CheckCircle2,
  Globe2,
  Clock,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Apple,
  Play,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingState from "@/app/components/loaders/LoadingState";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import Aos from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";

type ModalType =
  | "categories"
  | "deals"
  | "orderProtection"
  | "shipping"
  | "help"
  | "app"
  | string
  | null;

const valueData = [
  {
    id: 1,
    value: "All categories",
    icon: <ListIcon size={17} />,
    modalType: "categories",
  },
  {
    id: 2,
    value: "Deals & Promotions",
    icon: <Gem size={17} />,
    modalType: "deals",
  },
  {
    id: 3,
    value: "Order protection",
    icon: <Boxes size={17} />,
    modalType: "orderProtection",
  },
  {
    id: 4,
    value: "Shipping & Logistics",
    icon: <Truck size={17} />,
    modalType: "shipping",
  },
  {
    id: 5,
    value: "Help Center",
    icon: <HelpCircle size={17} />,
    modalType: "help",
  },
  {
    id: 6,
    value: "Get the app",
    icon: <Smartphone size={17} />,
    modalType: "app",
  },
];

export default function ExtraNavbarSection() {
  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isHoveringModal, setIsHoveringModal] = useState(false);
  const [isHoveringValue, setIsHoveringValue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategory, setIsCategory] = useState<string | null>(null);
  const [isSubCategory, setIsSubCategory] = useState<string | null>(null);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const subCategories = React.useMemo(
    () =>
      categories?.find(
        (category) => category.name.toLowerCase() === isCategory?.toLowerCase()
      )?.subcategories,
    [categories, isCategory]
  );

  const subProducts = React.useMemo(
    () =>
      products.filter(
        (product) =>
          product.category.toLowerCase() === isCategory?.toLowerCase() &&
          product.subCategory.toLowerCase() === isSubCategory?.toLowerCase()
      ),
    [products, isCategory, isSubCategory]
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isCategory === null && categories.length > 0) {
      setIsCategory(categories[0]?.name);
      setIsSubCategory(categories[0]?.subcategories[0]?.name);
    }
  }, [categories, isCategory]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    Aos.init({
      once: false, // Changed to false so animations can trigger again
      duration: 600, // Set default duration
    });

    return () => {
      Aos.refresh(); // Cleanup
    };
  }, []);

  // const handleValueMouseEnter = useCallback((modalType: ModalType) => {
  const handleValueMouseEnter = useCallback((modalType: ModalType) => {
    setIsHoveringValue(true);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveModal(modalType);
  }, []);

  const handleValueMouseLeave = useCallback(() => {
    setIsHoveringValue(false);
    if (!isHoveringModal) {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveModal(null);
      }, 300);
    }
  }, [isHoveringModal]);

  const handleModalMouseEnter = useCallback(() => {
    setIsHoveringModal(true);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  }, []);

  const handleModalMouseLeave = useCallback(() => {
    setIsHoveringModal(false);
    if (!isHoveringValue) {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveModal(null);
      }, 300);
    }
  }, [isHoveringValue]);

  // useEffect(() => {
  //   Aos.refresh();
  // }, [activeModal]);

  const renderModalContent = () => {
    if (!activeModal) return null;

    switch (activeModal) {
      case "categories":
        return (
          <div className="w-svw grid grid-cols-[1fr_1fr_1.5fr] px-10">
            <div className="overflow-y-scroll overflow-x-hidden h-full max-h-[300px]">
              {categories.map((category, index) => (
                <div key={index}>
                  <div
                    onMouseEnter={() => {
                      setIsCategory(category.name);
                      setIsSubCategory(category.subcategories[0].name);
                    }}
                    onClick={() => {
                      setIsLoading(true);
                      push(`/category/${category.name}`);
                    }}
                    className="py-1 cursor-pointer w-full text-[15px]"
                  >
                    <p
                      className={`py-2 w-full flex-grow px-5 cursor-pointer ${
                        category.name === isCategory
                          ? "bg-gray-100 text-gray-900 font-medium scale-105 transition-all duration-300"
                          : ""
                      }`}
                    >
                      {category.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-full max-h-[300px]">
              <div className="overflow-y-scroll overflow-x-hidden h-full">
                <Link
                  href={`/category/${isCategory}`}
                  onClick={() => setIsLoading(true)}
                  className="text-[15px] font-semibold px-2 flex gap-2 hover:underline hover:text-blue-500 transition-all duration-200 items-center py-3"
                >
                  {isCategory} <ArrowRightIcon size={20} />
                </Link>
                {subCategories?.map((subCategory, index) => (
                  <div key={index}>
                    <div
                      className="py-1 cursor-pointer text-gray-700 w-full text-[15px]"
                      onClick={() => {
                        setIsLoading(true);
                        push(`/category/${isCategory}/${subCategory.name}`);
                      }}
                      onMouseEnter={() => {
                        setIsSubCategory(subCategory.name);
                      }}
                    >
                      <p
                        className={`py-2 w-full flex-grow px-5 cursor-pointer ${
                          subCategory.name === isSubCategory
                            ? "bg-gray-100 text-gray-900 font-medium scale-105 transition-all duration-300"
                            : ""
                        }`}
                      >
                        {subCategory.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mr-4 overflow-y-scroll overflow-x-hidden h-full max-h-[300px]">
              <Link
                href={`/category/${isCategory}/${isSubCategory}`}
                onClick={() => setIsLoading(true)}
                className="text-[15px] font-semibold px-2 flex gap-2 hover:underline hover:text-blue-500 transition-all duration-200 items-center py-3"
              >
                {isSubCategory} <ArrowRightIcon size={20} />
              </Link>
              <div className="w-auto grid grid-cols-4 px-1 items-center justify-between">
                {subProducts?.map((subProduct, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsLoading(true);
                      push(
                        `/category/${isCategory}/${isSubCategory}/${subProduct.name}?id=${subProduct.id}`
                      );
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full">
                        <Image
                          src={String(
                            subProduct.productImages.find(
                              (image) => image.isMain === true
                            )?.url
                          )}
                          alt={subProduct.name}
                          width={40}
                          height={40}
                          className="h-full w-full rounded-full"
                        />
                      </div>
                      <p className="text-[15px] text-gray-700 flex text-center flex-wrap">
                        {subProduct.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // case "deals":
      //   return <div className="p-4">Deals & Promotions Content</div>;

      // case "orderProtection":
      //   return <div className="p-4">Order Protection Content</div>;

      // case "shipping":
      //   return <div className="p-4">Shipping & Logistics Content</div>;

      // case "help":
      //   return <div className="p-4">Help Center Content</div>;

      // case "app":
      //   return <div className="p-4">Get the App Content</div>;

      case "deals":
        return (
          <div className="p-6 grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary border-b pb-2">
                Today&apos;s Deals
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((deal) => (
                  <div
                    key={deal}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="bg-red-100 p-2 rounded-full">
                      <Gem size={20} className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Flash Sale {deal}</p>
                      <p className="text-sm text-gray-500">
                        Up to {60 - deal * 10}% off
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary border-b pb-2">
                Member Exclusive
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((offer) => (
                  <div
                    key={offer}
                    className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="bg-blue-50 p-2 rounded-lg mb-2">
                      <Gem size={24} className="text-blue-500" />
                    </div>
                    <p className="text-sm text-center">
                      Members save {20 + offer * 5}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary border-b pb-2">
                Limited Time Offers
              </h3>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Weekend Special</p>
                <p className="text-sm text-gray-600 mb-3">
                  Selected items at lowest prices
                </p>
                <Button className="bg-orange-500/85 hover:bg-orange-600 h-7 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        );

      case "orderProtection":
        return (
          <div className="p-6 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <ShieldCheck size={20} /> Order Protection
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Money Back Guarantee</p>
                    <p className="text-sm text-gray-600">
                      Full refund if items don&apos;t arrive
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Authenticity Verified</p>
                    <p className="text-sm text-gray-600">
                      Guaranteed genuine products
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Extended Warranty</p>
                    <p className="text-sm text-gray-600">
                      Up to 2 years coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-5">
              <h4 className="font-semibold mb-3">How It Works</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                    1
                  </div>
                  <p className="text-sm">Select Order Protection at checkout</p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                    2
                  </div>
                  <p className="text-sm">Enjoy protected shopping experience</p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                    3
                  </div>
                  <p className="text-sm">File claim if issues arise</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "shipping":
        return (
          <div className="p-6 grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <Truck size={20} /> Shipping Options
              </h3>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium">Standard Shipping</p>
                  <p className="text-sm text-gray-600">
                    3-5 business days • $4.99
                  </p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-medium">Express Shipping</p>
                  <p className="text-sm text-gray-600">
                    1-2 business days • $9.99
                  </p>
                </div>
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-600">
                    Orders over $50 • 5-7 days
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary">
                Track Your Order
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm mb-3">
                  Enter your tracking number to check delivery status
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tracking number"
                    className="flex-1 border rounded-md px-3 py-2 text-sm"
                  />
                  <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
                    Track
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary">
                International Shipping
              </h3>
              <div className="flex items-start gap-3">
                <Globe2 size={18} className="text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">Worldwide Delivery</p>
                  <p className="text-sm text-gray-600">
                    Available to 200+ countries
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">Customs Clearance</p>
                  <p className="text-sm text-gray-600">
                    Duties & taxes calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "help":
        return (
          <div className="p-6 grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <HelpCircle size={20} /> Help Center
              </h3>
              <div className="space-y-3">
                {[
                  "Order Status",
                  "Returns & Refunds",
                  "Payment Methods",
                  "Account Issues",
                  "Product Questions",
                ].map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <FileText size={16} className="text-gray-500" />
                    <p>{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">24/7 Customer Service</p>
                    <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">help@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MessageSquare size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-gray-600">
                      Available 9AM-9PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary">FAQs</h3>
              <div className="space-y-3">
                {[
                  "How do I return an item?",
                  "When will my order ship?",
                  "How do I apply a promo code?",
                  "What payment methods do you accept?",
                ].map((question, i) => (
                  <div key={i} className="border-b pb-3">
                    <p className="font-medium text-sm">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "app":
        return (
          <div className="p-6 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Get Our Mobile App
                </h3>
                <p className="text-gray-600">
                  Shop faster, track orders, and get exclusive app-only deals
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <p>Exclusive mobile discounts</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <p>Faster checkout with saved payment</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <p>Push notifications for order updates</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <p>Wishlist and save items for later</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
                  <Apple size={18} />
                  <div className="text-left">
                    <p className="text-xs">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
                  <Play size={18} />
                  <div className="text-left">
                    <p className="text-xs">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-48 h-96 border-4 border-gray-800 rounded-3xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-8 bg-gray-800"></div>
                <div className="absolute top-10 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white p-4">
                  <div className="bg-white rounded-lg shadow-md p-3 mb-3">
                    <div className="flex gap-2 mb-2">
                      <div className="bg-gray-200 rounded w-12 h-12"></div>
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded h-3 w-3/4 mb-2"></div>
                        <div className="bg-gray-200 rounded h-3 w-1/2"></div>
                      </div>
                    </div>
                    <div className="bg-primary text-white text-center py-2 rounded-md text-sm">
                      Shop Now
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg mb-1">Welcome!</p>
                    <p className="text-xs text-gray-500">
                      Scan this code to download our app
                    </p>
                    <div className="mx-auto my-3 bg-white p-2 w-24 h-24 flex items-center justify-center">
                      <QrCode size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {isLoading && <LoadingState />}
      <div className="flex items-center justify-between">
        <div className="text-gray-700 w-full">
          <div className="flex text-[15px] py-2 justify-between w-full">
            <div className="flex items-center gap-4">
              {valueData
                .filter((val) => val.id <= 3)
                .map((val) => (
                  <div
                    key={val.id}
                    onMouseEnter={() => handleValueMouseEnter(val.modalType)}
                    onMouseLeave={handleValueMouseLeave}
                    className={`${
                      activeModal === val.modalType
                        ? "underline underline-offset-2"
                        : " "
                    }  flex items-center gap-2 hover:cursor-pointer hover:text-primary focus:outline-none`}
                  >
                    {val.icon}
                    {val.value}
                    {val.value === "All categories" && (
                      <ChevronDown size={16} />
                    )}
                  </div>
                ))}
            </div>

            <div className="flex items-end gap-4 relative">
              {valueData
                .filter((val) => val.id > 3)
                .map((val) => (
                  <div
                    key={val.id}
                    onMouseEnter={() => {
                      handleValueMouseEnter(val.modalType);
                    }}
                    onMouseLeave={handleValueMouseLeave}
                    className={`${
                      activeModal === val.modalType ? "underline" : " "
                    }  flex items-center gap-2 hover:cursor-pointer hover:text-primary focus:outline-none`}
                  >
                    {val.icon}
                    {val.value}
                  </div>
                ))}
            </div>
          </div>

          {activeModal && (
            <div
              className="inset-0 top-28 fixed h-screen bg-black/65 backdrop-blur-[2px]"
              onMouseEnter={handleModalMouseEnter}
              onMouseLeave={handleModalMouseLeave}
            >
              <Card
                className="min-w-full rounded-none max-h-[350px] h-full py-2 relative"
                onMouseEnter={handleModalMouseEnter}
                onMouseLeave={handleModalMouseLeave}
              >
                {renderModalContent()}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
