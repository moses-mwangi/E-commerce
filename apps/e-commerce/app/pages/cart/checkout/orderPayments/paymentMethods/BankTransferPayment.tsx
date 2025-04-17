"use client";

import { Input } from "@/components/ui/input";
import { Banknote } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface BankTransferPaymentProps {
  onDetailsChange: (details: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    swiftCode?: string;
    iban?: string;
  }) => void;
}

export default function BankTransferPayment({
  onDetailsChange,
}: BankTransferPaymentProps) {
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    swiftCode: "",
    iban: "",
  });

  const prevDetailsRef = useRef(bankDetails);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (
      JSON.stringify(prevDetailsRef.current) !== JSON.stringify(bankDetails)
    ) {
      onDetailsChange({
        accountNumber: bankDetails.accountNumber,
        accountName: bankDetails.accountName,
        bankName: bankDetails.bankName,
        ...(bankDetails.swiftCode && { swiftCode: bankDetails.swiftCode }),
        ...(bankDetails.iban && { iban: bankDetails.iban }),
      });
      prevDetailsRef.current = bankDetails;
    }
  }, [bankDetails, onDetailsChange]);

  return (
    <div className="p-6 bg-white rounded-b-lg">
      <div className="flex flex-col space-y-4">
        <div className=" relative rounded-md">
          <Input
            name="bankName"
            value={bankDetails.bankName}
            onChange={handleInputChange}
            placeholder="Bank Name"
            className="bg-gray-50 focus-visible:ring-blue-500/30 pl-9"
            required
          />
          <Banknote
            size={16}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-600"
          />
        </div>

        <div className="flex gap-3 items-center">
          <Input
            name="accountName"
            value={bankDetails.accountName}
            onChange={handleInputChange}
            className="bg-gray-50 focus-visible:ring-blue-500/30"
            placeholder="Account Holder Name"
            required
          />
          <Input
            name="accountNumber"
            value={bankDetails.accountNumber}
            onChange={handleInputChange}
            className="bg-gray-50 focus-visible:ring-blue-500/30"
            placeholder="Account Number"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            name="swiftCode"
            value={bankDetails.swiftCode}
            onChange={handleInputChange}
            placeholder="SWIFT/BIC Code"
            className="bg-gray-50 focus-visible:ring-blue-500/30"
          />
          <Input
            name="iban"
            value={bankDetails.iban}
            onChange={handleInputChange}
            placeholder="IBAN (if international)"
            className="bg-gray-50 focus-visible:ring-blue-500/30"
          />
        </div>
      </div>
    </div>
  );
}
