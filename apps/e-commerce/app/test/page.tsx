// "use client";

// import Footer from "@/app/components/footer/Footer";
// import Navbar from "@/app/home-page/navbar/Navbar";
// import { Category, Subcategory } from "@/app/types/category";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { fetchCategories } from "@/redux/slices/categorySlice";
// import { fetchProducts } from "@/redux/slices/productSlice";
// import { AppDispatch, RootState } from "@/redux/store";
// import { add } from "date-fns";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Truck,
//   Check,
//   Zap,
// } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
// import { GiLightningFlame } from "react-icons/gi";
// import { useDispatch, useSelector } from "react-redux";

// import imgs from "../../../public/newArrival/foldedLaptop.png";
// import Reusable_Category_Sub_Products from "../pages/deals/Reusable_Category_Sub_Products";

// const DELIVERY_PRODUCTS = [
//   {
//     id: 1,
//     title: "Same-Day Delivery Laptop",
//     price: 899.99,
//     originalPrice: 999.99,
//     deliveryType: "same-day",
//     deliveryTime: "Today by 9 PM",
//     deliveryFee: 9.99,
//     freeDeliveryThreshold: 100,
//     stock: 42,
//     image: "/laptop.jpg",
//     features: ["Guanteed delivery", "Trackable", "Signature required"],
//   },
//   {
//     id: 2,
//     title: "Next-Day Grocery Bundle",
//     price: 49.99,
//     deliveryType: "next-day",
//     deliveryTime: "Tomorrow by 1 PM",
//     deliveryFee: 4.99,
//     freeDeliveryThreshold: 50,
//     stock: 156,
//     image: "/grocery.jpg",
//     features: ["Morning delivery", "Temperature controlled"],
//   },
//   {
//     id: 3,
//     title: "Express Delivery Smartphone",
//     price: 699.99,
//     deliveryType: "express",
//     deliveryTime: "Within 2 hours",
//     deliveryFee: 14.99,
//     freeDeliveryThreshold: 200,
//     stock: 23,
//     image: "/phone.jpg",
//     features: ["Instant dispatch", "Live tracking", "Priority handling"],
//   },
//   {
//     id: 4,
//     title: "Standard Delivery Furniture",
//     price: 299.99,
//     deliveryType: "standard",
//     deliveryTime: "Within 3-5 days",
//     deliveryFee: 19.99,
//     freeDeliveryThreshold: 500,
//     stock: 8,
//     image: "/furniture.jpg",
//     features: ["White glove service", "Assembly available"],
//   },
//   {
//     id: 5,
//     title: "Free Delivery Essentials Kit",
//     price: 129.99,
//     deliveryType: "free",
//     deliveryTime: "Within 2 days",
//     deliveryFee: 0,
//     freeDeliveryThreshold: 0,
//     stock: 89,
//     image: "/essentials.jpg",
//     features: ["Free shipping", "No minimum order"],
//   },
// ];

// const DELIVERY_TYPES = [
//   { type: "same-day", label: "Same Day", color: "bg-red-500" },
//   { type: "express", label: "Express", color: "bg-orange-500" },
//   { type: "next-day", label: "Next Day", color: "bg-blue-500" },
//   { type: "standard", label: "Standard", color: "bg-gray-500" },
//   { type: "free", label: "Free", color: "bg-green-500" },
// ];

// export default function DeliveryProductsPage() {
//   const dispatch: AppDispatch = useDispatch();
//   const { push, back } = useRouter();
//   const { categories } = useSelector((state: RootState) => state.category);
//   const { products } = useSelector((state: RootState) => state.product);

//   const subCategory = categories
//     .flatMap((el) => el.subcategories)
//     .map((sub) => {
//       const count = products.filter(
//         (product) =>
//           product.subCategory?.toLowerCase() === sub.name.toLowerCase()
//       ).length;

//       return { ...sub, productCount: count };
//     })
//     .sort((a, b) => b.productCount - a.productCount);

//   const [active, setActive] = useState<string | number | null>(
//     subCategory[0]?.id || null
//   );

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const activeSub = subCategory.find((sub) => sub.id === active);
//   const activeTabProduct =
//     active === null
//       ? products
//       : products.filter(
//           (product) =>
//             product.subCategory.toLowerCase() === activeSub?.name.toLowerCase()
//         );

//   return (
//     <div className="bg-[#ffffff]">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
//         <div className=" hidden sm:block bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-4 sm:px-6 sm:py-6 mb-8">
//           <div className="flex items-center gap-3 mb-3">
//             <Truck size={24} />
//             <h1 className="text-2xl font-bold">FAST DELIVERY PRODUCTS</h1>
//           </div>
//           <p className="mb-4">
//             Get what you need, when you need it with our speedy delivery options
//           </p>

//           <div className="flex flex-wrap items-center gap-4">
//             <div className="bg-white/20 p-2 rounded-lg flex items-center gap-2">
//               <Zap size={16} />
//               <span>Same-day delivery available in select areas</span>
//             </div>

//             <div className="bg-white/20 p-2 rounded-lg flex items-center gap-2">
//               <Check size={16} />
//               <span>Real-time tracking for all orders</span>
//             </div>
//           </div>
//         </div>

//         <div className="sm:hidden mb-6">
//           {/* Compact mobile header */}
//           <div className="bg-blue-600 text-white rounded-lg p-4 shadow-md">
//             <div className="flex items-center gap-3 mb-2">
//               <Truck size={20} className="flex-shrink-0" />
//               <h1 className="text-xl font-bold">Fast Delivery</h1>
//             </div>
//             <p className="text-sm mb-3">
//               Get items quickly with our delivery options
//             </p>

//             {/* Swipeable tags */}
//             <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
//               <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
//                 <Zap size={12} />
//                 Same-day
//               </div>
//               <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
//                 <Clock size={12} />
//                 Next-day
//               </div>
//               <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
//                 <Check size={12} />
//                 Tracked
//               </div>
//               <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
//                 <Truck size={12} />
//                 Express
//               </div>
//             </div>
//           </div>

//           {/* Optional: Delivery type filter chips */}
//           <div className="flex overflow-x-auto gap-2 mt-3 pb-2 no-scrollbar">
//             {DELIVERY_TYPES.map((type) => (
//               <button
//                 key={type.type}
//                 className={`${type.color} text-white px-3 py-1 rounded-full text-xs whitespace-nowrap`}
//               >
//                 {type.label}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
//           {DELIVERY_PRODUCTS.map((product) => {
//             const deliveryInfo = DELIVERY_TYPES.find(
//               (d) => d.type === product.deliveryType
//             );

//             return (
//               <div
//                 key={product.id}
//                 className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <div className="relative">
//                   <Image
//                     src="/newArrival/foldedLaptop.png"
//                     // src={product.image}
//                     alt={product.title}
//                     width={300}
//                     height={300}
//                     className="w-full aspect-square object-cover"
//                   />

//                   <div className="absolute top-2 left-2">
//                     <div
//                       className={`${deliveryInfo?.color} text-white text-xs font-bold px-2 py-1 rounded-full`}
//                     >
//                       {deliveryInfo?.label}
//                     </div>
//                   </div>

//                   <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-1 rounded">
//                     <div className="flex justify-between">
//                       <span>Stock: {product.stock}</span>
//                       <span>
//                         {product.deliveryFee > 0
//                           ? `$${product.deliveryFee} delivery`
//                           : "FREE delivery"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-3">
//                   <h3 className="font-medium line-clamp-2 mb-2">
//                     {product.title}
//                   </h3>

//                   <div className="flex items-end gap-2 mb-2">
//                     <span className="text-primary font-bold text-lg">
//                       ${product.price}
//                     </span>
//                     {product.originalPrice && (
//                       <span className="text-gray-500 line-through text-sm">
//                         ${product.originalPrice}
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//                     <Truck size={12} />
//                     <span>{product.deliveryTime}</span>
//                   </div>

//                   {product.freeDeliveryThreshold > 0 && (
//                     <p className="text-xs text-green-600 mb-2">
//                       Free delivery on orders over $
//                       {product.freeDeliveryThreshold}
//                     </p>
//                   )}

//                   <div className="space-y-1">
//                     {product.features.map((feature, i) => (
//                       <div key={i} className="flex items-start gap-2">
//                         <Check
//                           className="text-green-500 mt-0.5 flex-shrink-0"
//                           size={12}
//                         />
//                         <span className="text-xs text-gray-600">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <Reusable_Category_Sub_Products
//           activeTabProduct={activeTabProduct}
//           categories={categories}
//           subCategory={subCategory}
//           active={active}
//           setActive={setActive}
//         />
//       </div>
//       <Footer />
//     </div>
//   );
// }

// import React from "react";
// import { BsGlobe2 } from "react-icons/bs";

// export default function Page() {
//   return (
//     <div className="flex justify-center items-center w-full h-screen bg-white">
//       <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-2xl shadow-md hover:shadow-lg transition">
//         <BsGlobe2 className="text-orange-600 w-7 h-7 animate-pulse" />
//         <h1 className="text-2xl font-extrabold tracking-wide text-slate-800">
//           Qivamall
//         </h1>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { BsGlobe2 } from "react-icons/bs";

import { Inter, Merriweather, Sevillana } from "next/font/google";
import { cn } from "@/lib/utils";

const sevillana = Sevillana({
  variable: "--font-sevillana",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// export const metadata = {
//   title: "Qivamall",
// };

export default function QivamallLogo() {
  return (
    <div>
      <div className={` ${cn(inter.variable)}`}>
        <h1
          // style={{ fontFamily: "var(--font-inter)" }}
          className="text-3xl font-extrabold tracking-wide text-slate-800"
        >
          <span className="text-orange-600">Q</span>ivamall
        </h1>
        <div>
          <div className="bg-card relative h-7 w-7 rounded-full border-orange-600 border-[6px]" />
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg">
            <div className="absolute inset-4 bg-[#fff] rounded-full" />
            <div className="absolute bottom-6 right-0 w-2 h-6 bg-gradient-to-br from-orange-500 to-orange-700 -rotate-45 rounded-bl-[80%] rounded-tr-[80%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
