import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProductCardProp {
  item: {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
  };
}
const ProductCard = ({ item }: ProductCardProp) => {
  return (
    <div className="rounded-lg">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[330px]">
                <Image
                  src={item}
                  alt="Product Image"
                  fill
                  className="object-cover object-center w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="flex justify-between items-center mt-2">
        <h1 className="text-xl font-semibold">{item.name}</h1>
        <h3 className="inline-flex items-center bg-primary/10 rounded-md px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${item.price}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p>
      <Button className="w-full mt-5" asChild>
        <Link href={`/product/${item.id}`}>Learn More</Link>
      </Button>
    </div>
  );
};

export default ProductCard;
