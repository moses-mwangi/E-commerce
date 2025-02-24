// "use client";
// import React from "react";
// import { Button } from "@/components/ui/button";

// export default function PaymentModal({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
//         <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
//         <div className="space-y-3">
//           <Button className="w-full bg-blue-600 hover:bg-blue-700">
//             Pay with Credit Card
//           </Button>
//           <Button className="w-full bg-green-600 hover:bg-green-700">
//             Pay with PayPal
//           </Button>
//           <Button className="w-full bg-green-600 hover:bg-green-700">
//             M-pesa
//           </Button>
//           <Button className="w-full bg-gray-600 hover:bg-gray-700">
//             Cash on Delivery
//           </Button>
//         </div>
//         <Button
//           className="mt-4 w-full bg-red-500 hover:bg-red-600"
//           onClick={onClose}
//         >
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// }
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
// import { SiMpesa } from "react-icons/si";

export default function PaymentModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[3px] bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <FaCreditCard className="w-5 h-5" /> Pay with Credit Card
          </Button>
          <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2">
            <FaPaypal className="w-5 h-5" /> Pay with PayPal
          </Button>
          <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2">
            {/* <SiMpesa className="w-5 h-5" />  */}
            M-Pesa
          </Button>
          <Button className="w-full bg-gray-600 hover:bg-gray-700 flex items-center gap-2">
            <FaMoneyBillWave className="w-5 h-5" /> Cash on Delivery
          </Button>
        </div>
        <Button
          className="mt-4 w-full bg-red-500 hover:bg-red-600"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
