// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   ListIcon,
//   ChevronDown,
//   HelpCircle,
//   Truck,
//   Smartphone,
//   Boxes,
//   BadgePercent,
//   Gem,
//   Shirt,
//   Laptop,
//   Home,
//   ToyBrick,
//   ArrowRightIcon,
// } from "lucide-react";

// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { fetchCategories } from "@/redux/slices/categorySlice";
// import { fetchProducts } from "@/redux/slices/productSlice";
// import { Card } from "@/components/ui/card";
// import { map } from "lodash";
// import Image from "next/image";
// import { Si1Panel, SiNextra } from "react-icons/si";
// import LoadingState from "@/app/components/loaders/LoadingState";
// import { useRouter } from "next/navigation";

// // Help center options
// const helpOptions = [
//   "Help Center",
//   "Disputes & Reports",
//   "Report IPR Infringement",
//   "Customer Service",
//   "Submit a Complaint",
// ];

// const valueData = [
//   { id: 1, value: "All categories", icon: <ListIcon size={17} /> },
//   { id: 2, value: "Deals & Promotions", icon: <Gem size={17} /> },
//   { id: 3, value: "Order protection", icon: <Boxes size={17} /> },

//   { id: 4, value: "Shipping & Logistics", icon: <Truck size={17} /> },
//   { id: 5, value: "Help Center", icon: <HelpCircle size={17} /> },
//   { id: 6, value: "Get the app", icon: <Smartphone size={17} /> },
//   // { id: 7, value: "Help Center", icon: <ListIcon size={17} /> },
// ];

// export default function ExtraNavbarSection() {
//   const { categories } = useSelector((state: RootState) => state.category);
//   const { products } = useSelector((state: RootState) => state.product);
//   const dispatch: AppDispatch = useDispatch();
//   const { push } = useRouter();

//   const [showModal, setShowModal] = useState(false);
//   const [showCategory, setShowCategory] = useState(false);
//   const [showOrderPro, setShowOrderPro] = useState(false);
//   const [showOrderDeal, setShowOrderDeal] = useState(false);
//   const [showOrderShipping, setShowOrderShipping] = useState(false);
//   const [showOrderHelp, setShowOrderHelp] = useState(false);
//   const [showOrderApp, setShowOrderApp] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);
//   const [isCategory, setIsCategory] = useState<string | null>(null);
//   const [isSubCategory, setIsSubCategory] = useState<string | null>(null);

//   const subCategories = React.useMemo(
//     () =>
//       categories?.find(
//         (category) => category.name.toLowerCase() === isCategory?.toLowerCase()
//       )?.subcategories,
//     [categories, isCategory]
//   );

//   const subProducts = React.useMemo(
//     () =>
//       products.filter(
//         (product) =>
//           product.category.toLowerCase() === isCategory?.toLowerCase() &&
//           product.subCategory.toLowerCase() === isSubCategory?.toLowerCase()
//       ),
//     [products, isCategory, isSubCategory]
//   );

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     if (isCategory === null && categories.length > 0) {
//       setIsCategory(categories[0]?.name);
//       setIsSubCategory(categories[0]?.subcategories[0]?.name);
//     }
//   }, [categories, dispatch, isCategory]);

//   return (
//     <div>
//       {isLoading === true && <LoadingState />}
//       <div className="flex items-center justify-between">
//         <div className=" text-gray-700 w-full">
//           <div className="flex text-[15px] justify-between w-full">
//             <div className="flex items-center gap-4">
//               {valueData
//                 .filter((val) => val.id <= 3)
//                 .map((val, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => {
//                       setShowCategory((s) => !s);
//                     }}
//                     onMouseEnter={() => {
//                       setShowModal((s) => !s);
//                       if (val.value === "All categories") {
//                         setShowCategory((s) => !s);
//                       } else if (val.value === "Deals & Promotions") {
//                         setShowOrderDeal((s) => !s);
//                       } else if (val.value === "Order protection") {
//                         setShowOrderPro((s) => !s);
//                       }
//                     }}
//                     onMouseLeave={() => {
//                       setShowModal((s) => !s);

//                       if (val.value === "All categories") {
//                         setShowCategory((s) => !s);
//                       } else if (val.value === "Deals & Promotions") {
//                         setShowOrderDeal((s) => !s);
//                       } else if (val.value === "Order protection") {
//                         setShowOrderPro((s) => !s);
//                       }
//                     }}
//                     className="flex items-center gap-2 hover:cursor-pointer hover:text-primary focus:outline-none"
//                   >
//                     {val.icon}
//                     {val.value}
//                     {val.value === "All categories" && (
//                       <ChevronDown size={16} />
//                     )}
//                   </div>
//                 ))}
//             </div>

//             <div className="flex items-end gap-4">
//               {valueData
//                 .filter((val) => val.id > 3)
//                 .map((val, idx) => (
//                   <div
//                     key={idx}
//                     onMouseEnter={() => {
//                       setShowModal((s) => !s);
//                       if (val.value === "Shipping & Logistics") {
//                         setShowOrderShipping((s) => !s);
//                       } else if (val.value === "Help Center") {
//                         setShowOrderHelp((s) => !s);
//                       } else if (val.value === "Get the app") {
//                         setShowOrderApp((s) => !s);
//                       }
//                     }}
//                     className="flex items-center gap-2 hover:cursor-pointer hover:text-primary focus:outline-none"
//                   >
//                     {val.icon}
//                     {val.value}
//                     {val.value === "All categories" && (
//                       <ChevronDown size={16} />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </div>

//           {showModal === true && (
//             <div className=" inset-0 top-11 fixed h-screen bg-black/60 backdrop-blur-[2px]">
//               <Card
//                 className={`min-w-full rounded-none  max-h-[350px] h-full py-2`}
//               >
//                 {showCategory === true && (
//                   <div className="w-svw grid grid-cols-[1fr_1fr_1.5fr] px-10">
//                     <div className=" overflow-y-scroll overflow-x-hidden h-full max-h-[300px]">
//                       {categories.map((category, index) => (
//                         <div key={index} className="">
//                           <div
//                             onMouseEnter={() => {
//                               setIsCategory(category.name);
//                               setIsSubCategory(category.subcategories[0].name);
//                             }}
//                             onClick={() => {
//                               setIsLoading(true);
//                               push(`/category/${category.name}`);
//                             }}
//                             className={`py-1 cursor-pointer w-full text-[15px]`}
//                           >
//                             <p
//                               className={`py-2 w-full flex-grow px-5 cursor-pointer ${
//                                 category.name === isCategory
//                                   ? "bg-gray-100 text-gray-900 font-medium scale-105 transition-all duration-300"
//                                   : ""
//                               } `}
//                             >
//                               {category.name}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className=" h-full max-h-[300px]">
//                       <div className=" overflow-y-scroll overflow-x-hidden h-full">
//                         <Link
//                           href={`/category/${isCategory}`}
//                           onClick={() => setIsLoading(true)}
//                           className="text-[15px] font-semibold px-2 flex gap-2 hover:underline hover:text-blue-500 transition-all duration-200 items-center py-3"
//                         >
//                           {isCategory} <ArrowRightIcon size={20} />
//                         </Link>
//                         {subCategories?.map((subCategory, index) => (
//                           <div key={index} className="">
//                             <div
//                               className="py-1 cursor-pointer text-gray-700 w-full text-[15px]"
//                               onClick={() => {
//                                 setIsLoading(true);
//                                 push(`/category/${subCategory.name}`);
//                               }}
//                               onMouseEnter={() => {
//                                 setIsSubCategory(subCategory.name);
//                               }}
//                             >
//                               <p
//                                 className={`py-2 w-full flex-grow px-5 cursor-pointer ${
//                                   subCategory.name === isSubCategory
//                                     ? "bg-gray-100 text-gray-900 font-medium scale-105 transition-all duration-300"
//                                     : ""
//                                 } `}
//                               >
//                                 {subCategory.name}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className=" mr-4 overflow-y-scroll overflow-x-hidden h-full max-h-[300px]">
//                       <Link
//                         href={`/category/${isCategory}/${isSubCategory}`}
//                         onClick={() => setIsLoading(true)}
//                         className="text-[15px] font-semibold px-2 flex gap-2 hover:underline hover:text-blue-500 transition-all duration-200 items-center py-3"
//                       >
//                         {isSubCategory} <ArrowRightIcon size={20} />
//                       </Link>
//                       <div className=" w-auto grid grid-cols-4 px-1 items-center justify-between">
//                         {subProducts?.map((subProduct, index) => (
//                           <div
//                             key={index}
//                             className=" cursor-pointer"
//                             onClick={() => {
//                               setIsLoading(true);
//                               push(
//                                 `/category/${isCategory}/${isSubCategory}/${subProduct.name}?id=${subProduct.id}`
//                               );
//                             }}
//                           >
//                             <div className="flex flex-col items-center">
//                               <div className=" w-16 h-16 rounded-full">
//                                 <Image
//                                   src={String(
//                                     subProduct.productImages.find(
//                                       (image) => image.isMain === true
//                                     )?.url
//                                   )}
//                                   alt="dd"
//                                   width={40}
//                                   height={40}
//                                   className=" h-full w-full rounded-full"
//                                 />
//                               </div>
//                               <p className="text-[15px] text-gray-700 flex text-center flex-wrap">
//                                 {subProduct.name}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {showOrderDeal === true && <div>ff</div>}
//                 {showOrderPro === true && <div>ff</div>}
//                 {showOrderShipping === true && <div>ff</div>}
//                 {showOrderApp === true && <div>ff</div>}
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

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
  ArrowRightIcon,
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

      case "deals":
        return <div className="p-4">Deals & Promotions Content</div>;

      case "orderProtection":
        return <div className="p-4">Order Protection Content</div>;

      case "shipping":
        return <div className="p-4">Shipping & Logistics Content</div>;

      case "help":
        return <div className="p-4">Help Center Content</div>;

      case "app":
        return <div className="p-4">Get the App Content</div>;

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
                    className="flex items-center gap-2 hover:cursor-pointer hover:text-primary focus:outline-none"
                  >
                    {val.icon}
                    {val.value}
                    {val.value === "All categories" && (
                      <ChevronDown size={16} />
                    )}
                  </div>
                ))}
            </div>

            <div className="flex items-end gap-4">
              {valueData
                .filter((val) => val.id > 3)
                .map((val) => (
                  <div
                    key={val.id}
                    onMouseEnter={() => {
                      handleValueMouseEnter(val.modalType);

                      console.log(val.modalType);
                    }}
                    onMouseLeave={handleValueMouseLeave}
                    className="flex items-center gap-2 hover:cursor-pointer hover:text-primary focus:outline-none"
                  >
                    {val.icon}
                    {val.value}
                  </div>
                ))}
            </div>
          </div>

          {/* {activeModal && (
            <div
              className="inset-0 top-28 fixed h-screen bg-black/65 backdrop-blur-[2px]"
              onMouseEnter={handleModalMouseEnter}
              onMouseLeave={handleModalMouseLeave}
            >
              <div className=" w-full h-[2px] bg-gray-300" />
              <Card
                className="min-w-full rounded-none max-h-[350px] h-full py-2"
                onMouseEnter={handleModalMouseEnter}
                onMouseLeave={handleModalMouseLeave}
              >
                {renderModalContent()}
              </Card>
            </div>
          )} */}

          {activeModal && (
            <div
              className="inset-0 top-28 fixed h-screen bg-black/65 backdrop-blur-[2px]"
              onMouseEnter={handleModalMouseEnter}
              onMouseLeave={handleModalMouseLeave}
            >
              {/* Active section indicator bar */}
              <div className="w-full h-[3px] bg-gray-300 relative">
                <div
                  className={`absolute top-0 h-full bg-primary transition-all duration-300 ${
                    activeModal === "categories"
                      ? // ? "left-0 w-[16.66%]"
                        "left-[3%] w-[12.66%]"
                      : activeModal === "deals"
                      ? "left-[16.66%] w-[16.66%]"
                      : activeModal === "orderProtection"
                      ? "left-[33.33%] w-[16.66%]"
                      : activeModal === "shipping"
                      ? "left-[50%] w-[16.66%]"
                      : activeModal === "help"
                      ? "left-[66.66%] w-[16.66%]"
                      : "left-[83.33%] w-[16.66%]"
                  }`}
                />
              </div>

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
