// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// // import { useTranslations } from "next-intl";
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "CEO, TechCorp",
//     image: "/testimonials/sarah.jpg",
//     quote: "testimonials.sarah.quote",
//     company: "testimonials.sarah.company",
//   },
//   // Add more testimonials...
// ];

// export default function TestimonialsSection() {
//   // const t = useTranslations("Home.Testimonials");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const next = () => {
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prev = () => {
//     setCurrentIndex(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   return (
//     <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
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

//         <div className="relative max-w-4xl mx-auto">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
//             >
//               <Quote className="w-12 h-12 text-primary/20 mb-6" />
//               <blockquote className="text-xl md:text-2xl text-gray-700 mb-8">
//                 {t(testimonials[currentIndex].quote)}
//               </blockquote>

//               <div className="flex items-center gap-4">
//                 <div className="relative w-16 h-16 rounded-full overflow-hidden">
//                   <Image
//                     src={testimonials[currentIndex].image}
//                     alt={testimonials[currentIndex].name}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-lg">
//                     {testimonials[currentIndex].name}
//                   </h4>
//                   <p className="text-gray-600">
//                     {testimonials[currentIndex].role}
//                   </p>
//                   <p className="text-primary">
//                     {t(testimonials[currentIndex].company)}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           <div className="flex justify-center gap-4 mt-8">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={prev}
//               className="rounded-full"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={next}
//               className="rounded-full"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    image: "/testimonials/sarah.jpg",
    quote:
      "The AI-powered features have transformed how we do business. Our conversion rates have increased by 150% since implementation.",
    company: "TechCorp Solutions",
  },
  // Add more testimonials...
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Hear from businesses that have transformed with our solutions
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <Quote className="w-12 h-12 text-primary/20 mb-6" />
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8">
                {testimonials[currentIndex].quote}
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-primary">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
