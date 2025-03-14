// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
// import Link from "next/link";

// export default function ContactCTA() {
//   return (
//     <section className="py-20 bg-primary-900 text-white">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="space-y-6"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
//             <p className="text-xl text-primary-100">Description</p>

//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <Phone className="w-5 h-5 text-primary-300" />
//                 <span>Phone</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Mail className="w-5 h-5 text-primary-300" />
//                 <span>Email</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <MessageSquare className="w-5 h-5 text-primary-300" />
//                 <span>Chat</span>
//               </div>
//             </div>

//             <div className="flex gap-4 pt-4">
//               <Button asChild size="lg" variant="secondary">
//                 <Link href="/contact">
//                   Contact Button <ArrowRight className="ml-2 w-5 h-5" />
//                 </Link>
//               </Button>
//               <Button
//                 asChild
//                 size="lg"
//                 variant="outline"
//                 className="text-white border-white hover:bg-white hover:text-primary-900"
//               >
//                 <Link href="/book-demo">Demo Button</Link>
//               </Button>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="relative lg:h-[500px]"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-600 rounded-2xl overflow-hidden">
//               <div className="absolute inset-0 bg-grid-white/5" />
//               <div className="relative h-full p-8 flex flex-col justify-center">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
//                   <h3 className="text-xl font-semibold mb-2">Support Title</h3>
//                   <p className="text-primary-100">Support Description</p>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
//                   <h3 className="text-xl font-semibold mb-2">Sales Title</h3>
//                   <p className="text-primary-100">Sales Description</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
            <p className="text-xl text-primary-100">Description</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-300" />
                <span>Phone</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-300" />
                <span>Email</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-primary-300" />
                <span>Chat</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Contact Button <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary-900"
              >
                <Link href="/book-demo">Demo Button</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-600 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/5" />
              <div className="relative h-full p-8 flex flex-col justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-2">Support Title</h3>
                  <p className="text-primary-100">Support Description</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-2">Sales Title</h3>
                  <p className="text-primary-100">Sales Description</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
