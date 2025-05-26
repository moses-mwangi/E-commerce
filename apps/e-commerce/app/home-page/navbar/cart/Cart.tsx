"use client";

import LoadingState from "@/app/components/loaders/LoadingState";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
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
          className="sm:w-[25px] sm:h-[25px] w-[24px] h-[24px]"
        />
        {items.length > 0 && (
          <Button
            className="absolute top-0 right-0 transform translate-x-1 sm:translate-x-3 -translate-y-1 sm:-translate-y-2 
            bg-red-400 rounded-full sm:w-[18px] sm:h-[18px] w-[12px] h-[12px] text-xs sm:text-sm flex items-center justify-center p-0"
          >
            {items.length}
          </Button>
        )}
      </div>
    </>
  );
}
