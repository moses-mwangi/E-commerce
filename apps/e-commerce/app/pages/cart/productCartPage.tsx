/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   clearCart,
//   removeFromCart,
//   setCart,
//   updateQuantity,
// } from "@/redux/slices/cartSlice";
// import DiscountInput from "./discountInput";
// import { RootState } from "@/redux/store";
// import { TbCreditCardRefund } from "react-icons/tb";
// import { HiMiniShieldCheck } from "react-icons/hi2";
// import { IoFileTrayFullOutline } from "react-icons/io5";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { useRouter } from "next/navigation";
// import LoadingState from "@/app/components/loaders/LoadingState";
// import Link from "next/link";
// import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { MdOutlineDelete } from "react-icons/md";

// export default function ProductCartPage() {
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { categories } = useSelector((state: RootState) => state.category);
//   const { items: cartItems, totalPrice } = useSelector(
//     (state: RootState) => state.cart
//   );

//   const proSubCategory = categories
//     .find((category) =>
//       cartItems.some(
//         (item) =>
//           item.product.category?.toLowerCase() === category.name.toLowerCase()
//       )
//     )
//     ?.subcategories.find(
//       (subcat) => subcat.name.toLowerCase() === "smartphones & accessories"
//     );

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       dispatch(setCart(savedCart));
//     }
//   }, [dispatch]);

//   const handleRemove = (productId: number) => {
//     dispatch(removeFromCart(productId));
//   };

//   const handleUpdateQuantity = (productId: number, quantity: number) => {
//     dispatch(updateQuantity({ productId, quantity }));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <>
//       {isLoading && <LoadingState />}
//       <div className=" min-h-screen">
//         <div
//           className={`${
//             cartItems.length > 0 ? "px-16" : "px-44"
//           } flex items-center mt-8 justify-between mb-8`}
//         >
//           <h1
//             className={`${
//               cartItems.length > 0 ? "text-3xl" : "text-2xl"
//             } font-bold text-gray-900`}
//           >
//             Shopping Cart
//           </h1>
//           <Link
//             href="/category"
//             onClick={() => {
//               setIsLoading(true);
//             }}
//             className="flex items-center font-semibold text-gray-700 transition-all duration-200 text-sm hover:text-blue-400 hover:underline"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Continue Shopping
//           </Link>
//         </div>
//         <div className="containerCarts rounded-xl mt-6 mb-10 mx-auto px-4 pb-9">
//           {cartItems.length === 0 && (
//             <Card className="bg-gray-100 mx-40 rounded-xl text-center py-16 min-h-[50svh]">
//               <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
//               <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//                 Your cart is empty
//               </h2>
//               <p className="text-gray-500 mb-8">
//                 Looks like you haven&apos;t added any items to your cart yet.
//               </p>
//               <Button
//                 className="bg-orange-500/90 hover:bg-orange-600"
//                 onClick={() => router.push("/category")}
//               >
//                 Start Shopping
//               </Button>
//             </Card>
//           )}
//           {cartItems.length > 0 && (
//             <div className="containerCart mx-auto px-4 py-8 rounded-xl grid grid-cols-[2fr_1.1fr] gap-6">
//               <div className="cart-items space-y-6">
//                 {cartItems.length > 0 &&
//                   cartItems.map((item) => {
//                     const product = item.product;
//                     return (
//                       <div
//                         key={item.productId}
//                         className="cart-item flex items-center justify-between bg-white shadow-lg rounded-lg p-4"
//                       >
//                         <div className="grid grid-cols-[1fr_4fr] items-center space-x-4">
//                           <div>
//                             <img
//                               src={
//                                 product.productImages
//                                   ? String(
//                                       product.productImages.find(
//                                         (el: any) => el.isMain === true
//                                       )?.url
//                                     )
//                                   : ""
//                               }
//                               alt={product.name}
//                               className="w-full h-28 object-cover rounded-md"
//                             />
//                           </div>
//                           <div className=" space-y-1">
//                             <Link
//                               href={`/category/${product.category}/${proSubCategory?.name}/${product.name}?id=${product.id}`}
//                               className="font-semibold text-lg hover:underline hover:text-gray-700 transition-all duration-200 cursor-pointer"
//                             >
//                               {product.name}
//                             </Link>
//                             <p className="  text-sm text-gray-500 text-nowrap">
//                               {product.description.slice(0, 92)}...
//                             </p>

//                             <div className="price  text-gray-700 text-base font-semibold">
//                               ${product.price * item.quantity}
//                             </div>
//                             <div className="flex items-center justify-between w-full">
//                               <div className="flex items-center space-x-3">
//                                 <Button
//                                   className="text-lg w-9 h-9 text-black hover:bg-gray-100 font-semibold px-3 py-1 bg-gray-200 rounded-full"
//                                   onClick={() => {
//                                     handleUpdateQuantity(
//                                       item.productId,
//                                       item.quantity - 1
//                                     );
//                                     if (item.quantity <= 1) {
//                                       handleRemove(item.productId);
//                                     }
//                                   }}
//                                 >
//                                   {item.quantity <= 1 ? (
//                                     <MdOutlineDelete className=" text-red-500" />
//                                   ) : (
//                                     "-"
//                                   )}
//                                 </Button>
//                                 <span className="text-lg font-medium">
//                                   {item.quantity}
//                                 </span>
//                                 <Button
//                                   className="text-lg w-9 h-9 text-black hover:bg-gray-100 font-semibold px-3 py-1 bg-gray-200 rounded-full"
//                                   onClick={() =>
//                                     handleUpdateQuantity(
//                                       item.productId,
//                                       item.quantity + 1
//                                     )
//                                   }
//                                 >
//                                   +
//                                 </Button>
//                               </div>
//                               <Button
//                                 className="remove bg-red-500 h-8 text-sm text-white px-4 py-2 rounded-lg hover:bg-red-400"
//                                 onClick={() => handleRemove(item.productId)}
//                               >
//                                 Remove
//                                 {/* <MdOutlineDelete
//                                 size={22}
//                                 className=" text-red-500"
//                               /> */}
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//               </div>
//               <div className="sticky top-24 self-start">
//                 {cartItems.length > 0 && (
//                   <div className="cart-summary  bg-white shadow-lg rounded-lg p-6">
//                     <Label className="">Order Summary</Label>
//                     <div className="flex justify-between text-xl font-semibold mb-4">
//                       <p>Total amount :</p>
//                       <span>${totalPrice.toFixed(2)}</span>
//                     </div>
//                     <Separator className=" mb-4" />
//                     <DiscountInput />
//                     <Button
//                       className=" bg-orange-500 w-full rounded-lg hover:bg-orange-600 my-7"
//                       onClick={() => {
//                         setIsLoading(true);
//                         router.push("/pages/cart/checkout");
//                         // setIsModalOpen(true);
//                       }}
//                     >
//                       <HiMiniShieldCheck className="w-[19px] h-[19px]" />
//                       Check Out
//                     </Button>
//                     <Separator className=" mb-4 mt-4" />
//                     <div className="flex flex-col mt-4 gap-[3px] text-gray-700 text-[14px]">
//                       <Label className=" text-black/85 font-semibold mb-[3px] text-base">
//                         You’re protected on Hypermart.com
//                       </Label>
//                       <span className="flex gap-2 items-center">
//                         <HiMiniShieldCheck className="text-green-500 w-[18px] h-[18px]" />
//                         Secure payment
//                       </span>
//                       <span className="flex gap-2 items-center">
//                         <TbCreditCardRefund className="text-green-500 w-[18px] h-[18px]" />
//                         Refund and returns
//                       </span>
//                       <span className="flex gap-2 items-center">
//                         <IoFileTrayFullOutline className="text-green-500 w-[18px] h-[18px]" />
//                         Fulfillment by Hypermart.com Logistics
//                       </span>
//                     </div>
//                   </div>
//                 )}
//                 {cartItems.length > 0 && (
//                   <Button
//                     variant="outline"
//                     className="w-full rounded-lg mt-3 hover:bg-red-600 hover:text-white bg-red-500 text-white"
//                     onClick={handleClearCart}
//                   >
//                     <Trash2 className="w-4 h-4 mr-2" />
//                     Clear Cart
//                   </Button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  setCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";
import DiscountInput from "./discountInput";
import { RootState } from "@/redux/store";
import { TbCreditCardRefund } from "react-icons/tb";
import { HiMiniShieldCheck } from "react-icons/hi2";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import LoadingState from "@/app/components/loaders/LoadingState";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MdOutlineDelete } from "react-icons/md";

export default function ProductCartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { categories } = useSelector((state: RootState) => state.category);
  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const proSubCategory = categories
    .find((category) =>
      cartItems.some(
        (item) =>
          item.product.category?.toLowerCase() === category.name.toLowerCase()
      )
    )
    ?.subcategories.find(
      (subcat) => subcat.name.toLowerCase() === "smartphones & accessories"
    );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {isLoading && <LoadingState />}
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="px-2 sm:px-6 lg:px-16 xl:px-44 flex sm:flex-row items-center justify-between mt-4 sm:mt-8 mb-6 sm:mb-8 sm:gap-4">
          <h1 className="text-lg sm:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <Link
            href="/category"
            onClick={() => setIsLoading(true)}
            className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-200 hover:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 && (
          <div className="px-4 sm:px-8 md:px-16 lg:px-40">
            <Card className="bg-gray-100 rounded-xl text-center py-12 sm:py-16 min-h-[50svh]">
              <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6 sm:mb-8 px-4">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Button
                className="bg-orange-500/90 hover:bg-orange-600 text-sm sm:text-base"
                onClick={() => router.push("/category")}
              >
                Start Shopping
              </Button>
            </Card>
          </div>
        )}

        {/* Cart with Items */}
        {cartItems.length > 0 && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 rounded-xl flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => {
                const product = item.product;
                return (
                  <div
                    key={item.productId}
                    className="cart-item flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-3 sm:p-4"
                  >
                    <div className="w-full grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-3 sm:gap-4">
                      <div className="w-full h-32 sm:h-28">
                        <img
                          src={
                            product.productImages
                              ? String(
                                  product.productImages.find(
                                    (el: any) => el.isMain === true
                                  )?.url
                                )
                              : ""
                          }
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-1">
                        <Link
                          href={`/category/${product.category}/${proSubCategory?.name}/${product.name}?id=${product.id}`}
                          className="font-semibold text-base sm:text-lg hover:underline hover:text-gray-700 transition-all duration-200 cursor-pointer"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="text-gray-700 text-base font-semibold">
                          ${(product.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3 sm:gap-0">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                              onClick={() => {
                                handleUpdateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                );
                                if (item.quantity <= 1) {
                                  handleRemove(item.productId);
                                }
                              }}
                            >
                              {item.quantity <= 1 ? (
                                <MdOutlineDelete className="text-red-500" />
                              ) : (
                                "-"
                              )}
                            </Button>
                            <span className="text-base sm:text-lg font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="text-xs sm:text-sm h-8 px-3 sm:px-4"
                            onClick={() => handleRemove(item.productId)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start w-full lg:w-96">
              <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                <Label className="text-base sm:text-lg">Order Summary</Label>
                <div className="flex justify-between text-lg sm:text-xl font-semibold my-3 sm:mb-4">
                  <p>Total amount:</p>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Separator className="my-3 sm:my-4" />
                <DiscountInput />
                <Button
                  className="bg-orange-500 w-full rounded-lg hover:bg-orange-600 my-4 sm:my-6 text-sm sm:text-base"
                  onClick={() => {
                    setIsLoading(true);
                    router.push("/pages/cart/checkout");
                  }}
                >
                  <HiMiniShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Check Out
                </Button>
                <Separator className="my-3 sm:my-4" />
                <div className="flex flex-col mt-3 sm:mt-4 gap-2 text-gray-700 text-xs sm:text-sm">
                  <Label className="text-black/85 font-semibold text-sm sm:text-base">
                    You&apos;re protected on Hypermart.com
                  </Label>
                  <span className="flex gap-2 items-center">
                    <HiMiniShieldCheck className="text-green-500 w-4 h-4" />
                    Secure payment
                  </span>
                  <span className="flex gap-2 items-center">
                    <TbCreditCardRefund className="text-green-500 w-4 h-4" />
                    Refund and returns
                  </span>
                  <span className="flex gap-2 items-center">
                    <IoFileTrayFullOutline className="text-green-500 w-4 h-4" />
                    Fulfillment by Hypermart.com Logistics
                  </span>
                </div>
              </div>

              <Button
                variant="destructive"
                className="w-full rounded-lg mt-3 text-sm sm:text-base"
                onClick={handleClearCart}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
