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
import Image from 'next/image';

interface CarouselComponentProps {
  images: { src: string; text: React.ReactNode }[]; // images는 src와 text를 가진 객체 배열
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
    }, 10000);

    return () => clearInterval(interval);
  }, [api, count]);

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      className="relative w-full h-[50vh] overflow-hidden flex items-center justify-center"
    >
      <CarouselContent className="flex w-full h-full">
        {images.map((item, index) => (
          <CarouselItem
            key={index}
            className="w-full h-full shrink-0 flex items-center justify-center"
          >
            <Card className="relative w-[55vw] h-[50vh] overflow-hidden shadow-lg rounded-xl">
              <Image 
                src={item.src}
                alt={`Slide ${index + 1}`}
                width={500}
                height={300}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <CardContent className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-4 rounded-md">
                <span className="text-xl font-bold text-white">
                  {item.text}
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