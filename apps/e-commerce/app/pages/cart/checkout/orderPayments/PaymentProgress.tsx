"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  "Order",
  "Payment",
  "Confirmed",
  "Dispatch",
  "Delivery",
  "Review",
];

export default function PaymentProgress({ val }: { val: number }) {
  return (
    <div className="mb-8 w-full px-2 sm:px-4">
      <div className="relative flex justify-between items-center w-full mb-4">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 z-0 transform -translate-y-1/2" />

        {/* Progress Fill */}
        <div
          className="absolute top-1/2 rounded-md left-0 h-[3px] bg-primary z-10 transform -translate-y-1/2 transition-all duration-300"
          style={{
            width: `${((val - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Circles */}
        {steps.map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < val;
          const isCurrent = stepNumber === val;

          return (
            <div
              key={index}
              className="relative z-20 flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              <div
                className={cn(
                  "w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
                  isCompleted || isCurrent
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-300 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <div className="w-2 h-2 bg-current rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-600 w-full">
        {steps.map((label, index) => (
          <div
            key={index}
            className="text-center px-1"
            style={{ width: `${100 / steps.length}%` }}
          >
            <span
              className={cn(
                "inline-block whitespace-nowrap overflow-hidden text-ellipsis w-full",
                index + 1 <= val ? "text-primary font-semibold" : ""
              )}
              title={label}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
