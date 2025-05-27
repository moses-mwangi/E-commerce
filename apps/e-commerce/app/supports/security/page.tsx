import {
  ShieldCheck,
  Lock,
  CreditCard,
  Server,
  Globe,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SecurityPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-5 sm:mb-7 md:mb-12">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-3 md:mb-4">
          Your Security is Our Priority
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          We use industry-standard encryption and fraud prevention to protect
          your data.
        </p>
      </div>

      <div className="flex sm:flex-wrap py-[2px] sm:justify-center gap-4 mb-5 sm:mb-7 md:mb-12 overflow-x-scroll hide-scrollbar">
        {[
          {
            src: "/pci-dss-certified.png",
            alt: "PCI DSS Compliant",
            description: "All payments processed securely",
          },
          {
            src: "/ssl-secure.png",
            alt: "256-bit SSL Encryption",
            description: "Data encrypted in transit",
          },
          {
            src: "/gdpr-compliant.png",
            alt: "GDPR Compliant",
            description: "Strict data privacy standards",
          },
        ].map((badge) => (
          <div
            key={badge.alt}
            className="bg-whiste shadow-md bg-muted/15 flex-shrink-0 p-4 rounded-lg  text-center max-w-xs"
          >
            <div className=" hidden sm:flex justify-center mb-2">
              <Image
                src={badge.src}
                alt={badge.alt}
                width={70}
                height={70}
                className="h-16 w-auto"
              />
            </div>
            <p className="font-medium">{badge.alt}</p>
            <p className="text-sm text-gray-600 ">{badge.description}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-5 sm:mb-7 md:mb-12 ">
        {[
          {
            icon: <ShieldCheck className="text-blue-600" size={24} />,
            title: "Secure Payments",
            description:
              "We process all transactions via Paystack, a PCI-DSS certified. Your card details are never stored on our servers.",
          },
          {
            icon: <Lock className="text-blue-600" size={24} />,
            title: "Account Protection",
            description:
              "Two-factor authentication (2FA) available for all user accounts.",
          },
          {
            icon: <CreditCard className="text-blue-600" size={24} />,
            title: "Fraud Prevention",
            description:
              "Real-time transaction monitoring to detect and block suspicious activity.",
          },
          {
            icon: <Server className="text-blue-600" size={24} />,
            title: "Data Security",
            description: "Regular security audits and encrypted databases.",
          },
          {
            icon: <Globe className="text-blue-600" size={24} />,
            title: "Privacy Compliance",
            description:
              "We adhere to GDPR, CCPA, and other regional data protection laws.",
          },
          {
            icon: <HelpCircle className="text-blue-600" size={24} />,
            title: "Transparent Policies",
            description:
              "Clear terms on how we collect, use, and protect your data.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="shadow-md bg-muted/15 p-6 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-full">{feature.icon}</div>
              <h3 className="font-semibold">{feature.title}</h3>
            </div>
            <p className="text-gray-600 text-[15px] sm:text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg px-3 sm:px-8 pt-6 pb-4  mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">
          How We Protect Your Data
        </h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h3 className="font-semibold mb-2 sm:mb-3">Encryption</h3>
            <ul className="space-y-2 text-gray-600 text-[15px]">
              <li>• TLS 1.2+ for all website connections</li>
              <li>• AES-256 encryption for sensitive data</li>
              <li>• Secure hashing for passwords (bcrypt)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 sm:mb-3">Fraud Prevention</h3>
            <ul className="space-y-2 text-gray-600 text-[15px]">
              <li>• Address Verification System (AVS)</li>
              <li>• 3D Secure for card payments</li>
              <li>• Automated risk scoring for orders</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          How You Can Stay Secure
        </h2>
        <div className="grid sm:grid-cols-2 text-[15px] lg:grid-cols-4 gap-2 sm:gap-4">
          {[
            "Use strong, unique passwords",
            "Enable 2FA in account settings",
            "Check for 'https://' in the URL",
            "Never share login details",
            "Log out from shared devices",
            "Update devices regularly",
            "Beware of phishing emails",
            "Monitor account activity",
          ].map((tip, index) => (
            <div
              key={index}
              className="shadow-sm bg-muted/15 p-4 rounded-lg border border-gray-200 flex items-start gap-2"
            >
              <div className="text-blue-600">✓</div>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center border-t border-gray-200 pt-4 sm:pt-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
          Questions or Concerns?
        </h2>
        <p className="mb-6 text-[15px] max-w-2xl mx-auto text-gray-600">
          Contact our security team if you notice any suspicious activity.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="mailto:security@hypermart.com"
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md transition-colors"
          >
            Email Security Team
          </Link>
          <Link
            href="/privacy-policy"
            className="border border-blue-600 text-blue-600 px-3 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;

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

// export const metadata = {
//   title: "Security & Privacy | HyperMart",
//   description: "Learn how HyperMart protects your personal and payment data.",
// };

// const SecurityPage = () => {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-3xl md:text-4xl font-bold mb-4">
//           Your Security is Our Priority
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           We use industry-standard encryption, secure payments, and fraud
//           prevention to protect your data at all times.
//         </p>
//       </div>

//       <div className="flex flex-wrap justify-center gap-4 mb-12">
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
//             className="bg-white p-4 rounded-lg shadow-sm text-center max-w-xs"
//           >
//             <div className="flex justify-center mb-2">
//               <Image
//                 src={badge.src}
//                 alt={badge.alt}
//                 title={badge.alt}
//                 width={80}
//                 height={80}
//                 className="h-16 w-auto"
//               />
//             </div>
//             <p className="font-medium">{badge.alt}</p>
//             <p className="text-sm text-gray-600">{badge.description}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//         {[
//           {
//             icon: <ShieldCheck className="text-blue-600" size={24} />,
//             title: "Secure Payments",
//             description:
//               "We process all transactions via Paystack, a PCI-DSS Level 1 certified provider. Your card details are never stored on our servers.",
//           },
//           {
//             icon: <Lock className="text-blue-600" size={24} />,
//             title: "Account Protection",
//             description:
//               "Two-factor authentication (2FA) is available for all user accounts.",
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
//             description:
//               "We use encrypted databases and perform regular security audits.",
//           },
//           {
//             icon: <Globe className="text-blue-600" size={24} />,
//             title: "Privacy Compliance",
//             description:
//               "We comply with GDPR, CCPA, and other data protection regulations.",
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
//             className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <div className="p-2 bg-blue-50 rounded-full">{feature.icon}</div>
//               <h3 className="font-semibold">{feature.title}</h3>
//             </div>
//             <p className="text-gray-600">{feature.description}</p>
//           </div>
//         ))}
//       </div>

//       <div className="bg-gray-50 rounded-lg p-8 mb-12">
//         <h2 className="text-2xl font-bold mb-6">How We Protect Your Data</h2>
//         <div className="grid md:grid-cols-2 gap-8">
//           <div>
//             <h3 className="font-semibold mb-3">Encryption</h3>
//             <ul className="space-y-2 text-gray-600">
//               <li>• TLS 1.2+ for all website connections</li>
//               <li>• AES-256 encryption for sensitive data</li>
//               <li>• Secure hashing for passwords (bcrypt)</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-3">Fraud Prevention</h3>
//             <ul className="space-y-2 text-gray-600">
//               <li>• Address Verification System (AVS)</li>
//               <li>• 3D Secure for card payments</li>
//               <li>• Automated risk scoring for orders</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="mb-12">
//         <h2 className="text-2xl font-bold mb-6">How You Can Stay Secure</h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
//               className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-2"
//             >
//               <div className="text-blue-600">✓</div>
//               <span>{tip}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="text-center border-t border-gray-200 pt-12">
//         <h2 className="text-2xl font-bold mb-4">Questions or Concerns?</h2>
//         <p className="mb-6 max-w-2xl mx-auto text-gray-600">
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
//         <p className="text-sm text-gray-500 mt-6">
//           Last updated: August 2025. Security practices may evolve based on
//           industry standards.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SecurityPage;
