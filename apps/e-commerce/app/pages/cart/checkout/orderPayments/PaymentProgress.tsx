"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils"; // Or use template literals

const steps = ["Shipping", "Delivery", "Payment"];

export default function PaymentProgress({ val }: { val: number }) {
  const [step, setStep] = useState(val);

  return (
    <div className="mb-8 px-4">
      <div className="relative flex justify-between items-center w-full mb-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 z-0 transform -translate-y-1/2" />

        {steps.map((label, index) => {
          const isActive = index + 1 <= step;
          return (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center w-1/3"
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2",
                  isActive
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-300"
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-sm text-gray-600 px-[4px]">
        {steps.map((label, index) => (
          <div key={index} className="w-1/3 flex justify-center">
            <span
              className={cn(
                index + 1 <= step ? "text-primary font-medium" : ""
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
