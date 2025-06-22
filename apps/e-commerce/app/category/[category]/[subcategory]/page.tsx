import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/home-page/navbar/Navbar";
import Subcategory from "./subcategoryComponents/SubCategory";
import { getSubCategoryMetadata } from "./subcategoryComponents/subMetadataUtils";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { category: string; subcategory: string; singlesubcategory: string };
}): Promise<Metadata> {
  return await getSubCategoryMetadata(params.category, params.subcategory);
}

export default function SubcategoryPage() {
  return (
    <div className="">
      <Navbar />
      <Subcategory />
      <Footer />
    </div>
  );
}
