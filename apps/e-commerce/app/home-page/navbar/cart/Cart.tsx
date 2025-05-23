// "use client";

// import LoadingState from "@/app/components/LoadingState";
// import { Button } from "@/components/ui/button";
// import { AppDispatch, RootState } from "@/redux/store";
// import { ShoppingCartIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function CartPage() {
//   const [myCart, setMyCart] = useState([1, 2, 3, 4, 5]);
//   const [isLoading, setIsLoading] = useState(false);
//   const { push } = useRouter();

//   const { items } = useSelector((state: RootState) => state.cart);
//   const dispatch: AppDispatch = useDispatch();
//   const router = useRouter();

//   return (
//     <>
//       {isLoading && <LoadingState />}
//       <div
//         className="relative cursor-pointer"
//         onClick={() => {
//           push("/pages/cart");
//         }}
//       >
//         <ShoppingCartIcon color="gray" className="w-[26px] h-[26px]" />
//         {myCart.length && (
//           <Button className=" absolute top-0 right-0 transform translate-x-3 -translate-y-3 bg-red-400 rounded-full w-[18px] h-[18px] p-0">
//             {items.length}
//           </Button>
//         )}
//       </div>
//     </>
//   );
// }
"use client";

import LoadingState from "@/app/components/loaders/LoadingState";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/redux/store";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import LoadingState from "@/components/LoadingState";

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  return (
    <>
      {isLoading && <LoadingState />}
      <div
        className="relative cursor-pointer block"
        onClick={() => {
          setIsLoading(true);
          push("/pages/cart");
        }}
      >
        <ShoppingCartIcon
          color="gray"
          className="sm:w-[25px] sm:h-[25px] w-5 h-5"
        />
        {items.length > 0 && (
          <Button
            className="absolute top-0 right-0 transform translate-x-3 sm:translate-x-3 translate-y-3 sm:-translate-y-2 
            bg-red-400 rounded-full sm:w-[18px] sm:h-[18px] w-[12px] h-[12px] text-sm sm:text-sm flex items-center justify-center p-0"
          >
            {items.length}
          </Button>
        )}
      </div>
    </>
  );
}
