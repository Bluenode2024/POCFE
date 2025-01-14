"use client";

import React from "react";
import CarouselComponent from "@/components/CarouselComponent";

export default function Home() {
  const images = [
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=400&fit=crop",
  ];

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <CarouselComponent images={images} />
    </div>
  );
}
