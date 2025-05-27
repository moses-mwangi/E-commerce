// app/help/page.tsx
import {
  HelpCircle,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Package,
  RefreshCw,
  CreditCard,
  User,
  Shield,
  ChevronRight,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HelpCenter() {
  const popularTopics = [
    {
      icon: <Package size={18} className="text-primary" />,
      title: "Track My Order",
      desc: "Check shipping status and delivery estimates",
      link: "/supports/help-center/order-status",
    },
    {
      icon: <RefreshCw size={18} className="text-primary" />,
      title: "Start a Return",
      desc: "How to return or exchange an item",
      link: "/supports/help-center/returns-refunds",
    },
    {
      icon: <CreditCard size={18} className="text-primary" />,
      title: "Payment Issues",
      desc: "Declined payments and refund questions",
      link: "/supports/help-center/payment-methods",
    },
    {
      icon: <User size={18} className="text-primary" />,
      title: "Account Help",
      desc: "Password reset and login problems",
      link: "/supports/help-center/account-issues",
    },
  ];

  const helpCategories = [
    {
      title: "Orders & Shipping",
      topics: [
        "Order status",
        "Change/cancel order",
        "Shipping options",
        "International delivery",
      ],
      icon: <Package size={20} className="text-primary" />,
    },
    {
      title: "Returns & Refunds",
      topics: ["Return policy", "Start a return", "Refund status", "Exchanges"],
      icon: <RefreshCw size={20} className="text-primary" />,
    },
    {
      title: "Account & Security",
      topics: [
        "Password reset",
        "Update account info",
        "Two-factor auth",
        "Privacy settings",
      ],
      icon: <Shield size={20} className="text-primary" />,
    },
  ];

  return (
    <div className="sm:p-6 p-2 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl p-8 mb-8 sm:mb-12 text-center border">
        <div className="max-w-3xl mx-auto">
          <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="text-green-600" size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            How can we help you today?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <Input
              placeholder="Search help articles..."
              className="pl-10 pr-4 py-[10px] sm:py-6 text-sm sm:text-base bg-white focus-visible:ring-orange-500"
            />
            <Search
              className="absolute w-5 h-5 sm:w-5 sm:h-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              // size={20}
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Popular searches: returns, tracking, account login, payment methods
          </p>
        </div>
      </div>

      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl font-semibold mb-6">Popular Topics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTopics.map((topic, i) => (
            <Link
              key={i}
              href={topic.link}
              className="border shadow-md bg-muted/15  rounded-xl p-5 hover:border-orange-500/85 hover:shadow-sm group transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">{topic.icon}</div>
                <div>
                  <h3 className="font-medium mb-1 group-hover:text-primary">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600">{topic.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Help Categories */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl font-semibold mb-6">Browse Help Categories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {helpCategories.map((category, i) => (
            <div
              key={i}
              className="border bg-muted/15  shadow-md rounded-xl overflow-hidden"
            >
              <div className="bg-gray-50 p-4 border-b flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {category.topics.map((topic, j) => (
                    <li key={j}>
                      <Link
                        href="#"
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <span>{topic}</span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-2xl overflow-hidden shadow-lg">
        <div className="bg-primary/5 p-6 border-b">
          <h2 className="text-xl font-semibold">Still need help?</h2>
          <p className="text-gray-600">Contact our customer support team</p>
        </div>
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x bg-muted/15 ">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Phone className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold">Phone Support</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Speak directly with our support agents
            </p>
            <div className="space-y-1">
              <p className="font-medium">Call Us: +254 725672675</p>
              <p className="text-sm text-gray-600">Mon-Fri, 5AM-9PM EST</p>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              Call Now
            </Button>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Mail className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold">Email Us</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Get help within 24 hours
            </p>
            <p className="font-medium">moses.mwangi.me@gmail.com</p>
            <Button variant="outline" className="mt-4 w-full">
              Send Email
            </Button>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageSquare className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold">Live Chat</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Instant messaging with our team
            </p>
            <p className="font-medium">Available now</p>
            <Button className="mt-4 w-full bg-orange-500/95 hover:bg-orange-600/95">
              Start Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "How do I change or cancel my order?",
              answer:
                "You can modify your order within 1 hour of placement from your account.",
            },
            {
              question: "What payment methods do you accept?",
              answer:
                "We accept all major credit cards, PayPal, and Apple Pay.",
            },
            {
              question: "How do I track my international order?",
              answer:
                "International orders can be tracked using the same tracking number through global carrier websites.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="border shadow-md bg-muted/15 rounded-lg p-5 hover:border-orange-500/80 transition-colors"
            >
              <h3 className="font-medium mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
