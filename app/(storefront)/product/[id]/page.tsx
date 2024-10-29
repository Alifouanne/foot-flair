import React from "react";
import { notFound } from "next/navigation";
import { ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCartButton } from "@/components/dashboard/SubmitButtons";
import FeaturedProducts from "@/components/storefront/FeaturedProducts";
import ImageSlider from "@/components/storefront/ImageSlider";
import { addItem } from "@/lib/actions";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

// The function getData is called with a product id.
// It queries the database for a product with the specified id, selecting specific fields.
// If no product is found, it calls notFound() to handle the error.
// If a product is found, it returns the product data.
async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: { id },
    select: {
      price: true,
      images: true,
      name: true,
      description: true,
      id: true,
      category: true,
    },
  });
  if (!data) {
    notFound();
  }
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  const addProductToShoppingCart = addItem.bind(null, data.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <ImageSlider images={data.images} />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
              {data.name}
            </h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{data.category}</Badge>
            </div>
          </div>
          <p className="text-3xl font-bold text-primary">
            ${data.price.toFixed(2)}
          </p>

          <Separator />
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-base text-gray-700">{data.description}</p>
          </div>
          <form action={addProductToShoppingCart} className="pt-4">
            <ShoppingCartButton />
          </form>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShoppingBag className="w-4 h-4" />
            <span>Free shipping on orders over $100</span>
          </div>
        </div>
      </div>
      <Separator className="my-16" />
      <div>
        <h2 className="text-2xl font-bold mb-8">You may also like</h2>
        <FeaturedProducts />
      </div>
    </div>
  );
}
