import { CheckCircle2, ShieldCheck } from "lucide-react";
import React from "react";

export default function OrderProtection() {
  return (
    <div className="p-6 grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          <ShieldCheck size={20} /> Order Protection
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 mt-1" />
            <div>
              <p className="font-medium">Money Back Guarantee</p>
              <p className="text-sm text-gray-600">
                Full refund if items don&apos;t arrive
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 mt-1" />
            <div>
              <p className="font-medium">Authenticity Verified</p>
              <p className="text-sm text-gray-600">
                Guaranteed genuine products
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 mt-1" />
            <div>
              <p className="font-medium">Extended Warranty</p>
              <p className="text-sm text-gray-600">Up to 2 years coverage</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-5">
        <h4 className="font-semibold mb-3">How It Works</h4>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">
              1
            </div>
            <p className="text-sm">Select Order Protection at checkout</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">
              2
            </div>
            <p className="text-sm">Enjoy protected shopping experience</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">
              3
            </div>
            <p className="text-sm">File claim if issues arise</p>
          </div>
        </div>
      </div>
    </div>
  );
}
