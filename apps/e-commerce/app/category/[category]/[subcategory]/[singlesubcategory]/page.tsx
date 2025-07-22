import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import React from "react";
import SingleSuCategoricalProductPage from "./SingleSubcategoricalProduct";
import { Metadata } from "next";
import { getProductMetadata } from "./productMetadataUtils";

// import { getProductMetadata } from "@/utils/metadataUtils";

// export async function generateMetadata({
//   params,
// }: {
//   params: { category: string; subcategory: string; singlesubcategory: string };
// }): Promise<Metadata> {
//   return await getProductMetadata(
//     params.category,
//     params.subcategory,
//     params.singlesubcategory
//   );
// }

export default function page() {
  return (
    <div>
      <Navbar />
      <SingleSuCategoricalProductPage />
      <Footer />
    </div>
  );
}
