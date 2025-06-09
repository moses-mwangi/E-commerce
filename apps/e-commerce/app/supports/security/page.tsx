// import {
//   ShieldCheck,
//   Lock,
//   CreditCard,
//   Server,
//   Globe,
//   HelpCircle,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const SecurityPage = () => {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <div className="text-center mb-5 sm:mb-7 md:mb-12">
//         <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-3 md:mb-4">
//           Your Security is Our Priority
//         </h1>
//         <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
//           We use industry-standard encryption and fraud prevention to protect
//           your data.
//         </p>
//       </div>

//       <div className="flex sm:flex-wrap py-[2px] sm:justify-center gap-4 mb-5 sm:mb-7 md:mb-12 overflow-x-scroll hide-scrollbar">
//         {[
//           {
//             src: "/pci-dss-certified.png",
//             alt: "PCI DSS Compliant",
//             description: "All payments processed securely",
//           },
//           {
//             src: "/ssl-secure.png",
//             alt: "256-bit SSL Encryption",
//             description: "Data encrypted in transit",
//           },
//           {
//             src: "/gdpr-compliant.png",
//             alt: "GDPR Compliant",
//             description: "Strict data privacy standards",
//           },
//         ].map((badge) => (
//           <div
//             key={badge.alt}
//             className="bg-whiste shadow-md bg-muted/15 flex-shrink-0 p-4 rounded-lg  text-center max-w-xs"
//           >
//             <div className=" hidden sm:flex justify-center mb-2">
//               <Image
//                 src={badge.src}
//                 alt={badge.alt}
//                 width={70}
//                 height={70}
//                 className="h-16 w-auto"
//               />
//             </div>
//             <p className="font-medium">{badge.alt}</p>
//             <p className="text-sm text-gray-600 ">{badge.description}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-5 sm:mb-7 md:mb-12 ">
//         {[
//           {
//             icon: <ShieldCheck className="text-blue-600" size={24} />,
//             title: "Secure Payments",
//             description:
//               "We process all transactions via Paystack, a PCI-DSS certified. Your card details are never stored on our servers.",
//           },
//           {
//             icon: <Lock className="text-blue-600" size={24} />,
//             title: "Account Protection",
//             description:
//               "Two-factor authentication (2FA) available for all user accounts.",
//           },
//           {
//             icon: <CreditCard className="text-blue-600" size={24} />,
//             title: "Fraud Prevention",
//             description:
//               "Real-time transaction monitoring to detect and block suspicious activity.",
//           },
//           {
//             icon: <Server className="text-blue-600" size={24} />,
//             title: "Data Security",
//             description: "Regular security audits and encrypted databases.",
//           },
//           {
//             icon: <Globe className="text-blue-600" size={24} />,
//             title: "Privacy Compliance",
//             description:
//               "We adhere to GDPR, CCPA, and other regional data protection laws.",
//           },
//           {
//             icon: <HelpCircle className="text-blue-600" size={24} />,
//             title: "Transparent Policies",
//             description:
//               "Clear terms on how we collect, use, and protect your data.",
//           },
//         ].map((feature, index) => (
//           <div
//             key={index}
//             className="shadow-md bg-muted/15 p-6 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <div className="p-2 bg-blue-50 rounded-full">{feature.icon}</div>
//               <h3 className="font-semibold">{feature.title}</h3>
//             </div>
//             <p className="text-gray-600 text-[15px] sm:text-base">
//               {feature.description}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="bg-gray-50 rounded-lg px-3 sm:px-8 pt-6 pb-4  mb-12">
//         <h2 className="text-xl sm:text-2xl font-bold mb-6">
//           How We Protect Your Data
//         </h2>
//         <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
//           <div>
//             <h3 className="font-semibold mb-2 sm:mb-3">Encryption</h3>
//             <ul className="space-y-2 text-gray-600 text-[15px]">
//               <li>• TLS 1.2+ for all website connections</li>
//               <li>• AES-256 encryption for sensitive data</li>
//               <li>• Secure hashing for passwords (bcrypt)</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-2 sm:mb-3">Fraud Prevention</h3>
//             <ul className="space-y-2 text-gray-600 text-[15px]">
//               <li>• Address Verification System (AVS)</li>
//               <li>• 3D Secure for card payments</li>
//               <li>• Automated risk scoring for orders</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="mb-12">
//         <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
//           How You Can Stay Secure
//         </h2>
//         <div className="grid sm:grid-cols-2 text-[15px] lg:grid-cols-4 gap-2 sm:gap-4">
//           {[
//             "Use strong, unique passwords",
//             "Enable 2FA in account settings",
//             "Check for 'https://' in the URL",
//             "Never share login details",
//             "Log out from shared devices",
//             "Update devices regularly",
//             "Beware of phishing emails",
//             "Monitor account activity",
//           ].map((tip, index) => (
//             <div
//               key={index}
//               className="shadow-sm bg-muted/15 p-4 rounded-lg border border-gray-200 flex items-start gap-2"
//             >
//               <div className="text-blue-600">✓</div>
//               <span>{tip}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="text-center border-t border-gray-200 pt-4 sm:pt-10">
//         <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
//           Questions or Concerns?
//         </h2>
//         <p className="mb-6 text-[15px] max-w-2xl mx-auto text-gray-600">
//           Contact our security team if you notice any suspicious activity.
//         </p>
//         <div className="flex items-center justify-center gap-4">
//           <Link
//             href="mailto:security@hypermart.com"
//             className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md transition-colors"
//           >
//             Email Security Team
//           </Link>
//           <Link
//             href="/privacy-policy"
//             className="border border-blue-600 text-blue-600 px-3 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
//           >
//             Privacy Policy
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SecurityPage;

import {
  ShieldCheck,
  Lock,
  CreditCard,
  Server,
  Globe,
  HelpCircle,
  Shield,
  Key,
  EyeOff,
  AlertTriangle,
  Mail,
  FileText,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const SecurityPage = () => {
  const securityFeatures = [
    {
      icon: <ShieldCheck className="text-blue-600" size={24} />,
      title: "Secure Payments",
      description:
        "PCI-DSS certified payment processing through trusted partners. Card details are never stored on our servers.",
      badge: "PCI DSS Level 1",
    },
    {
      icon: <Lock className="text-blue-600" size={24} />,
      title: "Account Protection",
      description:
        "Mandatory 2FA for all administrative access and optional for customer accounts with multiple verification methods.",
      badge: "2FA Enabled",
    },
    {
      icon: <CreditCard className="text-blue-600" size={24} />,
      title: "Fraud Prevention",
      description:
        "AI-powered transaction monitoring with real-time fraud scoring and automated risk-based authentication.",
      badge: "AI Protection",
    },
    {
      icon: <Server className="text-blue-600" size={24} />,
      title: "Data Security",
      description:
        "Enterprise-grade encryption with regular penetration testing and security audits by independent firms.",
      badge: "SOC 2 Certified",
    },
    {
      icon: <Globe className="text-blue-600" size={24} />,
      title: "Privacy Compliance",
      description:
        "Full compliance with GDPR, CCPA, and other global privacy regulations with regional data sovereignty.",
      badge: "GDPR Compliant",
    },
    {
      icon: <HelpCircle className="text-blue-600" size={24} />,
      title: "Transparent Policies",
      description:
        "Clear documentation of our security practices with regular transparency reports and breach notifications.",
      badge: "Public Reports",
    },
  ];

  const securityStandards = [
    {
      name: "TLS 1.3 Encryption",
      description:
        "All connections use modern TLS protocols with perfect forward secrecy",
      icon: <Lock size={18} className="text-green-500" />,
    },
    {
      name: "AES-256 Encryption",
      description: "Military-grade encryption for data at rest and in transit",
      icon: <Key size={18} className="text-blue-500" />,
    },
    {
      name: "Zero-Knowledge Architecture",
      description: "We never store sensitive data in plaintext",
      icon: <EyeOff size={18} className="text-purple-500" />,
    },
    {
      name: "Regular Audits",
      description: "Quarterly security assessments by independent firms",
      icon: <Shield size={18} className="text-orange-500" />,
    },
  ];

  const userSecurityTips = [
    {
      title: "Strong Authentication",
      tips: [
        "Use a password manager",
        "Enable 2FA on all accounts",
        "Create 12+ character passwords",
      ],
    },
    {
      title: "Safe Browsing",
      tips: [
        "Verify site SSL certificates",
        "Check for padlock icon in browser",
        "Avoid public WiFi for transactions",
      ],
    },
    {
      title: "Account Security",
      tips: [
        "Monitor login activity",
        "Revoke unused app permissions",
        "Use unique passwords per site",
      ],
    },
    {
      title: "Fraud Prevention",
      tips: [
        "Recognize phishing attempts",
        "Verify sender email addresses",
        "Never share OTP codes",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-blue-50 rounded-full p-4 mb-6">
          <ShieldCheck className="text-blue-600" size={32} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Enterprise-Grade Security Protection
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We invest heavily in security infrastructure to protect your data with
          bank-level encryption, continuous monitoring, and compliance with
          global standards.
        </p>
      </div>

      {/* Certifications Badges */}
      <div className="mb-16">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {[
            {
              src: "/pci-dss-certified.png",
              alt: "PCI DSS Certified",
              description: "Payment Card Industry Data Security Standard",
              width: 120,
              height: 80,
            },
            {
              src: "/soc2-certified.png",
              alt: "SOC 2 Type II Certified",
              description: "Audited security controls and processes",
              width: 100,
              height: 100,
            },
            {
              src: "/gdpr-compliant.png",
              alt: "GDPR Compliant",
              description: "EU General Data Protection Regulation",
              width: 100,
              height: 100,
            },
            {
              src: "/iso-27001.png",
              alt: "ISO 27001 Certified",
              description: "Information security management standard",
              width: 100,
              height: 100,
            },
          ].map((badge) => (
            <div
              key={badge.alt}
              className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center max-w-[200px]"
            >
              <Image
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className="h-16 w-auto mb-3"
              />
              <h3 className="font-medium text-sm sm:text-base mb-1">
                {badge.alt}
              </h3>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Features */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Our Security Measures
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  {feature.badge && (
                    <Badge
                      variant="outline"
                      className="mt-1 border-blue-200 text-blue-600"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Standards */}
      <section className="bg-blue-50 rounded-2xl p-8 mb-16 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Technical Security Standards
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityStandards.map((standard, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-3">
                {standard.icon}
                <h3 className="font-medium">{standard.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{standard.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* User Security Tips */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Your Security Checklist
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userSecurityTips.map((category, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle
                      className="text-green-500 mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Incident Response */}
      <section className="bg-gray-50 rounded-2xl p-8 mb-16 border border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Incident Response Protocol
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Our 24/7 security team follows strict protocols to identify,
            contain, and remediate any security incidents.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Detection",
                description: "Automated monitoring with manual oversight",
                time: "Within 5 minutes",
              },
              {
                title: "Containment",
                description: "Immediate isolation of affected systems",
                time: "Within 15 minutes",
              },
              {
                title: "Notification",
                description: "Customer alerts for impacted accounts",
                time: "Within 1 hour",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-lg border border-gray-200"
              >
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                  SLA: {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Resources */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Security Resources
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Access our security documentation or contact our dedicated security
          team.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link
            href="/security/whitepaper"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-50"
          >
            <FileText size={18} />
            Security Whitepaper
          </Link>
          <Link
            href="/security/audit-reports"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-50"
          >
            <Shield size={18} />
            Audit Reports
          </Link>
          <Link
            href="mailto:security@example.com"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            <Mail size={18} />
            Contact Security Team
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-medium text-gray-900 mb-4">
            Additional Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Privacy Policy", icon: <EyeOff size={16} /> },
              { name: "Terms of Service", icon: <FileText size={16} /> },
              { name: "Bug Bounty Program", icon: <ShieldCheck size={16} /> },
              { name: "Compliance", icon: <CheckCircle size={16} /> },
            ].map((link, i) => (
              <Link
                key={i}
                href={`/${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                {link.icon}
                {link.name}
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage;
