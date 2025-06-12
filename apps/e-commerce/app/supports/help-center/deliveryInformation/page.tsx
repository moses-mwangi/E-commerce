// "use client";

// import {
//   ArrowLeft,
//   Truck,
//   Clock,
//   MapPin,
//   Package,
//   Check,
//   Shield,
//   Phone,
//   Mail,
//   HelpCircle,
//   Zap,
// } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// const deliveryMessages = [
//   "Great news! We deliver within Nairobi, including its metropolitan and surrounding areas. Order today and get your items right at your doorstep!",
//   "Delivery available in Nakuru! Enjoy fast and reliable service straight to your location.",
//   "Now delivering in Mombasa! Place your order and experience smooth, hassle-free delivery.",
//   "Kisumu delivery coming soon! Stay tuned as we expand our reach to serve you better.",
// ];

// const DELIVERY_TYPES = [
//   { type: "same-day", label: "Same Day", color: "bg-red-500" },
//   { type: "express", label: "Express", color: "bg-orange-500" },
//   { type: "next-day", label: "Next Day", color: "bg-blue-500" },
//   { type: "standard", label: "Standard", color: "bg-gray-500" },
//   { type: "free", label: "Free", color: "bg-green-500" },
// ];

// export default function DeliveryInformationPage() {
//   return (
//     <div className="px-3 py-5 sm:px-6 sm:py-6 max-w-7xl mx-auto">
//       <div className=" sm:hidden mb-6">
//         <div className="bg-blue-600 text-white rounded-lg p-4 shadow-md">
//           <div className="flex items-center gap-3 mb-2">
//             <Truck size={20} className="flex-shrink-0" />
//             <h1 className="text-xl font-bold">Fast Delivery</h1>
//           </div>
//           <p className="text-sm mb-3">
//             Get items quickly with our delivery options
//           </p>

//           <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
//             <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
//               <Zap size={12} />
//               Same-day
//             </div>
//             <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
//               <Clock size={12} />
//               Next-day
//             </div>
//             <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
//               <Check size={12} />
//               Tracked
//             </div>
//             <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
//               <Truck size={12} />
//               Express
//             </div>
//           </div>
//         </div>

//         <div className="flex overflow-x-auto gap-2 mt-3 pb-2 no-scrollbar">
//           {DELIVERY_TYPES.map((type) => (
//             <button
//               key={type.type}
//               className={`${type.color} text-white px-3 py-1 rounded-full text-xs whitespace-nowrap`}
//             >
//               {type.label}
//             </button>
//           ))}
//         </div>
//       </div>
//       <Link
//         href="/supports"
//         className="flex items-center gap-2 text-sm text-primary mb-6 hover:underline"
//       >
//         <ArrowLeft size={16} /> Back to Help Center
//       </Link>

//       <div className="flex flex-col sm:flex-row items-start gap-8">
//         <div className="flex-1">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-primary/10 p-2 rounded-full">
//               <Truck className="text-green-500" size={24} />
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-bold">
//               Our Delivery Process
//             </h1>
//           </div>

//           <div className="bg-white border rounded-xl px-4 sm:px-6 py-6 mb-8 shadow-md">
//             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//               <Package className="text-stone-600" /> How Your Order Reaches You
//             </h2>

//             <div className="grid md:grid-cols-3 gap-6 mb-6">
//               {[
//                 {
//                   icon: <Clock className="text-blue-500" size={20} />,
//                   title: "Order Processing",
//                   description:
//                     "Processing time may vary slightly based on your location, with direct delivery available in covered areas.",
//                 },
//                 {
//                   icon: <Truck className="text-green-500" size={20} />,
//                   title: "Shipping Partners",
//                   description: "Reliable carriers like UPS, FedEx, and DHL",
//                 },
//                 {
//                   icon: <MapPin className="text-blue-500" size={20} />,
//                   title: "Delivery Areas",
//                   description:
//                     "Available within Nairobi,Nakuru, Mombasa, Kiambu!. Globally with extra transportation cost",
//                 },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="border shadow rounded-lg p-4 transition-all"
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="bg-primary/10 p-2 rounded-full">
//                       {item.icon}
//                     </div>
//                     <h3 className="font-medium">{item.title}</h3>
//                   </div>
//                   <p className="text-sm text-gray-600">{item.description}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-4">
//               <h3 className="font-medium text-lg">
//                 Step-by-Step Delivery Journey
//               </h3>
//               <ol className="space-y-4">
//                 {[
//                   "Order confirmation email sent immediately",
//                   "Items picked and packed in our warehouse",
//                   "Package handed to shipping carrier",
//                   "Real-time tracking updates provided",
//                   "Safe delivery to your doorstep",
//                 ].map((step, i) => (
//                   <li key={i} className="flex items-start gap-3">
//                     <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
//                       <Check size={16} className=" text-green-500" />
//                     </div>
//                     <span>{step}</span>
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </div>

//           <div className="border shadow-md rounded-xl px-4 sm:px-6 py-6 mb-8">
//             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//               <Truck className="text-green-500" /> Delivery Options
//             </h2>

//             <div className="grid md:grid-cols-2 gap-4">
//               {[
//                 {
//                   type: "Standard Delivery",
//                   time: "2-4 business days",
//                   price: "Free on orders over KES 7,000",
//                   features: [
//                     "Trackable",
//                     "Signature not required",
//                     "Evening deliveries available",
//                   ],
//                 },
//                 {
//                   type: "Express Delivery",
//                   time: "1-2 business days",
//                   price: "KES 500",
//                   features: [
//                     "Priority processing",
//                     "Live tracking",
//                     "Delivery time windows",
//                   ],
//                 },
//                 {
//                   type: "Same-Day Delivery",
//                   time: "Within 4 hours",
//                   price: "KES 800",
//                   features: [
//                     "Available in select areas",
//                     "Order by 2PM local time",
//                     "Real-time courier tracking",
//                   ],
//                   // available: ["New York", "Los Angeles", "Chicago"],
//                   available: ["Nairobi", "Kiambu", "Nakuru", "Mombasa"],
//                 },
//                 {
//                   type: "International Delivery",
//                   time: "5-10 business days",
//                   price: "Varies by destination",
//                   features: [
//                     "Customs clearance included",
//                     "Duties calculated at checkout",
//                     "Global tracking",
//                   ],
//                 },
//               ].map((option, i) => (
//                 <div
//                   key={i}
//                   className="border shadow rounded-lg p-4 hover:border-orange-500/85 transition-colors"
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-medium">{option.type}</h3>
//                     <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
//                       {option.time}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-3">{option.price}</p>

//                   <ul className="space-y-2 text-sm">
//                     {option.features.map((feature, j) => (
//                       <li key={j} className="flex items-start gap-2">
//                         <Check
//                           className="text-green-500 mt-0.5 flex-shrink-0"
//                           size={14}
//                         />
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   {option.available && (
//                     <div className="mt-3 pt-3 border-t text-xs">
//                       <p className="font-medium">Available within:</p>
//                       <p>{option.available.join(", ")} etc...</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className=" hidden sm:block border rounded-xl px-4 sm:px-6 py-6 mb-8 bg-blue-50 border-blue-100">
//             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
//               <Shield className="text-blue-700" /> Our Delivery Promises
//             </h2>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="font-medium mb-3 text-blue-700">
//                   On-Time Delivery
//                 </h3>
//                 <p className="text-sm text-blue-600">
//                   We guarantee your order will arrive by the estimated date or
//                   we&apos;ll refund your shipping costs.
//                 </p>
//               </div>
//               <div>
//                 <h3 className="font-medium mb-3 text-blue-700">
//                   Package Protection
//                 </h3>
//                 <p className="text-sm text-blue-600">
//                   All shipments are insured against loss or damage during
//                   transit.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="border rounded-xl px-4 sm:px-6 py-6">
//             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//               <HelpCircle className="text-blue-500" /> Tracking Your Package
//             </h2>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="font-medium mb-3">Where to Find Tracking</h3>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li className="flex items-start gap-2">
//                     <Mail
//                       className="text-primary mt-0.5 flex-shrink-0"
//                       size={16}
//                     />
//                     <span>In your shipping confirmation email</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <Package
//                       className="text-primary mt-0.5 flex-shrink-0"
//                       size={16}
//                     />
//                     <span>Under &apos;My Orders&apos; in your account</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <Truck
//                       className="text-primary mt-0.5 flex-shrink-0"
//                       size={16}
//                     />
//                     <span>Directly on the carrier&apos;s website</span>
//                   </li>
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-medium mb-3">Tracking Not Working?</h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   It may take 24-48 hours for tracking information to appear
//                   after shipment.
//                 </p>
//                 <Button variant="outline" className="w-full bg-gray-200">
//                   Contact Support
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className=" w-full sm:w-72 space-y-6 sticky top-6">
//           <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
//             <h3 className="font-semibold mb-3">Need Help Now?</h3>
//             <Button className="w-full bg-orange-500/90 hover:bg-orange-600/90 mb-2 flex items-center gap-2">
//               <Phone size={16} /> Call Support
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full flex items-center gap-2"
//             >
//               <Mail size={16} /> Email Us
//             </Button>
//             <p className="text-xs text-gray-500 mt-3">
//               Mon-Fri: 8AM-8PM EST
//               <br />
//               Sat-Sun: 9AM-5PM EST
//             </p>
//           </div>

//           <div className="border rounded-xl p-5 px-4 sm:px-5 py-5">
//             <h3 className="font-semibold mb-3">Delivery FAQs</h3>
//             <ul className="space-y-3 text-sm">
//               <li>
//                 <Link href="#" className="text-primary hover:underline">
//                   Can I change my delivery address?
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-primary hover:underline">
//                   What if I&apos;m not home for delivery?
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-primary hover:underline">
//                   Do you deliver to PO boxes?
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-primary hover:underline">
//                   How are fragile items packaged?
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className="border rounded-xl p-5 bg-green-50 border-green-100">
//             <h3 className="font-semibold mb-3 text-green-800">
//               Eco-Friendly Delivery
//             </h3>
//             <p className="text-sm text-green-600">
//               We offset 100% of our delivery carbon emissions and use recyclable
//               packaging materials.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  Zap,
  ChevronDown,
  ChevronUp,
  Calendar,
  CreditCard,
  RefreshCw,
  Globe,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DeliveryInformationPage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const DELIVERY_OPTIONS = [
    {
      type: "Standard Delivery",
      time: "2-4 business days",
      price: "Free on orders over KES 7,000",
      features: [
        "Trackable",
        "Signature not required",
        "Evening deliveries available",
      ],
      available: ["Nairobi", "Kiambu", "Nakuru", "Mombasa"],
      icon: <Truck className="text-blue-500" size={20} />,
    },
    {
      type: "Express Delivery",
      time: "1-2 business days",
      price: "KES 500",
      features: [
        "Priority processing",
        "Live tracking",
        "Delivery time windows",
      ],
      icon: <Zap className="text-orange-500" size={20} />,
    },
    {
      type: "Same-Day Delivery",
      time: "Within 4 hours",
      price: "KES 800",
      features: [
        "Available in select areas",
        "Order by 2PM local time",
        "Real-time courier tracking",
      ],
      available: ["Nairobi CBD", "Westlands", "Karen", "Runda"],
      icon: <Clock className="text-red-500" size={20} />,
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
      icon: <Globe className="text-purple-500" size={20} />,
    },
  ];

  const PROCESS_STEPS = [
    {
      title: "Order Confirmation",
      description: "Immediate email with order details",
      icon: <Check className="text-green-500" size={18} />,
    },
    {
      title: "Processing",
      description: "1-2 business days for order preparation",
      icon: <RefreshCw className="text-blue-500" size={18} />,
    },
    {
      title: "Shipping",
      description: "Dispatched with tracking information",
      icon: <Truck className="text-orange-500" size={18} />,
    },
    {
      title: "Out for Delivery",
      description: "On its way to your location",
      icon: <MapPin className="text-red-500" size={18} />,
    },
    {
      title: "Delivered",
      description: "Package arrives at your doorstep",
      icon: <Package className="text-green-600" size={18} />,
    },
    {
      title: "Reviews",
      description: "Write the product reviews or our services",
      icon: <Package className="text-green-600" size={18} />,
    },
  ];

  return (
    <div className=" bg-[#f4f4f4f4] w-full">
      <div className="sm:max-w-7xl w-full mx-auto px-2 sm:px-6 py-6 ">
        <div className="mb-4 sm:mb-6">
          <Link
            href="/supports"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft size={16} /> Back to Help Center
          </Link>
        </div>

        <div className="sm:hidden mb-6">
          <div className="bg-blue-600 text-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Truck size={20} className="flex-shrink-0" />
              <h1 className="text-xl font-bold">Fast Delivery</h1>
            </div>
            <p className="text-sm mb-3">
              Fast, reliable shipping options across Kenya with real-time
              tracking and premium delivery services
            </p>

            <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
                <Zap size={12} />
                Same-day
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
                <Clock size={12} />
                Next-day
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
                <Check size={12} />
                Tracked
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
                <Truck size={12} />
                Express
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden sm:block bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
                <Truck size={28} className="text-blue-200" />
                Delivery Information
              </h1>
              <p className="text-blue-100 max-w-2xl">
                Fast, reliable shipping options across Kenya with real-time
                tracking and premium delivery services for your convenience.
              </p>
            </div>
            <Button
              variant="secondary"
              className="hidden md:flex items-center gap-2"
            >
              <MapPin size={16} /> Check Delivery Areas
            </Button>
          </div>
        </div>

        <div className="md:hidden mb-6 space-y-3">
          <div className="bg-white border rounded-lg shadow-sm px-3 sm:px-4 py-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Truck size={18} className="text-blue-500" />
              Delivery Options
            </h3>
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 no-scrollbar">
              {DELIVERY_OPTIONS.map((option, i) => (
                <button
                  key={i}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap flex items-center gap-1 border ${
                    expandedSection === option.type
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-200 text-gray-700"
                  }`}
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === option.type ? null : option.type
                    )
                  }
                >
                  {option.icon}
                  <span>{option.type.split(" ")[0]}</span>
                  {expandedSection === option.type ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              ))}
            </div>

            {expandedSection && (
              <div className="mt-3 pt-3 border-t">
                {DELIVERY_OPTIONS.filter(
                  (option) => option.type === expandedSection
                ).map((option, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium mb-1">
                      {option.time} • {option.price}
                    </p>
                    <ul className="space-y-1 text-sm text-gray-600">
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
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Available in: {option.available.join(", ")}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="px-3 sm:px-5 py-4 sm:py-5  border-b">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <Package className="text-blue-500" size={24} />
                  Order Delivery Process
                </h2>
              </div>

              <div className="px-3 sm:px-5 py-4 sm:py-5">
                <div className="relative">
                  <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200" />
                  <div className="space-y-2">
                    {PROCESS_STEPS.map((step, i) => (
                      <div key={i} className="relative flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 border border-blue-100">
                            {step.icon}
                          </div>
                        </div>
                        <div className="pb-8">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="px-3 sm:px-5 py-4 sm:py-5 border-b">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <Truck className="text-green-500" size={24} />
                  Available Delivery Options
                </h2>
              </div>

              <div className="px-3 sm:px-5 py-4 sm:py-5">
                <div className="grid md:grid-cols-2 gap-4">
                  {DELIVERY_OPTIONS.map((option, i) => (
                    <div
                      key={i}
                      className="border shadow-md rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-blue-50 p-2 rounded-full">
                          {option.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{option.type}</h3>
                          <p className="text-sm text-gray-500">{option.time}</p>
                        </div>
                      </div>

                      <p className="text-sm font-medium text-gray-700 mb-3">
                        {option.price}
                      </p>

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
                          <p className="font-medium text-gray-500">
                            Available in:
                          </p>
                          <p className="text-gray-600">
                            {option.available.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card className=" border border-blue-100 rounded-xl px-3 sm:px-5 py-4 sm:py-5 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-blue-800">
                <ShieldCheck className="text-blue-700" size={24} />
                Our Delivery Guarantees
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 shadow p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium mb-2 text-blue-700 flex items-center gap-2">
                    <Clock className="text-blue-500" size={18} />
                    On-Time Delivery
                  </h3>
                  <p className="text-sm text-blue-600">
                    We guarantee your order will arrive by the estimated date or
                    we&apos;ll refund your shipping costs.
                  </p>
                </div>
                <div className="bg-blue-50 shadow p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium mb-2 text-blue-700 flex items-center gap-2">
                    <Shield className="text-blue-500" size={18} />
                    Package Protection
                  </h3>
                  <p className="text-sm text-blue-600">
                    All shipments are insured against loss or damage during
                    transit up to KES 50,000.
                  </p>
                </div>
                <div className="bg-blue-50 shadow p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium mb-2 text-blue-700 flex items-center gap-2">
                    <RefreshCw className="text-blue-500" size={18} />
                    Hassle-Free Returns
                  </h3>
                  <p className="text-sm text-blue-600">
                    Easy 14-day return policy with prepaid return labels for
                    eligible items.
                  </p>
                </div>
                <div className="bg-blue-50 shadow p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium mb-2 text-blue-700 flex items-center gap-2">
                    <Leaf className="text-blue-500" size={18} />
                    Eco-Friendly Shipping
                  </h3>
                  <p className="text-sm text-blue-600">
                    We offset 100% of carbon emissions from our deliveries.
                  </p>
                </div>
              </div>
            </Card>

            <Card className=" border rounded-xl shadow-sm overflow-hidden">
              <div className="px-3 sm:px-5 py-4 sm:py-5 border-b">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <HelpCircle className="text-blue-500" size={24} />
                  Tracking Your Package
                </h2>
              </div>

              <div className="px-3 sm:px-5 py-4 sm:py-5">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Where to Find Tracking</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded-full">
                          <Mail className="text-blue-500" size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            Shipping Confirmation
                          </p>
                          <p className="text-sm text-gray-600">
                            Sent to your email within 24 hours
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded-full">
                          <CreditCard className="text-blue-500" size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Your Account</p>
                          <p className="text-sm text-gray-600">
                            Under &apos;Order History&apos;
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded-full">
                          <Truck className="text-blue-500" size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Carrier Website</p>
                          <p className="text-sm text-gray-600">
                            Using your tracking number
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">
                      Need Help With Tracking?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Tracking information may take 24-48 hours to update after
                      shipment. If you&apos;re having issues, our support team
                      can help.
                    </p>
                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                        <Phone size={16} /> Call Support
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2"
                      >
                        <Mail size={16} /> Email Support
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Delivery Calculator */}
            <div className="bg-white border rounded-xl shadow-sm px-4 sm:px-5 py-4 sm:py-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="text-blue-500" size={18} />
                Delivery Estimate
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-slate-50 focus:ring-blue-300">
                      <SelectValue>
                        <span>Select location</span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="monbasa">Mombasa</SelectItem>
                        <SelectItem value="nakuru">Nakuru</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Option
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-slate-50 focus:ring-blue-300">
                      <SelectValue>
                        <span>Select delivery option</span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="standard">
                          Standard Delivery
                        </SelectItem>
                        <SelectItem value="express">
                          Express Delivery
                        </SelectItem>
                        <SelectItem value="same-day">
                          Same-Day Delivery
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Calculate Delivery Time
                </Button>
              </div>
            </div>

            <Card className=" border border-blue-100 rounded-xl px-4 sm:px-5 py-4 sm:py-5">
              <h3 className="font-semibold mb-3 text-blue-800">
                Delivery Support
              </h3>
              <p className="text-sm text-blue-600 mb-4">
                Have questions about your delivery? Our team is here to help.
              </p>
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                  <Phone size={16} /> +254 700 123 456
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-slate-50 flex items-center gap-2 border-blue-200"
                >
                  <Mail size={16} /> delivery@example.com
                </Button>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-blue-500">
                  <span className="font-medium">Hours:</span> Mon-Fri: 8AM-8PM •
                  Sat-Sun: 9AM-5PM
                </p>
              </div>
            </Card>

            <div className="bg-white border rounded-xl shadow-sm px-4 sm:px-5 py-4 sm:py-5">
              <h3 className="font-semibold mb-3">Delivery FAQs</h3>
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question:
                      "Can I change my delivery address after ordering?",
                    answer:
                      "Yes, you can change your delivery address within 1 hour of placing your order by contacting our support team.",
                  },
                  {
                    question: "What if I'm not available during delivery?",
                    answer:
                      "Our courier will attempt delivery twice. After that, your package will be held at the nearest pickup location for 3 days.",
                  },
                  {
                    question: "Do you deliver to PO boxes?",
                    answer:
                      "Yes, we deliver to PO boxes for standard delivery options. Express and same-day delivery require physical addresses.",
                  },
                  {
                    question: "How are fragile items packaged?",
                    answer:
                      "Fragile items are specially packaged with bubble wrap and sturdy boxes marked with 'Fragile' labels for careful handling.",
                  },
                ].map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="py-2 hover:no-underline text-sm font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 text-sm text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Link
                href="/supports/faq"
                className="text-sm text-blue-600 hover:underline mt-3 inline-block"
              >
                View all delivery FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInformationPage;
