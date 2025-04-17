"use client";
import React, { useEffect, useState } from "react";
import { fetchFeaturedRestaurants, fetchRcentRestaurants } from "../../utils/api";
import Slider from "../Slider";
import { Spinner } from "@heroui/react";

const SliderSection: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>();
  const [featured, setFeatured] = useState<Restaurant[]>();

  useEffect(() => {
    const fetchData = async () => {
      const restaurants: Restaurant[] = await fetchRcentRestaurants();
      const featured = await fetchFeaturedRestaurants();
      setRestaurants(restaurants);
      setFeatured(featured);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="p-3 container">
          <h1 className="font-bold text-2xl p-2">Recently Added</h1>
          {restaurants ? (
            <Slider items={restaurants} />
          ) : (
            <div className="w-full h-[300px] justify-center flex items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-3 container">
          <h1 className="font-bold text-2xl p-2">Featured Restaurants</h1>
          {featured ? (
            <Slider items={featured} />
          ) : (
            <div className="w-full h-[300px] justify-center flex items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
