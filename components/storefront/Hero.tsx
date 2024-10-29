import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import prisma from "@/lib/db";
import { Banner } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

async function getBanners(): Promise<Banner[]> {
  return prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function Hero() {
  noStore();
  const banners = await getBanners();

  return (
    <section className="relative w-full max-w-[1400px] mx-auto mt-5">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-[60vh] lg:h-[80vh] w-full">
                <Image
                  alt={banner.name}
                  src={banner.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
                  priority
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div className="absolute bottom-6 left-6 text-white p-6 rounded-xl transition-all hover:scale-105 max-w-lg">
                  <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                    {banner.name}
                  </h1>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
}
