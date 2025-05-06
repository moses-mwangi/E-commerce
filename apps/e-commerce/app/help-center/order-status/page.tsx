// // app/help/order-status/page.tsx
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default function OrderStatusHelp() {
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <Link
//         href="/help"
//         className="flex items-center gap-2 text-sm text-primary mb-6"
//       >
//         <ArrowLeft size={16} /> Back to Help Center
//       </Link>

//       <h1 className="text-2xl font-bold mb-4">Order Status</h1>

//       <div className="space-y-6">
//         <section>
//           <h2 className="text-lg font-semibold mb-2">
//             How to Check Your Order Status
//           </h2>
//           <p className="text-gray-600">
//             You can track your order by logging into your account and visiting
//             the &quot;My Orders&quot; section. We&apos;ll also send you email
//             updates at every stage of the process.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-lg font-semibold mb-2">
//             Typical Processing Times
//           </h2>
//           <ul className="list-disc pl-5 space-y-1 text-gray-600">
//             <li>Standard shipping: 3-5 business days</li>
//             <li>Express shipping: 1-2 business days</li>
//             <li>International: 7-14 business days</li>
//           </ul>
//         </section>

//         <section>
//           <h2 className="text-lg font-semibold mb-2">
//             Still Can&apos;t Find Your Order?
//           </h2>
//           <p className="text-gray-600">
//             Contact our{" "}
//             <Link href="/help" className="text-primary underline">
//               customer service team
//             </Link>
//             with your order number ready.
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// }

// app/help/order-status/page.tsx
// import {
//   ArrowLeft,
//   Package,
//   Truck,
//   Clock,
//   MapPin,
//   AlertCircle,
//   Search,
// } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";

// export default function OrderStatusHelp() {
//   // Mock order status - in a real app this would come from API
//   const orderStatus = {
//     current: "Shipped",
//     steps: [
//       { status: "Processed", completed: true, date: "May 1" },
//       { status: "Shipped", completed: true, date: "May 3" },
//       { status: "In Transit", completed: false, date: "May 5 (est.)" },
//       { status: "Delivered", completed: false, date: "May 7 (est.)" },
//     ],
//     trackingNumber: "UPS-123456789",
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <Link
//         href="/help"
//         className="flex items-center gap-2 text-sm text-primary mb-6 hover:underline"
//       >
//         <ArrowLeft size={16} /> Back to Help Center
//       </Link>

//       <div className="flex items-start gap-8">
//         {/* Main Content */}
//         <div className="flex-1">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-primary/10 p-2 rounded-full">
//               <Package className="text-primary" size={24} />
//             </div>
//             <h1 className="text-3xl font-bold">Order Status & Tracking</h1>
//           </div>

//           {/* Order Lookup */}
//           <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
//             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//               <Search className="text-primary" /> Track Your Order
//             </h2>
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="md:col-span-2">
//                 <Input placeholder="Enter your order number (e.g. ORD-123456)" />
//                 <p className="text-xs text-gray-500 mt-2">
//                   Find your order number in your confirmation email
//                 </p>
//               </div>
//               <Button className="w-full md:w-auto">Track Order</Button>
//             </div>
//           </div>

//           {/* Order Status Example */}
//           <div className="border rounded-xl overflow-hidden mb-8">
//             <div className="bg-primary/5 p-4 border-b flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Package className="text-primary" size={20} />
//                 <div>
//                   <h3 className="font-medium">Order #ORD-789456</h3>
//                   <p className="text-sm text-gray-600">
//                     Placed on April 30, 2024
//                   </p>
//                 </div>
//               </div>
//               <Badge variant="secondary">{orderStatus.current}</Badge>
//             </div>

//             <div className="p-6">
//               {/* Progress Stepper */}
//               <div className="relative mb-8">
//                 <div className="absolute left-4 h-full w-px bg-gray-200 top-0 -z-10" />
//                 <div className="space-y-8">
//                   {orderStatus.steps.map((step, index) => (
//                     <div key={index} className="flex gap-4">
//                       <div
//                         className={`flex-shrink-0 w-8 h-8 rounded-full ${
//                           step.completed
//                             ? "bg-primary text-white"
//                             : "bg-gray-100"
//                         } flex items-center justify-center`}
//                       >
//                         {step.completed ? (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <polyline points="20 6 9 17 4 12"></polyline>
//                           </svg>
//                         ) : (
//                           <span className="text-sm">{index + 1}</span>
//                         )}
//                       </div>
//                       <div>
//                         <h3 className="font-medium">{step.status}</h3>
//                         <p className="text-gray-600 text-sm mt-1">
//                           {step.date}
//                         </p>
//                         {step.status === "Shipped" && (
//                           <div className="mt-2 text-sm bg-blue-50 text-blue-700 p-2 rounded inline-block">
//                             <span className="font-medium">Tracking #:</span>{" "}
//                             {orderStatus.trackingNumber}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Carrier Information */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="border rounded-lg p-4">
//                   <h3 className="font-medium mb-3 flex items-center gap-2">
//                     <Truck className="text-primary" size={18} /> Shipping
//                     Carrier
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <div className="bg-gray-100 p-2 rounded">
//                       <Truck className="text-gray-600" size={20} />
//                     </div>
//                     <div>
//                       <p className="font-medium">UPS Ground</p>
//                       <p className="text-sm text-gray-600">
//                         Estimated delivery: May 7, 2024
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="border rounded-lg p-4">
//                   <h3 className="font-medium mb-3 flex items-center gap-2">
//                     <MapPin className="text-primary" size={18} /> Shipping To
//                   </h3>
//                   <p className="text-gray-600">
//                     123 Main St, Apt 4B
//                     <br />
//                     New York, NY 10001
//                     <br />
//                     United States
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Shipping Information */}
//           <div className="space-y-6">
//             <section>
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <Clock className="text-primary" /> Shipping Times
//               </h2>
//               <div className="grid md:grid-cols-3 gap-4">
//                 {[
//                   {
//                     type: "Standard",
//                     time: "3-5 business days",
//                     price: "Free",
//                   },
//                   {
//                     type: "Express",
//                     time: "1-2 business days",
//                     price: "$9.99",
//                   },
//                   {
//                     type: "International",
//                     time: "7-14 business days",
//                     price: "Varies",
//                   },
//                 ].map((option, i) => (
//                   <div
//                     key={i}
//                     className="border rounded-lg p-4 hover:border-primary transition-colors"
//                   >
//                     <h3 className="font-medium">{option.type}</h3>
//                     <p className="text-sm text-gray-600 mt-1">{option.time}</p>
//                     <p className="text-sm mt-2">
//                       <span className="font-medium">Price:</span> {option.price}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Common Questions */}
//             <section>
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <AlertCircle className="text-yellow-500" /> Common Questions
//               </h2>
//               <div className="border rounded-lg overflow-hidden">
//                 <table className="w-full text-sm">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="text-left p-3 font-medium">Question</th>
//                       <th className="text-left p-3 font-medium">Answer</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[
//                       {
//                         question: "My tracking hasn't updated",
//                         answer:
//                           "Carriers may take 24-48 hours to scan packages",
//                       },
//                       {
//                         question: "Delivery date passed",
//                         answer: "Check tracking for updates or contact carrier",
//                       },
//                       {
//                         question: "Wrong tracking number",
//                         answer:
//                           "Contact us immediately with your order details",
//                       },
//                     ].map((row, i) => (
//                       <tr key={i} className="border-t hover:bg-gray-50">
//                         <td className="p-3 font-medium">{row.question}</td>
//                         <td className="p-3 text-gray-600">{row.answer}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           </div>
//         </div>

//         {/* Quick Help Sidebar */}
//         <div className="hidden md:block w-72 space-y-6 sticky top-6">
//           <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
//             <h3 className="font-semibold mb-3">Need Immediate Help?</h3>
//             <Button className="w-full mb-2">Live Chat</Button>
//             <Button variant="outline" className="w-full">
//               Call Support
//             </Button>
//             <p className="text-xs text-gray-500 mt-3">Mon-Fri, 9AM-6PM EST</p>
//           </div>
//           <div className="border rounded-xl p-5">
//             <h3 className="font-semibold mb-3">Quick Links</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="#"
//                   className="text-primary hover:underline flex items-center gap-2"
//                 >
//                   <Package size={14} /> View All Orders
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-primary hover:underline flex items-center gap-2"
//                 >
//                   <Truck size={14} /> Shipping Policies
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-primary hover:underline flex items-center gap-2"
//                 >
//                   <AlertCircle size={14} /> Delivery Problems
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/help/order-status/page.tsx
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
    <div className="p-6 max-w-6xl mx-auto">
      <Link
        href="/help"
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
