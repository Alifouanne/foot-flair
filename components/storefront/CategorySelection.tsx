import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.jpeg";
import men from "@/public/men.jpeg";
import women from "@/public/women.jpeg";

const categories = [
  { name: "All Products", image: all, href: "/products/all" },
  { name: "Women Products", image: women, href: "/products/women" },
  { name: "Men Products", image: men, href: "/products/men" },
];

export default function CategorySelection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Shop by Category
          </h2>
          <Link
            href="/products/all"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Browse all Products <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`group relative rounded-lg overflow-hidden ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div className="aspect-w-16 aspect-h-9 sm:aspect-none sm:h-full">
                <Image
                  src={category.image}
                  alt={`${category.name} category image`}
                  className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                  sizes={
                    index === 0
                      ? "(max-width: 800px) 100vw, 1300px"
                      : "(max-width: 640px) 100vw, 600px"
                  }
                  priority={index === 0}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
              <div className="absolute inset-0 flex items-end p-4 sm:p-6">
                <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    <Link href={category.href} className="stretched-link">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {category.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Shop now <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
