import {
  ArrowLeft,
  Package,
  Clock,
  Truck,
  MapPin,
  AlertCircle,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderStatusHelp() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Link
        href="/supports"
        className="flex items-center gap-2 text-sm text-primary mb-6 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Help Center
      </Link>

      <div className="flex items-start gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-2 rounded-full">
              <Package className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold">Order Status Information</h1>
          </div>

          {/* How to Check Status */}
          <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="text-primary" /> How to Check Your Order
              Status
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Online Tracking</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Log in to your account</li>
                  <li>Go to &quot;My Orders&quot; section</li>
                  <li>Click on your order to view details</li>
                  <li>Use the tracking link if available</li>
                </ol>
              </div>
              <div>
                <h3 className="font-medium mb-3">Email Notifications</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Mail
                      className="text-primary mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <span>You&apos;ll receive emails at each stage:</span>
                  </li>
                  <li className="pl-6 text-sm">• Order confirmation</li>
                  <li className="pl-6 text-sm">• Shipping notification</li>
                  <li className="pl-6 text-sm">• Delivery confirmation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="text-primary" /> Processing & Shipping Times
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    type: "Order Processing",
                    time: "1-2 business days",
                    icon: <Package className="text-primary" size={18} />,
                  },
                  {
                    type: "Standard Shipping",
                    time: "3-5 business days",
                    icon: <Truck className="text-primary" size={18} />,
                  },
                  {
                    type: "International",
                    time: "7-14 business days",
                    icon: <MapPin className="text-primary" size={18} />,
                  },
                ].map((option, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {option.icon}
                      <h3 className="font-medium">{option.type}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{option.time}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Status Explanations */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="text-yellow-500" /> Understanding
                Statuses
              </h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        status: "Processing",
                        meaning: "Your order is being prepared for shipment",
                      },
                      {
                        status: "Shipped",
                        meaning: "Your order has left our warehouse",
                      },
                      {
                        status: "In Transit",
                        meaning: "Your package is with the carrier",
                      },
                      {
                        status: "Out for Delivery",
                        meaning: "Will arrive today",
                      },
                      {
                        status: "Delivered",
                        meaning: "Package has been delivered",
                      },
                    ].map((row, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-medium">{row.status}</td>
                        <td className="p-3 text-gray-600">{row.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Troubleshooting */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Need Help With Your Order?
              </h2>
              <div className="border rounded-lg p-5 bg-blue-50 border-blue-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-blue-800">
                      Can&apos;t find your order information?
                    </h3>
                    <p className="text-sm text-blue-600">
                      Contact our support team with your order number ready
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-700 bg-white"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Quick Help Sidebar */}
        <div className="hidden md:block w-72 space-y-6 sticky top-6">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Common Questions</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-primary hover:underline">
                  Why hasn&apos;t my order shipped yet?
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  My tracking number isn&apos;t working
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  The status hasn&apos;t updated in days
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  How to change shipping address
                </Link>
              </li>
            </ul>
          </div>
          <div className="border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Support Options</h3>
            <Button className="w-full mb-2">Live Chat</Button>
            <Button variant="outline" className="w-full">
              Email Us
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              Response time: 1 business day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
