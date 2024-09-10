"use client";

import { useRef } from "react";
import ScrollCard from "./Card";

interface SliderProps {
  id: number;
  name: string;
  image: string;
  type: string;
  suburb: string;
  city: string;
}


export default function Slider({ items }: { items: SliderProps[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: -scrollWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Scrollable restaurant cards */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto whitespace-nowrap scrollbar-hide px-3"
      >
        {items.map((item: SliderProps) => (
          <div key={item.id} className="inline-block">
            <ScrollCard restaurant={item} />
          </div>
        ))}
      </div>

      {/* Scroll left button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full z-10"
      >
        Scroll Left
      </button>

      {/* Scroll right button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full z-10"
      >
        Scroll Right
      </button>
    </div>
  );
}
