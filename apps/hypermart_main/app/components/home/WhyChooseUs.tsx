// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Zap, Shield, Users, Globe, Award, TrendingUp } from "lucide-react";
// // import { useTranslations } from "next-intl";

// const features = [
//   {
//     icon: Zap,
//     title: "Fast Implementation",
//     description: "whyChooseUs.fast.description",
//   },
//   {
//     icon: Shield,
//     title: "Enterprise Security",
//     description: "whyChooseUs.security.description",
//   },
//   {
//     icon: Users,
//     title: "24/7 Support Team",
//     description: "whyChooseUs.support.description",
//   },
//   {
//     icon: Globe,
//     title: "Global Scale",
//     description: "whyChooseUs.global.description",
//   },
//   {
//     icon: Award,
//     title: "Industry Leading",
//     description: "whyChooseUs.leading.description",
//   },
//   {
//     icon: TrendingUp,
//     title: "Proven Results",
//     description: "whyChooseUs.results.description",
//   },
// ];

// export default function WhyChooseUs() {
//   // const t = useTranslations("Home.WhyChooseUs");

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center max-w-3xl mx-auto mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             {t("title")}
//           </h2>
//           <p className="text-xl text-gray-600">{t("description")}</p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
//             >
//               <feature.icon className="w-12 h-12 text-primary mb-4" />
//               <h3 className="text-xl font-semibold mb-2">{t(feature.title)}</h3>
//               <p className="text-gray-600">{t(feature.description)}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Users, Globe, Award, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Implementation",
    description: "Quick and seamless integration with your existing systems",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security for all your business transactions",
  },
  {
    icon: Users,
    title: "24/7 Support Team",
    description: "Round-the-clock expert support whenever you need it",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Reach customers worldwide with our global infrastructure",
  },
  {
    icon: Award,
    title: "Industry Leading",
    description: "Setting the standard for e-commerce innovation",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Delivering measurable success for our clients",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600">
            Experience the difference with our cutting-edge solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
