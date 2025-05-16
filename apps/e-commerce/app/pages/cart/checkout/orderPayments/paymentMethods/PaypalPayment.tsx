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

  const prevDetailsRef = useRef(paypalDetails);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaypalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
