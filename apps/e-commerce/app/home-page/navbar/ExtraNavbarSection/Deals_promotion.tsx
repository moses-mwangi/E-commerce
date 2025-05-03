import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";
import React from "react";

export default function Deals_promotion() {
  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary border-b pb-2">
          Today&apos;s Deals
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((deal) => (
            <div
              key={deal}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
            >
              <div className="bg-red-100 p-2 rounded-full">
                <Gem size={20} className="text-red-500" />
              </div>
              <div>
                <p className="font-medium">Flash Sale {deal}</p>
                <p className="text-sm text-gray-500">
                  Up to {60 - deal * 10}% off
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary border-b pb-2">
          Member Exclusive
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((offer) => (
            <div
              key={offer}
              className="border rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 p-2 rounded-lg mb-2">
                <Gem size={24} className="text-blue-500" />
              </div>
              <p className="text-sm text-center">
                Members save {20 + offer * 5}%
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary border-b pb-2">
          Limited Time Offers
        </h3>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">Weekend Special</p>
          <p className="text-sm text-gray-600 mb-3">
            Selected items at lowest prices
          </p>
          <Button className="bg-orange-500/85 hover:bg-orange-600 h-7 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}
