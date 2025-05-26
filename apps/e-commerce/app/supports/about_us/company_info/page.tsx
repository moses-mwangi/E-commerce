// // app/about/page.tsx
// import Image from "next/image";

// export default function AboutUs() {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">About Hypermart</h1>

//       <div className="bg-white p-6 rounded-lg shadow mb-8">
//         <div className="flex flex-col md:flex-row gap-8 items-center">
//           <div className="md:w-1/2">
//             <Image
//               src="/about-us-image.jpg"
//               alt="Hypermart team"
//               width={600}
//               height={400}
//               className="rounded-lg"
//             />
//           </div>
//           <div className="md:w-1/2">
//             <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
//             <p className="mb-4">
//               Founded in 2010, Hypermart started as a small online bookstore in
//               a garage. Today, we&apos;ve grown into one of the largest
//               e-commerce platforms, serving millions of customers worldwide with
//               a vast selection of products.
//             </p>
//             <p className="mb-4">
//               Our mission is to make shopping online easy, enjoyable, and
//               accessible to everyone. We achieve this through innovative
//               technology, exceptional customer service, and an unwavering
//               commitment to quality.
//             </p>
//             <p>
//               What sets us apart is our dedication to customer satisfaction and
//               our continuous efforts to improve the online shopping experience.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-xl font-semibold mb-3">Our Values</h3>
//           <ul className="space-y-2">
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">✓</span>
//               <span>Customer Obsession</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">✓</span>
//               <span>Innovation</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">✓</span>
//               <span>Integrity</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">✓</span>
//               <span>Sustainability</span>
//             </li>
//           </ul>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-xl font-semibold mb-3">By The Numbers</h3>
//           <ul className="space-y-3">
//             <li>
//               <span className="font-bold text-2xl">10M+</span>
//               <p className="text-gray-600">Happy Customers</p>
//             </li>
//             <li>
//               <span className="font-bold text-2xl">5M+</span>
//               <p className="text-gray-600">Products Available</p>
//             </li>
//             <li>
//               <span className="font-bold text-2xl">150+</span>
//               <p className="text-gray-600">Countries Served</p>
//             </li>
//           </ul>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-xl font-semibold mb-3">Our Team</h3>
//           <p className="mb-3">
//             We&apos;re a diverse team of 2,000+ employees across 15 countries,
//             united by our passion for e-commerce and customer satisfaction.
//           </p>
//           <p>
//             Our team includes technology experts, logistics professionals,
//             customer service specialists, and more.
//           </p>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow mb-8">
//         <h2 className="text-2xl font-semibold mb-4">
//           Corporate Responsibility
//         </h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
//             <p className="mb-3">
//               We&apos;re committed to reducing our environmental impact through:
//             </p>
//             <ul className="list-disc pl-5 space-y-2">
//               <li>Carbon-neutral shipping options</li>
//               <li>Eco-friendly packaging initiatives</li>
//               <li>Renewable energy for our data centers</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-3">Community</h3>
//             <p className="mb-3">We give back through various initiatives:</p>
//             <ul className="list-disc pl-5 space-y-2">
//               <li>Hypermart Foundation supporting education</li>
//               <li>Disaster relief donations</li>
//               <li>Local community programs</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="bg-blue-50 p-6 rounded-lg">
//         <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
//         <p className="mb-4">
//           Interested in being part of Hypermart? We&apos;re always looking for
//           talented individuals to join our growing team.
//         </p>
//         <a
//           href="/careers"
//           className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           View Open Positions
//         </a>
//       </div>
//     </div>
//   );
// }

"use client"; // Enable interactivity

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, BarChart2, Globe, Rocket, Shield, Users } from "lucide-react";
// import { Globe, Rocket, Shield, BarChart2, Users, Award } from "react-feather";

// Stats counter animation
const Counter = ({ target, duration = 2 }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {count.toLocaleString()}+
    </span>
  );
};

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Redefining
          </span>{" "}
          Global Commerce
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Hypermart isn’t just a marketplace—it’s the future of seamless,
          AI-driven, borderless trade.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          {[
            { id: "mission", label: "Our Mission" },
            { id: "story", label: "Our Story" },
            { id: "impact", label: "Global Impact" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white shadow-md text-blue-600"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          {activeTab === "mission" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  We Empower <span className="text-blue-600">10M+</span>{" "}
                  Businesses Worldwide
                </h2>
                <p className="text-lg mb-6">
                  Hypermart leverages AI-driven logistics, blockchain-powered
                  transparency, and hyper-fast global shipping to connect buyers
                  and sellers like never before.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <Rocket className="text-blue-600 mt-1" />
                    <span>AI-Powered Supply Chain Optimization</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Globe className="text-blue-600 mt-1" />
                    <span>Real-Time Global Trade Analytics</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Shield className="text-blue-600 mt-1" />
                    <span>Fraud-Proof Blockchain Escrow</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/hyper-warehouse.jpg"
                  alt="Hypermart AI Warehouse"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === "story" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/founder-story.jpg"
                  alt="Hypermart Founders"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  From Garage to Global Dominance
                </h2>
                <p className="text-lg mb-6">
                  Founded in 2015 by a team of AI researchers and logistics
                  experts, Hypermart started as a small B2B SaaS. Today, we’re
                  the fastest-growing e-commerce ecosystem.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      2015 - The Beginning
                    </h3>
                    <p>Launched AI-powered inventory management for SMEs.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      2018 - Global Expansion
                    </h3>
                    <p>Opened 12 fulfillment centers across 3 continents.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      2023 - Market Leader
                    </h3>
                    <p>Processed $28B in annual GMV with 99.9% uptime.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "impact" && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-12">Our Global Footprint</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: <Users size={40} className="text-blue-600 mx-auto" />,
                    label: "Active Buyers",
                    value: 25,
                  },
                  {
                    icon: (
                      <BarChart2 size={40} className="text-blue-600 mx-auto" />
                    ),
                    label: "Annual GMV",
                    value: 28,
                  },
                  {
                    icon: <Globe size={40} className="text-blue-600 mx-auto" />,
                    label: "Countries",
                    value: 180,
                  },
                  {
                    icon: <Award size={40} className="text-blue-600 mx-auto" />,
                    label: "Industry Awards",
                    value: 42,
                  },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    {stat.icon}
                    <div className="mt-4">
                      <Counter target={stat.value} duration={1.5} />
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/global-map.jpg"
                  alt="Hypermart Global Coverage"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Leadership Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet the Visionaries
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Alex Chen", role: "CEO & Founder", image: "/alex.jpg" },
            { name: "Priya Patel", role: "CTO", image: "/priya.jpg" },
            {
              name: "James Wilson",
              role: "Chief Logistics",
              image: "/james.jpg",
            },
            { name: "Maria Lopez", role: "Head of AI", image: "/maria.jpg" },
          ].map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{leader.name}</h3>
                <p className="text-gray-600">{leader.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Future Vision */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">The Future is Hyper</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-6">By 2025, we aim to:</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-2xl">🚀</span>
                <span>Launch fully autonomous drone delivery in 50 cities</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl">🌍</span>
                <span>Enable 1-hour global shipping via quantum logistics</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl">🤖</span>
                <span>Deploy AI agents that negotiate deals autonomously</span>
              </li>
            </ul>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image
              src="/future-tech.jpg"
              alt="Future of Commerce"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
