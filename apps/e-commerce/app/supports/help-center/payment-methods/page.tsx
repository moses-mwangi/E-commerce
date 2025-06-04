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
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { GrShieldSecurity } from "react-icons/gr";
import { MdSecurity } from "react-icons/md";

export default function PaymentMethodsHelp() {
  const paymentMethods = [
    {
      icon: <CreditCard size={20} className="text-blue-500" />, // Blue = trust/security (cards)
      title: "Credit/Debit Cards",
      description: "Secure payments with 256-bit encryption",
      types: ["Visa", "Mastercard", "Verve"],
      security: "PCI-DSS compliant",
      popular: true,
    },
    {
      icon: <Smartphone size={20} className="text-teal-500" />,
      title: "MPESA",
      description: "Mobile money payments via Safaricom",
      types: ["Pay via MPESA"],
      security: "SIM-linked authentication",
      popular: true,
    },
    {
      icon: <Banknote size={20} className="text-green-600" />,
      title: "Bank Transfers",
      description: "Direct from your bank account",
      types: ["ACH (US)", "SEPA (EU)", "Direct Debit"],
      security: "Two-factor authentication",
      popular: false,
    },
    // {
    //   icon: <Wallet size={20} className="text-purple-500" />,
    //   title: "Digital Wallets",
    //   description: "Fast checkout without entering details",
    //   types: ["PayPal", "Apple Pay", "Google Pay", "Samsung Pay"],
    //   security: "Tokenized transactions",
    //   popular: true,
    // },
    // {
    //   icon: <Bitcoin size={20} className="text-amber-500" />,
    //   title: "Cryptocurrency",
    //   description: "Decentralized payment options",
    //   types: ["Bitcoin", "Ethereum", "Litecoin", "USDC"],
    //   security: "Blockchain secured",
    //   popular: false,
    // },
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
    <div className="py-4 sm:py-6 px-2 sm:px-8 w-full mx-auto max-w-7xl">
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
              <CreditCard className="text-purple-500" size={24} />
            </div>
            <h1 className="text-3xl font-bold">Payment Methods</h1>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {paymentMethods.map((method, i) => (
              <div
                key={i}
                className="border rounded-xl p-5 hover:shadow-sm transition-shadow hover:border-orange-400"
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
                    <Shield size={14} className="" />
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
                  <Shield className=" w-4 h-4 text-green-500" />
                  Encryption
                </h3>
                <p className="text-sm text-gray-600">
                  All transactions protected with 256-bit SSL encryption
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <MdSecurity className=" w-4 h-4 text-blue-500" />
                  Fraud Protection
                </h3>
                <p className="text-sm text-gray-600">
                  Advanced fraud detection systems monitor all transactions
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <AlertCircle className=" w-4 h-4 text-yellow-500" />
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
