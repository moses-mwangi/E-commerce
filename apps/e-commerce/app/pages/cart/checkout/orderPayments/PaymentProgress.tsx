// "use client";

// import React, { useState } from "react";
// import { cn } from "@/lib/utils"; // Or use template literals

// // const steps = ["Order", "Payment", "Shipping", "Delivery"];
// const steps = [
//   "Cart",
//   "Information",
//   "Shipping",
//   "Payment",
//   "Confirmation",
//   "Review",
// ];

// export default function PaymentProgress({ val }: { val: number }) {
//   const [step, setStep] = useState(val);

//   return (
//     <div className="mb-8 px-4">
//       <div className="relative flex justify-between items-center w-full mb-4">
//         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 z-0 transform -translate-y-1/2" />

//         {steps.map((label, index) => {
//           const isActive = index + 1 <= step;
//           return (
//             <div
//               key={index}
//               className="relative z-10 flex flex-col items-center w-1/3"
//             >
//               <div
//                 className={cn(
//                   "w-4 h-4 rounded-full border-2",
//                   isActive
//                     ? "bg-primary border-primary"
//                     : "bg-white border-gray-300"
//                 )}
//               />
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-between text-sm text-gray-600 px-[4px]">
//         {steps.map((label, index) => (
//           <div key={index} className="w-1/3 flex justify-center">
//             <span
//               className={cn(
//                 index + 1 <= step ? "text-primary font-medium" : ""
//               )}
//             >
//               {label}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// "use client";

// import React from "react";
// import { cn } from "@/lib/utils";
// import { Check } from "lucide-react";

// const steps = [
//   "Order",
//   "Payment",
//   "Confirmation",
//   "Dispatch/Shipping",
//   "Delivery",
//   "Review",
//   "Review",
//   "Review",
// ];

// export default function PaymentProgress({ val }: { val: number }) {
//   return (
//     <div className="mb-8 px-4">
//       {/* PROGRESS LINE */}
//       <div className="relative flex justify-between items-center w-full mb-4 flex-wrap gap-2 sm:gap-0">
//         <div className="absolute top-1/2 left-0 w-full h-[2.1px] bg-gray-200 z-0 transform -translate-y-1/2" />

//         {/* Filled line based on progress */}

//         <div
//           className="absolute top-1/2 left-0 h-[2.4px] bg-primary z-10 transform -translate-y-1/2 transition-all duration-300"
//           style={{
//             width: `${((val - 1) / (steps.length - 1)) * 100}%`,
//           }}
//         />

//         {/* Step Circles */}
//         {steps.map((_, index) => {
//           const stepNumber = index + 1;
//           const isCompleted = stepNumber < val;
//           const isCurrent = stepNumber === val;

//           return (
//             <div
//               key={index}
//               className="relative z-20 flex flex-col items-center w-[20%] min-w-[50px]"
//             >
//               <div
//                 className={cn(
//                   "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
//                   isCompleted || isCurrent
//                     ? "bg-primary border-primary text-white"
//                     : "bg-white border-gray-300 text-gray-400"
//                 )}
//               >
//                 {isCompleted ? (
//                   <Check className="w-4 h-4" />
//                 ) : (
//                   <div className="w-2 h-2 bg-current rounded-full" />
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* STEP LABELS */}
//       <div className="flex justify-between text-xs text-gray-600 px-[4px] flwwex-wrap gap-2 sm:gap-0">
//         {steps.map((label, index) => (
//           <div
//             key={index}
//             className="w-[20%] min-w-[50px] flex justify-center text-center"
//           >
//             <span
//               className={cn(
//                 index + 1 <= val ? "text-primary font-semibold" : ""
//               )}
//             >
//               {label}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// You can try 8–10+ steps here
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
