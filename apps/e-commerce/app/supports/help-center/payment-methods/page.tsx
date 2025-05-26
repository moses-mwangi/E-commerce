// // app/help/payment-methods/page.tsx
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { CreditCard, Banknote, Bitcoin } from "lucide-react";

// export default function PaymentMethodsHelp() {
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <Link
//         href="/help"
//         className="flex items-center gap-2 text-sm text-primary mb-6"
//       >
//         <ArrowLeft size={16} /> Back to Help Center
//       </Link>

//       <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>

//       <div className="space-y-6">
//         <section className="flex items-start gap-4">
//           <CreditCard className="text-primary mt-1 flex-shrink-0" />
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Credit/Debit Cards</h2>
//             <p className="text-gray-600">
//               We accept Visa, Mastercard, American Express, and Discover. All
//               transactions are securely processed with 256-bit encryption.
//             </p>
//           </div>
//         </section>

//         <section className="flex items-start gap-4">
//           <Banknote className="text-primary mt-1 flex-shrink-0" />
//           <div>
//             <h2 className="text-lg font-semibold mb-2">PayPal</h2>
//             <p className="text-gray-600">
//               Check out faster using your PayPal account. You don&apos;t need to
//               enter your payment details each time you shop.
//             </p>
//           </div>
//         </section>

//         <section className="flex items-start gap-4">
//           <Bitcoin className="text-primary mt-1 flex-shrink-0" />
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Cryptocurrency</h2>
//             <p className="text-gray-600">
//               We accept Bitcoin, Ethereum, and other major cryptocurrencies
//               through our secure payment processor.
//             </p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
// app/help/payment-methods/page.tsx
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Bitcoin,
  Banknote,
  Shield,
  AlertCircle,
  ChevronDown,
  Check,
  MessageSquare,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

export default function PaymentMethodsHelp() {
  const paymentMethods = [
    {
      icon: <CreditCard size={20} className="text-primary" />,
      title: "Credit/Debit Cards",
      description: "Secure payments with 256-bit encryption",
      types: ["Visa", "Mastercard", "American Express", "Discover", "JCB"],
      security: "PCI-DSS compliant",
      popular: true,
    },
    {
      icon: <Wallet size={20} className="text-primary" />,
      title: "Digital Wallets",
      description: "Fast checkout without entering details",
      types: ["PayPal", "Apple Pay", "Google Pay", "Samsung Pay"],
      security: "Tokenized transactions",
      popular: true,
    },
    {
      icon: <Bitcoin size={20} className="text-primary" />,
      title: "Cryptocurrency",
      description: "Decentralized payment options",
      types: ["Bitcoin", "Ethereum", "Litecoin", "USDC"],
      security: "Blockchain secured",
      popular: false,
    },
    {
      icon: <Banknote size={20} className="text-primary" />,
      title: "Bank Transfers",
      description: "Direct from your bank account",
      types: ["ACH (US)", "SEPA (EU)", "Direct Debit"],
      security: "Two-factor authentication",
      popular: false,
    },
  ];

  const commonIssues = [
    {
      question: "Why was my payment declined?",
      answer:
        "This could be due to insufficient funds, incorrect card details, or your bank's security filters. Try again or contact your bank.",
    },
    {
      question: "Is it safe to save my payment information?",
      answer:
        "Yes, we use tokenization to store payment details securely. Your full card numbers are never stored on our servers.",
    },
    {
      question: "When will my refund be processed?",
      answer:
        "Refunds typically take 3-5 business days for card payments and 1-2 business days for digital wallets.",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
              <CreditCard className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold">Payment Methods</h1>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {paymentMethods.map((method, i) => (
              <div
                key={i}
                className="border rounded-xl p-5 hover:shadow-sm transition-shadow hover:border-primary"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    {method.icon}
                  </div>
                  <div>
                    <h2 className="font-semibold flex items-center gap-2">
                      {method.title}
                      {method.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Most Popular
                        </Badge>
                      )}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {method.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Shield size={14} className="text-primary" />
                    <span>Accepted Types:</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {method.types.map((type, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="text-sm font-normal"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Check size={12} /> {method.security}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Security Information */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="text-primary" /> Payment Security
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  Encryption
                </h3>
                <p className="text-sm text-gray-600">
                  All transactions protected with 256-bit SSL encryption
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Fraud Protection
                </h3>
                <p className="text-sm text-gray-600">
                  Advanced fraud detection systems monitor all transactions
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  No Storage
                </h3>
                <p className="text-sm text-gray-600">
                  We never store your full payment details on our servers
                </p>
              </div>
            </div>
          </div>

          {/* Common Questions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="text-yellow-500" /> Payment Questions
            </h2>
            <div className="space-y-3">
              {commonIssues.map((issue, i) => (
                <Collapsible
                  key={i}
                  className="border rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger className="w-full p-4 hover:bg-gray-50 flex items-center justify-between">
                    <h3 className="font-medium text-left">{issue.question}</h3>
                    <ChevronDown className="text-gray-400 transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 pt-0 text-gray-600">
                    {issue.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Support CTA */}
          <div className="border rounded-xl p-6 bg-primary/5 border-primary/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-medium text-primary mb-1">
                  Still having payment issues?
                </h3>
                <p className="text-sm text-primary/80">
                  Our support team can help resolve any payment problems
                </p>
              </div>
              <Button>Contact Payment Support</Button>
            </div>
          </div>
        </div>

        {/* Quick Help Sidebar */}
        <div className="hidden md:block w-72 space-y-6 sticky top-6">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Payment Tips</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check
                  size={14}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <span>Always check for the lock icon in your browser</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={14}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <span>Update your billing address with your bank</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={14}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <span>Try a different payment method if one fails</span>
              </li>
            </ul>
          </div>
          <div className="border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Need Immediate Help?</h3>
            <Button variant="outline" className="w-full mb-2">
              <Phone size={16} className="mr-2" /> Call Support
            </Button>
            <Button className="w-full">
              <MessageSquare size={16} className="mr-2" /> Live Chat
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              Available 24/7 for payment issues
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
