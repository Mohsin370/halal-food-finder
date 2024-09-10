"use client";

import { useEffect, useRef, useState } from "react";
import ScrollCard from "./Card";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

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
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);


  useEffect(() => {
    const handleScroll = () => checkScrollButtons();

    const container = scrollContainerRef.current;
    if (container) {
      // Attach the scroll event listener to check for scroll position during scrolling.
      container.addEventListener("scroll", handleScroll);

      // Perform an initial check to update button visibility when the component mounts.
      checkScrollButtons();
    }

    // Cleanup: Remove the event listener when the component unmounts or the ref changes.
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
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
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      // If the container is scrolled more than 0px from the left, show the left button.
      setShowLeftButton(container.scrollLeft > 0);

      // If the right edge of the visible content is less than the full width of the scrollable content, show the right button.
      setShowRightButton(container.scrollLeft + container.clientWidth < container.scrollWidth);
    }
  };

  return (
    <div className="relative">
      <div ref={scrollContainerRef} className="flex overflow-x-auto whitespace-nowrap scrollbar-hide px-3">
        {items.map((item: SliderProps) => (
          <div key={item.id} className="inline-block">
            <ScrollCard restaurant={item} />
          </div>
        ))}
      </div>

      {showLeftButton && (
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-2 py-2 rounded-full z-10">
          <ArrowLeftCircleIcon className="h-6 w-6" />
        </button>
      )}

      {showRightButton && (
        <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-2 py-2 rounded-full z-10">
          <ArrowRightCircleIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
