import LoadingState from "@/app/components/loaders/LoadingState";
import { FileText, HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function HelpCenter() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isLoading === true && <LoadingState />}
      <div className="p-6 grid grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            <HelpCircle size={20} /> Help Center
          </h3>
          <div className="space-y-3">
            {[
              { title: "Order Status", path: "/help-center/order-status" },
              {
                title: "Returns & Refunds",
                path: "/help-center/returns-refunds",
              },
              {
                title: "Payment Methods",
                path: "/help-center/payment-methods",
              },
              { title: "Account Issues", path: "/help-center/account-issues" },
              {
                title: "Product Questions",
                path: "/help-center/product-questions",
              },
            ].map((topic, i) => (
              <Link
                key={i}
                href={topic.path}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setIsLoading(true)}
              >
                <FileText size={16} className="text-gray-500" />
                <p>{topic.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone size={18} className="text-primary" />
              <div>
                <p className="font-medium">24/7 Customer Service</p>
                <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail size={18} className="text-primary" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-gray-600">help@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MessageSquare size={18} className="text-primary" />
              <div>
                <p className="font-medium">Live Chat</p>
                <p className="text-sm text-gray-600">Available 9AM-9PM EST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary">FAQs</h3>
          <div className="space-y-3">
            {[
              "How do I return an item?",
              "When will my order ship?",
              "How do I apply a promo code?",
              "What payment methods do you accept?",
            ].map((question, i) => (
              <div key={i} className="border-b pb-3">
                <p className="font-medium text-sm">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
