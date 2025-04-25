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
    <div className="mb-8 px-4 overflow-x-auto">
      <div className="min-w-[600px] md:min-w-full relative flex justify-between items-center w-full mb-4 flex-nowrap">
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
              className="relative z-20 flex flex-col items-center min-w-[70px]"
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
                  isCompleted || isCurrent
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-300 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <div className="w-2 h-2 bg-current rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-600 flex-nowrap gap-1 overflow-x-auto">
        {steps.map((label, index) => (
          <div key={index} className="min-w-[70px] text-center">
            <span
              className={cn(
                index + 1 <= val ? "text-primary font-semibold" : ""
              )}
              title={label} // Tooltip on hover
            >
              {label.length > 10 ? label.slice(0, 10) + "…" : label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// "use client";

// import React from "react";
// import {
//   Check,
//   Clock,
//   Package,
//   CreditCard,
//   Truck,
//   Home,
//   Star,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const steps = [
//   { label: "Ordered", icon: Clock },
//   { label: "Paid", icon: CreditCard },
//   { label: "Confirmed", icon: Check },
//   { label: "Dispatched", icon: Package },
//   { label: "Shipped", icon: Truck },
//   { label: "Delivered", icon: Home },
//   { label: "Reviewed", icon: Star },
// ];

// export default function PaymentProgress({
//   currentStep,
// }: {
//   currentStep: number;
// }) {
//   // Calculate progress percentage (0-100)
//   const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

//   return (
//     <div className="w-full mb-8 px-4">
//       <div className="relative flex flex-col">
//         {/* Progress Bar Background */}
//         <div className="absolute top-5 left-0 right-0 h-2 bg-gray-100 rounded-full z-0" />

//         {/* Progress Fill */}
//         <div
//           className="absolute top-5 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full z-10 transition-all duration-500 ease-out"
//           style={{ width: `${progressPercentage}%` }}
//         />

//         {/* Steps Container */}
//         <div className="relative z-20 flex justify-between w-full">
//           {steps.map((step, index) => {
//             const stepNumber = index + 1;
//             const isCompleted = stepNumber < currentStep;
//             const isCurrent = stepNumber === currentStep;
//             const isUpcoming = stepNumber > currentStep;

//             return (
//               <div key={index} className="flex flex-col items-center">
//                 {/* Step Indicator */}
//                 <div
//                   className={cn(
//                     "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
//                     isCompleted &&
//                       "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg",
//                     isCurrent &&
//                       "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200",
//                     isUpcoming &&
//                       "bg-white border-2 border-gray-200 text-gray-400"
//                   )}
//                 >
//                   {isCompleted ? (
//                     <Check className="w-5 h-5" />
//                   ) : (
//                     <step.icon
//                       className={cn(
//                         "w-5 h-5",
//                         isCurrent && "text-white",
//                         isUpcoming && "text-gray-400"
//                       )}
//                     />
//                   )}
//                 </div>

//                 {/* Step Label */}
//                 <span
//                   className={cn(
//                     "text-xs font-medium text-center max-w-[80px]",
//                     isCompleted && "text-green-600 font-semibold",
//                     isCurrent && "text-blue-600 font-semibold",
//                     isUpcoming && "text-gray-500"
//                   )}
//                 >
//                   {step.label}
//                 </span>

//                 {/* Step Number */}
//                 <span
//                   className={cn(
//                     "mt-1 text-xs",
//                     isCompleted && "text-green-600",
//                     isCurrent && "text-blue-600 font-bold",
//                     isUpcoming && "text-gray-400"
//                   )}
//                 >
//                   Step {stepNumber}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Status Summary */}
//       <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//         <div className="flex items-center gap-3">
//           <div
//             className={cn(
//               "w-3 h-3 rounded-full animate-pulse",
//               currentStep < steps.length ? "bg-blue-500" : "bg-green-500"
//             )}
//           />
//           <p className="text-sm font-medium">
//             {currentStep < steps.length ? (
//               <>
//                 Current status:{" "}
//                 <span className="text-blue-600">
//                   {steps[currentStep - 1].label}
//                 </span>
//               </>
//             ) : (
//               <>
//                 Order <span className="text-green-600">completed</span>{" "}
//                 successfully!
//               </>
//             )}
//           </p>
//         </div>
//         {currentStep < steps.length && (
//           <p className="mt-1 text-xs text-gray-500">
//             Next step: {steps[currentStep].label}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
