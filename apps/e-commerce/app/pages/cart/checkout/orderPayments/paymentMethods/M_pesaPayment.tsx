import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useRef } from "react";
import M_Pesa from "../../../../../../public/mpesa.png";
import Image from "next/image";

interface MpesaPaymentProps {
  onDetailsChange: (details: {
    phone: string;
    firstName: string;
    surname: string;
  }) => void;
}

export default function MpesaPayment({ onDetailsChange }: MpesaPaymentProps) {
  const [mpesaDetails, setMpesaDetails] = useState({
    phone: "",
    firstName: "",
    surname: "",
  });

  const prevDetailsRef = useRef(mpesaDetails);

  useEffect(() => {
    if (
      JSON.stringify(prevDetailsRef.current) !== JSON.stringify(mpesaDetails)
    ) {
      onDetailsChange(mpesaDetails);
      prevDetailsRef.current = mpesaDetails;
    }
  }, [mpesaDetails, onDetailsChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMpesaDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 bg-card rounded-b-lg">
      <div className="flex flex-col space-y-4">
        <div className=" relative">
          <Input
            placeholder="M-Pesa"
            className="bg-gray-50 focus-visible:ring-orange-500/30 pl-9"
            defaultValue="M-Pesa"
            readOnly
          />
          <Image
            src={M_Pesa}
            alt="m_pesa_logo"
            width={50}
            height={50}
            className="w-5 h-auto absolute top-1/2 left-3 transform -translate-y-1/2"
          />
        </div>
        <div className="flex gap-3 items-center">
          <Input
            name="firstName"
            value={mpesaDetails.firstName}
            onChange={handleInputChange}
            className="bg-gray-50 focus-visible:ring-orange-500/30"
            placeholder="First Name"
            required
          />
          <Input
            name="surname"
            value={mpesaDetails.surname}
            onChange={handleInputChange}
            className="bg-gray-50 focus-visible:ring-orange-500/30"
            placeholder="Surname"
            required
          />
        </div>
        <div className="flex bg-gray-50 items-center relative gap-2 rounded-md border border-input pl-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
          <div className="text-gray-700 text-sm text-nowrap flex gap-1">
            +254
          </div>
          <Input
            name="phone"
            value={mpesaDetails.phone}
            onChange={handleInputChange}
            type="tel"
            placeholder="Phone Number"
            className="focus-visible:ring-0 focus-visible:ring-ring border-0 shadow-none"
            required
          />
        </div>
      </div>
    </div>
  );
}
