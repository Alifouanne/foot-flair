import React from "react";
import { notFound } from "next/navigation";
import ProductCard from "@/components/storefront/ProductCard";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

type Product = {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
};

type CategoryData = {
  title: string;
  data: Product[];
};
// The function checks the category parameter using a switch statement.
// For each recognized category, it queries the database for published products in that category.
// It selects specific fields: name, images, id, description, and price.
// Returns an object with a title and the fetched data.
// If the category is not recognized, it calls the notFound function.
const getData = async (category: string) => {
  switch (category) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          id: true,
          description: true,
          price: true,
        },
        where: {
          status: "published",
        },
      });
      return {
        title: "All Products",
        data: data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "men",
        },
        select: {
          name: true,
          images: true,
          id: true,
          description: true,
          price: true,
        },
      });
      return {
        title: "Men Products",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "women",
        },
        select: {
          name: true,
          images: true,
          id: true,
          description: true,
          price: true,
        },
      });
      return {
        title: "Women Products",
        data: data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "kids",
        },
        select: {
          name: true,
          images: true,
          id: true,
          description: true,
          price: true,
        },
      });
      return {
        title: "Kids Products",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
};

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  noStore();
  const { data, title } = await getData(params.name);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">{title}</h1>
      </div>
      {data.length === 0 ? (
        <p className="text-center text-gray-500 my-12">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
