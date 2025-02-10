"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import React, { useState } from "react";

const countries = [
  { value: "us", flag: "🇺🇸", name: "United States" },
  { value: "uk", flag: "🇬🇧", name: "United Kingdom" },
  { value: "de", flag: "🇩🇪", name: "Germany" },
  { value: "fr", flag: "🇫🇷", name: "France" },
  { value: "it", flag: "🇮🇹", name: "Italy" },
  { value: "ke", flag: "🇰🇪", name: "Kenya" },
];

export default function DeliverTo() {
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div
        className="flex flex-col gap-1 cursor-pointer text-gray-600 hover:text-blue-600"
        // className="flex flex-col gap-1 cursor-pointer text-slate-50 hover:text-blue-600"
        onClick={() => {
          setShowModal((el) => !el);
        }}
      >
        <div className=" flex items-center gap-1">
          <MapPin size={16} />
          <p className="text-sm font-light">Deliver to:</p>
        </div>
        <p className="text-[15px] font-medium">
          {countries.find((c) => c.value === selectedCountry)?.flag}{" "}
          {countries.find((c) => c.value === selectedCountry)?.name}
        </p>
      </div>

      {showModal === true && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[3px] z-50">
          <Card className="w-[30%] p-6 shadow-xl bg-white rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Select Your Delivery Location
              </CardTitle>
              <p className="text-sm text-gray-500">
                Delivery availability and shipping speeds may vary based on your
                selected location.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Sign-in Option */}
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md">
                Sign in for faster checkout
              </Button>

              <div className="flex items-center gap-2">
                <Separator className="flex-1" />
                <span className="text-gray-400 text-xs uppercase">or</span>
                <Separator className="flex-1" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Select Country
                </p>
                <Select
                  onValueChange={(value) => setSelectedCountry(value)}
                  defaultValue="us"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Enter ZIP / Postal Code
                </p>
                <Input placeholder="e.g. 10001" className="border-gray-300" />
              </div>

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md"
                onClick={() => {
                  setShowModal((el) => !el);
                }}
              >
                Confirm Location
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
