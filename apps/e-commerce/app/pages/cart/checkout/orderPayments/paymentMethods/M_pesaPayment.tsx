import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import React, { useState } from "react";
import amexCard from "../../../../../../public/amex.png";
import M_Pesa from "../../../../../../public/mpesa.png";
import Image from "next/image";

export default function MpesaPayment() {
  const [showCvv, setShowCvv] = useState(false);
  return (
    <div className="py-3">
      <div className=" flex flex-col space-y-4">
        <div className="bg-yellow-200 relative">
          <Input
            placeholder={`M-Pesa`}
            className=" bg-gray-50 focus-visible:ring-orange-500/30 pl-9"
            defaultValue="M-Pesa"
          />
          <Image
            src={M_Pesa}
            alt="m_pesa_logo"
            width={50}
            height={50}
            className="w-5 h-auto absolute top-1/2 left-3 transform -translate-y-1/2"
          />
          {/* <Phone
            size={16}
            className=" absolute top-1/2 left-3 transform -translate-y-1/2"
          /> */}
        </div>
        <div className="flex gap-3 items-center">
          <Input
            className="bg-gray-50 focus-visible:ring-orange-500/30"
            placeholder="First Name"
          />
          <Input
            className="bg-gray-50 focus-visible:ring-orange-500/30"
            placeholder="Surname"
          />
        </div>
        <div className="flex bg-gray-50 items-center relative gap-2 rounded-md border border-input  pl-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
          {/* <div className="text-gray-700 text-sm text-nowrap flex gap-1">{`${flag} +${countryCode}`}</div> */}
          <div className="text-gray-700 text-sm text-nowrap flex gap-1">{`+254`}</div>
          <Input
            type="text"
            placeholder="Phone Number"
            className="focus-visible:ring-0  focus-visible:ring-ring border-0 shadow-none"
          />
        </div>
      </div>
    </div>
  );
}
