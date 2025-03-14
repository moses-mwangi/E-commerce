// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// // import { useTranslations } from "next-intl";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Calendar } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const news = [
//   {
//     id: 1,
//     title: "news.ai.title",
//     excerpt: "news.ai.excerpt",
//     image: "/news/ai-commerce.jpg",
//     date: "2024-03-15",
//     category: "AI & Technology",
//     slug: "ai-revolutionizing-ecommerce",
//   },
//   {
//     id: 2,
//     title: "news.global.title",
//     excerpt: "news.global.excerpt",
//     image: "/news/global-expansion.jpg",
//     date: "2024-03-10",
//     category: "Business",
//     slug: "global-expansion-2024",
//   },
//   {
//     id: 3,
//     title: "news.customer.title",
//     excerpt: "news.customer.excerpt",
//     image: "/news/customer-experience.jpg",
//     date: "2024-03-05",
//     category: "Customer Success",
//     slug: "enhancing-customer-experience",
//   },
// ];

// export default function LatestNews() {
//   const t = useTranslations("Home.News");

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-12">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//               {t("title")}
//             </h2>
//             <p className="text-xl text-gray-600 mt-2">{t("description")}</p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <Button asChild variant="outline">
//               <Link href="/blog">
//                 {t("viewAll")} <ArrowRight className="ml-2 w-4 h-4" />
//               </Link>
//             </Button>
//           </motion.div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {news.map((article, index) => (
//             <motion.div
//               key={article.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Card className="overflow-hidden hover:shadow-lg transition-shadow">
//                 <div className="relative h-48">
//                   <Image
//                     src={article.image}
//                     alt={t(article.title)}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//                     <Calendar className="w-4 h-4" />
//                     {new Date(article.date).toLocaleDateString()}
//                     <span className="text-primary">{article.category}</span>
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">
//                     {t(article.title)}
//                   </h3>
//                   <p className="text-gray-600 mb-4">{t(article.excerpt)}</p>
//                   <Button asChild variant="link" className="p-0">
//                     <Link href={`/blog/${article.slug}`}>
//                       {t("readMore")} <ArrowRight className="ml-1 w-4 h-4" />
//                     </Link>
//                   </Button>
//                 </div>
//               </Card>
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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const news = [
  {
    id: 1,
    title: "AI is Revolutionizing E-commerce",
    excerpt:
      "Discover how artificial intelligence is transforming online retail experiences",
    image: "/news/ai-commerce.jpg",
    date: "2024-03-15",
    category: "AI & Technology",
    slug: "ai-revolutionizing-ecommerce",
  },
  {
    id: 2,
    title: "Global Expansion Success",
    excerpt:
      "Learn about our successful expansion into new international markets",
    image: "/news/global-expansion.jpg",
    date: "2024-03-10",
    category: "Business",
    slug: "global-expansion-2024",
  },
  {
    id: 3,
    title: "Enhanced Customer Experience",
    excerpt:
      "New features that are helping businesses improve customer satisfaction",
    image: "/news/customer-experience.jpg",
    date: "2024-03-05",
    category: "Customer Success",
    slug: "enhancing-customer-experience",
  },
];

export default function LatestNews() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Latest News
            </h2>
            <p className="text-xl text-gray-600 mt-2">
              Stay updated with our latest developments and insights
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline">
              <Link href="/blog">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString()}
                    <span className="text-primary">{article.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Button asChild variant="link" className="p-0">
                    <Link href={`/blog/${article.slug}`}>
                      Read More <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
