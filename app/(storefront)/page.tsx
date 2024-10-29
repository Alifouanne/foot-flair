import CategorySelection from "@/components/storefront/CategorySelection";
import FeaturedProducts from "@/components/storefront/FeaturedProducts";
import Hero from "@/components/storefront/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FootFlair - Step into Style, Walk in Comfort",
  description:
    "Discover stylish and comfortable footwear at FootFlair. Your ultimate destination for high-quality shoes.",
  openGraph: {
    title: "FootFlair - Premium Footwear",
    description:
      "Step into style with FootFlair's curated collection of comfortable and trendy shoes.",
  },
};
const IndexPage = () => {
  return (
    <>
      <Hero />
      <CategorySelection />
      <FeaturedProducts />
    </>
  );
};

export default IndexPage;
