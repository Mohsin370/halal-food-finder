"use client";
import React, { useState } from "react";
import { Pagination } from "@heroui/pagination";
import { twMerge } from "tailwind-merge";
import ListingItem from "../../components/Card";
import SearchSection from "../../components/client/SearchSection";
import { LookUpType } from "../../utils/api";

type filterType = {
  cuisineType: string;
};
const init = {
  cuisineType: "",
};

type listingProp = {
  restaurants: RestaurantT[];
  lookups: LookUpType;
};

const Listing = ({ restaurants, lookups }: listingProp) => {
  const [filter, setFilters] = React.useState<filterType>();

  return (
    <div className="flex justify-center">
      <div className="p-3 container">
        <div className="text-center m-auto">
          <SearchSection displaySearchbtn={false} />
        </div>
        <div className="flex flex-wrap my-2 justify-center cursor-pointer">
          {lookups?.cuisineType.map((el) => {
            return (
              <div
                className={twMerge("px-3", filter?.cuisineType === el.id ? "bg-black text-white rounded-xl" : "")}
                key={el.id}
                onClick={() =>
                  setFilters({
                    cuisineType: el.id,
                  })
                }
              >
                {el.name}
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center">
          {restaurants.map((restaurant: RestaurantT) => (
            <div className="mb-3" key={restaurant.id}>
              <ListingItem restaurant={restaurant} />
            </div>
          ))}
        </div>

        <div className="flex justify-center m-7">
          <Pagination showControls total={10} initialPage={1} />
        </div>
      </div>
    </div>
  );
};

export default Listing;
