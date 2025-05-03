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
        <div className="relative w-48 h-96 border-4 border-gray-800 rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-gray-800"></div>
          <div className="absolute top-10 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="bg-white rounded-lg shadow-md p-3 mb-3">
              <div className="flex gap-2 mb-2">
                <div className="bg-gray-200 rounded w-12 h-12"></div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded h-3 w-3/4 mb-2"></div>
                  <div className="bg-gray-200 rounded h-3 w-1/2"></div>
                </div>
              </div>
              <div className="bg-primary text-white text-center py-2 rounded-md text-sm">
                Shop Now
              </div>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg mb-1">Welcome!</p>
              <p className="text-xs text-gray-500">
                Scan this code to download our app
              </p>
              <div className="mx-auto my-3 bg-white p-2 w-24 h-24 flex items-center justify-center">
                <QrCode size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
