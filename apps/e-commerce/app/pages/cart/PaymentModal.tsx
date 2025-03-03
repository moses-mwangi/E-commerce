"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
// import { SiMpesa } from "react-icons/si";

export default function PaymentModal({ onClose }: { onClose: () => void }) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 overflow-y-scroll flex items-center justify-center bg-black/60 backdrop-blur-[3px] bg-opacity-50 z-50">
      <div className="bg-white absolute rounded-lg shadow-lg p-6 w-[500px]">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        <X className=" relative top-0 right-0" />

        <div className="grid grid-cols-4 gap-3">
          <Card
            className={`cursor-pointer  w-24 h-24 flex flex-col justify-center items-center gap-2 ${
              selectedMethod === "card" ? "bg-gray-50" : "bg-gray-100"
            }`}
            onClick={() => setSelectedMethod("card")}
          >
            <FaCreditCard className="w-5 h-5" /> Card
          </Card>

          <Card
            className={`cursor-pointer  w-24 h-24 flex flex-col justify-center items-center gap-2 ${
              selectedMethod === "paypal" ? "bg-gray-50" : "bg-gray-100"
            }`}
            onClick={() => setSelectedMethod("paypal")}
          >
            <FaPaypal className="w-5 h-5" /> PayPal
          </Card>

          <Card className="cursor-pointer w-24 h-24 flex flex-col justify-center items-center gap-2 bg-gray-50 hover:bg-gray-100">
            {/* <SiMpesa className="w-5 h-5" /> */}
            M-Pesa
          </Card>

          <Card className="cursor-pointer  w-24 h-24 flex flex-col justify-center items-center gap-2 bg-gray-50 hover:bg-gray-100">
            <FaMoneyBillWave className="w-5 h-5" /> Delivery
          </Card>
        </div>

        {/* Dynamic Payment Fields */}
        {selectedMethod === "card" && (
          <div className="mt-4 space-y-3 p-4 bg-gray-100 rounded-lg">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="First Last"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Card Number</label>
              <input
                type="text"
                placeholder="**** **** **** ****"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex space-x-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium">Expires</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium">Year</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Year</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i}>{new Date().getFullYear() + i}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">CVC</label>
              <input
                type="text"
                placeholder="CVC"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {selectedMethod === "paypal" && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700">
              You will be redirected to PayPal to complete your payment.
            </p>
          </div>
        )}

        <Button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md">
          Continue
        </Button>

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
