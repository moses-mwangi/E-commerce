"use client";

import { useDispatch } from "react-redux";
import { applyDiscount } from "@/redux/slices/cartSlice";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppDispatch } from "@/redux/store";

export default function DiscountInput() {
  const dispatch: AppDispatch = useDispatch();
  const [discountCode, setDiscountCode] = useState("");

  const handleApplyDiscount = () => {
    dispatch(applyDiscount(Number(discountCode)));
  };

  return (
    <div className=" flex items-center justify-between">
      <input
        className="bg-slate-50 rounded-md text-sm p-2 max-w-40"
        type="text"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        placeholder="Enter discount code"
      />
      <Label
        className="mr-3 cursor-pointer text-[14px] hover:bg-slate-50 rounded-md p-2"
        onClick={handleApplyDiscount}
      >
        Apply Discount
      </Label>
    </div>
  );
}
