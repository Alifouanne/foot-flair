"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagesProps {
  images: string[];
}
const ImageSlider = ({ images }: ImagesProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const handlePreviousClick = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleNextClick = () => {
    setImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleImageClick = (index: number) => {
    setImageIndex(index);
  };
  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={images[imageIndex]}
          alt="Product Image"
          width={600}
          height={600}
          className="object-cover w-[600px] h-[600px]"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={handlePreviousClick}>
            <ChevronLeft className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextClick}>
            <ChevronRight className="size-6" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              index === imageIndex
                ? "border-2 border-primary"
                : "border border-gray-200",
              " relative overflow-hidden rounded-lg cursor-pointer"
            )}
          >
            <Image
              src={image}
              alt="Product Image"
              width={100}
              height={100}
              onClick={() => handleImageClick(index)}
            />
            <div className="object-cover size-[100px] absolute" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
