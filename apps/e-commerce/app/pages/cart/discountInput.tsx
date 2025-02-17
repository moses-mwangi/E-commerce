"use client";

import { useDispatch } from "react-redux";
import { applyDiscount } from "@/redux/slices/cartSlice";
import { useState } from "react";

export default function DiscountInput() {
  const dispatch = useDispatch();
  const [discountCode, setDiscountCode] = useState("");

  const handleApplyDiscount = () => {
    if (discountCode === "SAVE20") {
      dispatch(applyDiscount(20));
    } else {
      alert("Invalid Discount Code");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        placeholder="Enter discount code"
      />
      <button onClick={handleApplyDiscount}>Apply Discount</button>
    </div>
  );
}
