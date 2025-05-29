import { Clock, Globe2, Truck } from "lucide-react";

export default function Shipping() {
  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          <Truck size={20} /> Shipping Options
        </h3>
        <div className="space-y-4">
          <div className="border-b pb-3">
            <p className="font-medium">Standard Shipping</p>
            <p className="text-sm text-gray-600">3-5 business days • $4.99</p>
          </div>
          <div className="border-b pb-3">
            <p className="font-medium">Express Shipping</p>
            <p className="text-sm text-gray-600">1-2 business days • $9.99</p>
          </div>
          <div>
            <p className="font-medium">Free Shipping</p>
            <p className="text-sm text-gray-600">Orders over $50 • 5-7 days</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary">Track Your Order</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm mb-3">
            Enter your tracking number to check delivery status
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tracking number"
              className="flex-1 border rounded-md px-3 py-2 text-sm"
            />
            <button className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm hover:bg-orange-600 transition">
              Track
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary">
          International Shipping
        </h3>
        <div className="flex items-start gap-3">
          <Globe2 size={18} className="text-gray-500 mt-1" />
          <div>
            <p className="font-medium">Worldwide Delivery</p>
            <p className="text-sm text-gray-600">Available to 200+ countries</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock size={18} className="text-gray-500 mt-1" />
          <div>
            <p className="font-medium">Customs Clearance</p>
            <p className="text-sm text-gray-600">
              Duties & taxes calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
