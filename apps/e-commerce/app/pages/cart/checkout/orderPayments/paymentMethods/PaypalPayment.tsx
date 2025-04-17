// "use client";

// import { Input } from "@/components/ui/input";
// import { Phone } from "lucide-react";
// import React, { useState } from "react";

// export default function PaypalPayment() {
//   const [showCvv, setShowCvv] = useState(false);
//   return (
//     <div className="py-3">
//       <div className=" flex flex-col space-y-4">
//         <div className="bg-yellow-200 relative">
//           <Input
//             placeholder={`M-Pesa`}
//             className=" bg-gray-50 focus-visible:ring-orange-500/30 pl-9"
//           />
//           <Phone
//             size={16}
//             className=" absolute top-1/2 left-3 transform -translate-y-1/2"
//           />
//         </div>
//         <div className="flex gap-3 items-center">
//           <Input
//             className="bg-gray-50 focus-visible:ring-orange-500/30"
//             placeholder="First Name"
//           />
//           <Input
//             className="bg-gray-50 focus-visible:ring-orange-500/30"
//             placeholder="Surname"
//           />
//         </div>
//         <div className="flex bg-gray-50 items-center relative gap-2 rounded-md border border-input  pl-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
//           {/* <div className="text-gray-700 text-sm text-nowrap flex gap-1">{`${flag} +${countryCode}`}</div> */}
//           <div className="text-gray-700 text-sm text-nowrap flex gap-1">{`+254`}</div>
//           <Input
//             type="text"
//             placeholder="Phone Number"
//             className="focus-visible:ring-0  focus-visible:ring-ring border-0 shadow-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface PaypalPaymentProps {
  onDetailsChange: (details: {
    email: string;
    firstName: string;
    lastName: string;
  }) => void;
}

export default function PaypalPayment({ onDetailsChange }: PaypalPaymentProps) {
  const [paypalDetails, setPaypalDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  // Track previous values to prevent unnecessary updates
  const prevDetailsRef = useRef(paypalDetails);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaypalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Only call onDetailsChange when values actually change
  useEffect(() => {
    if (
      JSON.stringify(prevDetailsRef.current) !== JSON.stringify(paypalDetails)
    ) {
      onDetailsChange({
        email: paypalDetails.email,
        firstName: paypalDetails.firstName,
        lastName: paypalDetails.lastName,
      });
      prevDetailsRef.current = paypalDetails;
    }
  }, [paypalDetails, onDetailsChange]);

  return (
    <div className="p-6 bg-white rounded-b-lg">
      <div className="flex flex-col space-y-4">
        <div className=" relative">
          <Input
            name="email"
            value={paypalDetails.email}
            onChange={handleInputChange}
            placeholder="PayPal Email"
            className="bg-gray-50 focus-visible:ring-orange-500/30 pl-9"
            type="email"
            required
          />
          <Mail
            size={16}
            className="absolute top-1/2 left-3 transform -translate-y-1/2"
          />
        </div>
        <div className="flex gap-3 items-center">
          <Input
            name="firstName"
            value={paypalDetails.firstName}
            onChange={handleInputChange}
            className="bg-gray-50 focus-visible:ring-orange-500/30"
            placeholder="First Name"
            required
          />
          <Input
            name="lastName"
            value={paypalDetails.lastName}
            onChange={handleInputChange}
            className="bg-gray-50 focus-visible:ring-orange-500/30"
            placeholder="Last Name"
            required
          />
        </div>
      </div>
    </div>
  );
}
