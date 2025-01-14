"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface CarouselComponentProps {
  images: string[];
}

export default function CarouselComponent({ images }: CarouselComponentProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    const interval = setInterval(() => {
      if (api) {
        const nextIndex = (api.selectedScrollSnap() + 1) % count;
        api.scrollTo(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, count]);

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      className="relative w-[65vw] h-[50vh] overflow-hidden flex items-center justify-center"
    >
      <CarouselContent className="flex w-full h-full">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="w-full h-full shrink-0 flex items-center justify-center"
          >
            <Card className="relative w-[55vw] h-[50vh] overflow-hidden shadow-lg rounded-xl">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <CardContent className="relative flex items-center justify-center w-full h-full bg-black bg-opacity-30">
                <span className="text-4xl font-bold text-white">
                  Slide {index + 1}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg" />
      <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg" />
    </Carousel>
  );
}
