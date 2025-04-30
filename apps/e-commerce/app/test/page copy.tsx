import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function PaymentForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-xl p-6 shadow-2xl border border-gray-200 rounded-2xl">
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Image
              src="/credit-card-icon.png"
              alt="Secure Payment"
              width={40}
              height={40}
            />
            <span className="text-xl font-semibold text-gray-700">
              Secure Payment
            </span>
            <div className="flex space-x-2 ml-auto">
              {[
                "visa",
                "mastercard",
                "amex",
                "discoverCard",
                "jcbCard",
                "dinnerCard",
                "unionPay",
              ].map((card, idx) => (
                <Image
                  key={idx}
                  src={`/${card}.png`}
                  alt={card}
                  width={40}
                  height={25}
                  className="rounded"
                />
              ))}
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" className="rounded-xl" />
              <Input placeholder="Last Name" className="rounded-xl" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Card Number
              </label>
              <div className="relative">
                <Input
                  placeholder="1234 1234 1234 1234"
                  className="rounded-xl pr-28"
                />
                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-semibold px-4 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800"
                  type="button"
                >
                  Autofill link
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Expiry Date
                </label>
                <Input placeholder="MM / YY" className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  CVC
                </label>
                <Input placeholder="CVC" className="rounded-xl" />
              </div>
            </div>

            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-2 rounded-xl">
              Pay Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
