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
  Clock,
  ArrowRight,
  Truck,
  Globe,
  ShoppingBag,
  CheckCircle,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function HelpCenter() {
  const popularTopics = [
    {
      icon: <Package size={18} className="text-blue-500" />,
      title: "Track My Order",
      desc: "Check shipping status and delivery estimates",
      link: "/supports/help-center/order-status",
    },
    {
      icon: <RefreshCw size={18} className="text-green-500" />,
      title: "Start a Return",
      desc: "How to return or exchange an item",
      link: "/supports/help-center/returns-refunds",
    },
    {
      icon: <CreditCard size={18} className="text-purple-500" />,
      title: "Payment Issues",
      desc: "Declined payments and refund questions",
      link: "/supports/help-center/payment-methods",
    },
    {
      icon: <User size={18} className="text-orange-500" />,
      title: "Account Help",
      desc: "Password reset and login problems",
      link: "/supports/help-center/account-issues",
    },
  ];

  const helpCategories = [
    {
      title: "Orders & Shipping",
      topics: [
        { name: "Order status", icon: <Clock size={16} /> },
        { name: "Change/cancel order", icon: <RefreshCw size={16} /> },
        { name: "Shipping options", icon: <Truck size={16} /> },
        { name: "International delivery", icon: <Globe size={16} /> },
      ],
      icon: <Package size={20} className="text-blue-500" />,
      link: "/supports/orders-shipping",
    },
    {
      title: "Returns & Refunds",
      topics: [
        { name: "Return policy", icon: <FileText size={16} /> },
        { name: "Start a return", icon: <ShoppingBag size={16} /> },
        { name: "Refund status", icon: <CreditCard size={16} /> },
        { name: "Exchanges", icon: <RefreshCw size={16} /> },
      ],
      icon: <RefreshCw size={20} className="text-green-500" />,
      link: "/supports/returns-refunds",
    },
    {
      title: "Account & Security",
      topics: [
        { name: "Password reset", icon: <Lock size={16} /> },
        { name: "Update account info", icon: <User size={16} /> },
        { name: "Two-factor auth", icon: <Shield size={16} /> },
        { name: "Privacy settings", icon: <CheckCircle size={16} /> },
      ],
      icon: <Shield size={20} className="text-blue-500" />,
      link: "/supports/account-security",
    },
  ];

  const faqs = [
    {
      question: "How do I change or cancel my order?",
      answer:
        "You can modify your order within 1 hour of placement from your account page. After that, please contact our support team immediately as we process orders quickly.",
      category: "orders",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards (Visa, Mastercard, American Express), M-Pesa, PayPal, and mobile money payments. All transactions are securely processed.",
      category: "payments",
    },
    {
      question: "How do I track my international order?",
      answer:
        "International orders come with full tracking. Use your tracking number on our website or the carrier's global tracking system. Duties and taxes are calculated at checkout.",
      category: "shipping",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer 30-day returns for most items. Items must be unused with original packaging. Some exclusions apply for hygiene products. Refunds process within 3-5 business days.",
      category: "returns",
    },
    {
      question: "How can I contact customer service?",
      answer:
        "We offer 24/7 support via live chat, phone (+254 700 123 456), and email (support@example.com). Average response time is under 15 minutes for chat and 2 hours for email.",
      category: "support",
    },
  ];

  return (
    <div className=" bg-[#f4f4f4f4] w-full">
      <div className=" px-2 sm:px-6 py-5 sm:py-7 w-full sm:max-w-7xl mx-auto">
        <div className=" hidden sm:block bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl px-5 sm:px-8 py-8 mb-8 sm:mb-12 text-center border">
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
              <Search className="absolute w-5 h-5 sm:w-5 sm:h-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Popular searches: returns, tracking, account login, payment
              methods
            </p>
          </div>
        </div>

        <div className="sm:hidden mb-6">
          <div className="bg-blue-600 text-white rounded-lg px-4 py-5 shadow-md">
            <div className="flex gap-3 items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                <HelpCircle className="text-amber-100" />
              </div>

              <h1 className="text-xl font-bold">How can we help you Today?</h1>
            </div>

            <p className="text-sm mb-3">
              Get a quick help from our popular topics
            </p>

            <div className="flex overflow-x-auto hide-scrollbar pb-2 gap-2 no-scrollbar">
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
                <RefreshCw size={12} />
                Returns
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
                <Clock size={12} />
                Tracking
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
                <CreditCard size={12} />
                Payments
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1">
                <User size={12} />
                Account-Issues
              </div>
            </div>
          </div>
        </div>

        <Card className="mb-8 sm:mb-12 ">
          <h2 className="text-xl font-semibold mb-6 border-b py-4 px-3 sm:py-6 sm:px-6 bg-slate-50/70">
            Popular Topics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-3 pb-4">
            {popularTopics.map((topic, i) => (
              <Link
                key={i}
                href={topic.link}
                className="border shadow-md bg-muted/15  rounded-xl p-5 hover:border-orange-500/85 hover:shadow-sm group transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    {topic.icon}
                  </div>
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
        </Card>

        <Card className="mb-8 sm:mb-12">
          <h2 className="text-xl font-semibold mb-6 border-b py-4 px-3 sm:py-6 sm:px-6 bg-slate-50/70">
            Browse Help Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-6 px-3 pb-4">
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
                          href={`${category.link}#${topic.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-blue-500">{topic.icon}</span>
                            <span>{topic.name}</span>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t">
                    <Link
                      href={category.link}
                      className="text-sm font-medium text-blue-600 hover:underline flex items-center justify-end"
                    >
                      View all {category.title.toLowerCase()}{" "}
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border rounded-2xl overflow-hidden shadow-lg">
          <div className="bg-slate-50 bg-opacity-70 py-4 px-3 sm:py-6 sm:px-6 border-b">
            <h2 className="text-xl font-semibold">Still need help?</h2>
            <p className="text-gray-600">Contact our customer support team</p>
          </div>
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x bg-muted/15 ">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="text-sky-500" size={20} />
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
              <Button className="h-7 sm:h-8 mt-4 w-full bg-orange-500/90 hover:bg-orange-600/90 transition-all duration-150">
                Call Now
              </Button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mail className="text-rose-500" size={20} />
                </div>
                <h3 className="font-semibold">Email Us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Get help within 24 hours
              </p>
              <p className="font-medium">moses.mwangi.me@gmail.com</p>
              <Button className="h-7 sm:h-8 mt-4 w-full bg-orange-500/90 hover:bg-orange-600/90 transition-all duration-150">
                Send Email
              </Button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="text-emerald-500" size={20} />
                </div>
                <h3 className="font-semibold">Live Chat</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Instant messaging with our team
              </p>
              <p className="font-medium">Available now</p>
              <Button className="h-7 sm:h-8 mt-4 w-full bg-orange-500/95 hover:bg-orange-600/95">
                Start Chat
              </Button>
            </div>
          </div>
        </Card>

        <section>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-5 sm:mt-8">
            <h2 className="text-xl font-semibold sm:text-2xl border-b-2  py-4 px-3 sm:py-6 sm:px-6 sm:font-bold text-gray-900 mb-6 bg-slate-50/70 ">
              Frequently Asked Questions
            </h2>
            <Accordion type="multiple" className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b last:border-b-0"
                >
                  <AccordionTrigger className="px-6 py-2 hover:no-underline text-left">
                    <h3 className="font-medium text-gray-900">
                      {faq.question}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                    {faq.category === "orders" && (
                      <Link
                        href="/supports/orders"
                        className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                      >
                        Learn more about order management
                      </Link>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="px-6 py-4 border-t text-center text-[15px]">
              <Link
                href="/supports/faqs"
                className="text-blue-600 hover:underline font-medium flex items-center justify-center"
              >
                View all FAQs <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>

        <Card className="mt-12 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold sm:text-2xl sm:font-bold text-gray-900 mb-4 px-4 py-3 sm:px-6 sm:py-7 bg-slate-50/70 rounded-t-xl border-b">
            Helpful Resources
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 px-4 sm:px-8 py-3 sm:py-6">
            <Link
              href="/supports/guides/shopping-guide"
              className="bg-white p-4 shadow-lg rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                Shopping Guide
              </h3>
              <p className="text-sm text-gray-600">
                How to shop on our platform
              </p>
            </Link>
            <Link
              href="/supports/guides/size-charts"
              className="bg-white p-4 shadow-lg rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <User size={18} className="text-green-500" />
                Size Charts
              </h3>
              <p className="text-sm text-gray-600">Find your perfect fit</p>
            </Link>
            <Link
              href="/supports/guides/product-care"
              className="bg-white p-4 shadow-lg rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <Shield size={18} className="text-purple-500" />
                Product Care
              </h3>
              <p className="text-sm text-gray-600">
                Maintaining your purchases
              </p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
