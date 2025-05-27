"use client";

import {
  ArrowLeft,
  Truck,
  Clock,
  MapPin,
  Package,
  Check,
  Shield,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DeliveryInformationPage() {
  return (
    <div className="px-3 py-5 sm:px-6 sm:py-6 max-w-7xl mx-auto">
      <Link
        href="/supports"
        className="flex items-center gap-2 text-sm text-primary mb-6 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Help Center
      </Link>

      <div className="flex items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-2 rounded-full">
              <Truck className="text-green-500" size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Our Delivery Process
            </h1>
          </div>

          <div className="bg-white border rounded-xl p-6 mb-8 shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="text-stone-600" /> How Your Order Reaches You
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  icon: <Clock className="text-blue-500" size={20} />,
                  title: "Order Processing",
                  description: "1-2 business days to prepare your items",
                },
                {
                  icon: <Truck className="text-green-500" size={20} />,
                  title: "Shipping Partners",
                  description: "Reliable carriers like UPS, FedEx, and DHL",
                },
                {
                  icon: <MapPin className="text-blue-500" size={20} />,
                  title: "Delivery Areas",
                  description: "Nationwide coverage with international options",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border shadow rounded-lg p-4 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">
                Step-by-Step Delivery Journey
              </h3>
              <ol className="space-y-4">
                {[
                  "Order confirmation email sent immediately",
                  "Items picked and packed in our warehouse",
                  "Package handed to shipping carrier",
                  "Real-time tracking updates provided",
                  "Safe delivery to your doorstep",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                      <Check size={16} />
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="border shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Truck className="text-green-500" /> Delivery Options
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  type: "Standard Delivery",
                  time: "3-5 business days",
                  price: "Free on orders over $50",
                  features: [
                    "Trackable",
                    "Signature not required",
                    "Evening deliveries available",
                  ],
                },
                {
                  type: "Express Delivery",
                  time: "1-2 business days",
                  price: "$9.99",
                  features: [
                    "Priority processing",
                    "Live tracking",
                    "Delivery time windows",
                  ],
                },
                {
                  type: "Same-Day Delivery",
                  time: "Within 4 hours",
                  price: "$14.99",
                  features: [
                    "Available in select areas",
                    "Order by 2PM local time",
                    "Real-time courier tracking",
                  ],
                  available: ["New York", "Los Angeles", "Chicago"],
                },
                {
                  type: "International Delivery",
                  time: "5-10 business days",
                  price: "Varies by destination",
                  features: [
                    "Customs clearance included",
                    "Duties calculated at checkout",
                    "Global tracking",
                  ],
                },
              ].map((option, i) => (
                <div
                  key={i}
                  className="border shadow rounded-lg p-4 hover:border-orange-500/85 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{option.type}</h3>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      {option.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{option.price}</p>

                  <ul className="space-y-2 text-sm">
                    {option.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check
                          className="text-green-500 mt-0.5 flex-shrink-0"
                          size={14}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {option.available && (
                    <div className="mt-3 pt-3 border-t text-xs">
                      <p className="font-medium">Available in:</p>
                      <p>{option.available.join(", ")}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-xl p-6 mb-8 bg-blue-50 border-blue-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
              <Shield className="text-blue-700" /> Our Delivery Promises
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3 text-blue-700">
                  On-Time Delivery
                </h3>
                <p className="text-sm text-blue-600">
                  We guarantee your order will arrive by the estimated date or
                  we&apos;ll refund your shipping costs.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-blue-700">
                  Package Protection
                </h3>
                <p className="text-sm text-blue-600">
                  All shipments are insured against loss or damage during
                  transit.
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="text-blue-500" /> Tracking Your Package
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Where to Find Tracking</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Mail
                      className="text-primary mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <span>In your shipping confirmation email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package
                      className="text-primary mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <span>Under &apos;My Orders&apos; in your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Truck
                      className="text-primary mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <span>Directly on the carrier&apos;s website</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-3">Tracking Not Working?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  It may take 24-48 hours for tracking information to appear
                  after shipment.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-72 space-y-6 sticky top-6">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Need Help Now?</h3>
            <Button className="w-full bg-orange-500/90 hover:bg-orange-600/90 mb-2 flex items-center gap-2">
              <Phone size={16} /> Call Support
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Mail size={16} /> Email Us
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              Mon-Fri: 8AM-8PM EST
              <br />
              Sat-Sun: 9AM-5PM EST
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Delivery FAQs</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-primary hover:underline">
                  Can I change my delivery address?
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  What if I&apos;m not home for delivery?
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  Do you deliver to PO boxes?
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  How are fragile items packaged?
                </Link>
              </li>
            </ul>
          </div>

          <div className="border rounded-xl p-5 bg-green-50 border-green-100">
            <h3 className="font-semibold mb-3 text-green-800">
              Eco-Friendly Delivery
            </h3>
            <p className="text-sm text-green-600">
              We offset 100% of our delivery carbon emissions and use recyclable
              packaging materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
