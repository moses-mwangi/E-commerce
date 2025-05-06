import { Button } from "@/components/ui/button";
import { Apple, CheckCircle2, Play, QrCode } from "lucide-react";
import React from "react";

export default function GetOurApp() {
  return (
    <div className="p-6 grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-2">
            Get Our Mobile App
          </h3>
          <p className="text-gray-600">
            Shop faster, track orders, and get exclusive app-only deals
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green-500" />
            <p>Exclusive mobile discounts</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green-500" />
            <p>Faster checkout with saved payment</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green-500" />
            <p>Push notifications for order updates</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green-500" />
            <p>Wishlist and save items for later</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
            <Apple size={18} />
            <div className="text-left">
              <p className="text-xs">Download on the</p>
              <p className="text-sm font-semibold">App Store</p>
            </div>
          </button>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
            <Play size={18} />
            <div className="text-left">
              <p className="text-xs">Get it on</p>
              <p className="text-sm font-semibold">Google Play</p>
            </div>
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {/* <div className="relative w-48 h-96 border-4 border-gray-800 rounded-3xl overflow-hidden"> */}
        <div className="relative w-36 h-72 border-4 border-gray-800 rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-7 bg-gray-800" />

          <div className="absolute top-7 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white px-3 py-2">
            <div className="bg-white rounded-lg shadow-md px-2 py-[6px] mb-3">
              <div className="flex gap-2 mb-2">
                <div className="bg-gray-200 rounded w-10 h-10" />
                <div className="flex-1">
                  <div className="bg-gray-200 rounded h-[9px] w-3/4 mb-2" />
                  <div className="bg-gray-200 rounded h-[9px] w-1/2" />
                </div>
              </div>
              <Button className="bg-primary h-6 text-white text-center rounded-md text-[11px]">
                Shop Now
              </Button>
            </div>
            <div className="text-center">
              <p className="font-bold text-[17px] mb-1">Welcome!</p>
              <p className="text-[11px] text-gray-500">
                Scan this code to download our app
              </p>
              <div className="mx-auto my-2 bg-white p-2 w-32 h-24 flex items-center justify-center">
                <QrCode size={30} className="text-gray-400 " />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>Coming soon</div>
    </div>
  );
}
