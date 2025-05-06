// // app/help/returns-refunds/page.tsx
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default function ReturnsRefundsHelp() {
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <Link
//         href="/help"
//         className="flex items-center gap-2 text-sm text-primary mb-6"
//       >
//         <ArrowLeft size={16} /> Back to Help Center
//       </Link>

//       <h1 className="text-2xl font-bold mb-4">Returns & Refunds</h1>

//       <div className="space-y-6">
//         <section>
//           <h2 className="text-lg font-semibold mb-2">Our Return Policy</h2>
//           <p className="text-gray-600">
//             You may return most items within 30 days of delivery for a full
//             refund. Items must be unused and in their original packaging.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-lg font-semibold mb-2">
//             How to Initiate a Return
//           </h2>
//           <ol className="list-decimal pl-5 space-y-2 text-gray-600">
//             <li>Go to &quot;My Orders&quot; in your account</li>
//             <li>Select the item(s) you want to return</li>
//             <li>Print the prepaid return label</li>
//             <li>Ship the package back to us</li>
//           </ol>
//         </section>

//         <section>
//           <h2 className="text-lg font-semibold mb-2">Refund Timeline</h2>
//           <p className="text-gray-600">
//             Refunds are processed within 3-5 business days after we receive your
//             return. It may take additional time for your bank to post the
//             credit.
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// }
// app/help/returns-refunds/page.tsx
import {
  ArrowLeft,
  Package,
  RefreshCw,
  CreditCard,
  Truck,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function ReturnsRefundsHelp() {
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
              <RefreshCw className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold">Returns & Refunds</h1>
          </div>

          {/* Policy Highlights */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="border rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Package size={18} className="text-primary" />
                <h3 className="font-medium">30-Day Returns</h3>
              </div>
              <p className="text-sm text-gray-600">
                Most items can be returned within 30 days of delivery
              </p>
            </div>
            <div className="border rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard size={18} className="text-primary" />
                <h3 className="font-medium">Full Refunds</h3>
              </div>
              <p className="text-sm text-gray-600">
                Original payment method refunded upon return approval
              </p>
            </div>
            <div className="border rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={18} className="text-primary" />
                <h3 className="font-medium">Free Returns</h3>
              </div>
              <p className="text-sm text-gray-600">
                Prepaid return label included for most items
              </p>
            </div>
          </div>

          {/* Return Process */}
          <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <RefreshCw className="text-primary" /> How to Return an Item
            </h2>

            <div className="relative">
              {/* Progress Stepper */}
              <div className="absolute left-4 h-full w-px bg-gray-200 top-0 -z-10" />
              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: "Start Your Return",
                    description:
                      "Go to 'My Orders' and select the item(s) you want to return",
                    icon: <Package className="text-primary" size={18} />,
                  },
                  {
                    step: 2,
                    title: "Print Return Label",
                    description:
                      "Download and print the prepaid shipping label",
                    icon: <CreditCard className="text-primary" size={18} />,
                  },
                  {
                    step: 3,
                    title: "Package Your Item",
                    description:
                      "Include all original packaging and accessories",
                    icon: <Package className="text-primary" size={18} />,
                  },
                  {
                    step: 4,
                    title: "Ship It Back",
                    description:
                      "Drop off at any carrier location or schedule a pickup",
                    icon: <Truck className="text-primary" size={18} />,
                  },
                ].map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full md:w-auto">Start Return Process</Button>
            </div>
          </div>

          {/* Refund Information */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="text-primary" /> Refund Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-5">
                  <h3 className="font-medium mb-3">Refund Timeline</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Return Received</span>
                        <span>Processing</span>
                        <span>Refund Issued</span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Refunds are typically processed within 3-5 business days
                      after we receive your return. Bank processing may take
                      additional 2-5 business days.
                    </p>
                  </div>
                </div>
                <div className="border rounded-lg p-5">
                  <h3 className="font-medium mb-3">Refund Methods</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CreditCard size={16} className="text-gray-500" />
                      <span className="text-sm">Original payment method</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CreditCard size={16} className="text-gray-500" />
                      <span className="text-sm">
                        Store credit (faster processing)
                      </span>
                      <Badge variant="outline" className="ml-2">
                        +5% bonus
                      </Badge>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Exceptions */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="text-yellow-500" /> Return Exceptions
              </h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium">Item Type</th>
                      <th className="text-left p-3 font-medium">Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        item: "Final Sale Items",
                        policy: "Not eligible for return",
                      },
                      { item: "Personalized/Custom", policy: "Non-refundable" },
                      { item: "Opened Software", policy: "Non-refundable" },
                      { item: "Swimwear (with tags)", policy: "30-day return" },
                    ].map((row, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        <td className="p-3">{row.item}</td>
                        <td className="p-3">{row.policy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        {/* Quick Help Sidebar */}
        <div className="hidden md:block w-72 space-y-6 sticky top-6">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Need Help With Your Return?</h3>
            <Button className="w-full mb-2">Live Chat</Button>
            <Button variant="outline" className="w-full">
              Email Support
            </Button>
            <p className="text-xs text-gray-500 mt-3">Mon-Fri, 9AM-6PM EST</p>
          </div>
          <div className="border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <Package size={14} /> Print Return Label
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <CreditCard size={14} /> Check Refund Status
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <Truck size={14} /> Track Return Shipment
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
