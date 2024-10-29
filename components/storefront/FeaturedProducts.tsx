import { Suspense } from "react";
import prisma from "@/lib/db";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      status: "published",
      isFetured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
}

export default async function FeaturedProducts() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Featured Items
          </h2>
          <Button asChild variant="outline">
            <Link href="/products/all">View All Products</Link>
          </Button>
        </div>
        <Suspense fallback={<LoadingProductGrid />}>
          <ProductGrid />
        </Suspense>
      </div>
    </section>
  );
}

async function ProductGrid() {
  noStore();
  const products = await getFeaturedProducts();

  if (products.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No featured products available at the moment.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </div>
  );
}

function LoadingProductGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="h-60 w-full rounded-lg" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full sm:w-32" />
        </div>
      ))}
    </div>
  );
}
