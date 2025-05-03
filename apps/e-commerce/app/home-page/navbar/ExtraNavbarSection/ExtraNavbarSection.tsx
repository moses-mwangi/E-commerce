"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  ListIcon,
  ChevronDown,
  HelpCircle,
  Truck,
  Smartphone,
  Boxes,
  Gem,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import LoadingState from "@/app/components/loaders/LoadingState";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import Aos from "aos";
import "aos/dist/aos.css";
import OrderProtection from "./OrderProtection";
import Deals_promotion from "./Deals_promotion";
import Shipping from "./Shipping";
import HelpCenter from "./HelpCenter";
import GetOurApp from "./GetOurApp";
import AllCategories from "./AllCategories";

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
      once: false,
      duration: 600,
    });

    return () => {
      Aos.refresh();
    };
  }, []);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
      document.body.style.width = "98.9%";
    }

    return () => {
      document.body.style.overflow = "visible";
      document.body.style.width = "100%";
    };
  }, [activeModal]);

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

  const renderModalContent = () => {
    if (!activeModal) return null;

    switch (activeModal) {
      case "categories":
        return (
          <AllCategories
            categories={categories}
            isCategory={isCategory}
            isSubCategory={isSubCategory}
            setIsCategory={setIsCategory}
            setIsSubCategory={setIsSubCategory}
            setIsLoading={setIsLoading}
            subCategories={subCategories}
            subProducts={subProducts}
          />
        );

      case "deals":
        return <Deals_promotion />;

      case "orderProtection":
        return <OrderProtection />;

      case "shipping":
        return <Shipping />;

      case "help":
        return <HelpCenter />;

      case "app":
        return <GetOurApp />;

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
