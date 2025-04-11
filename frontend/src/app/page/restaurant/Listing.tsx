"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "@heroui/pagination";
import { twMerge } from "tailwind-merge";
import ListingItem from "../../../components/Card";
import SearchSection from "../../../components/client/SearchSection";
import { fetchRestaurantsListing, getRestaurantlookUps, LookUpType } from "../../../utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import NotFound from "../../../images/no_data.svg";
import { Divider, Spinner } from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

type filterType = {
  cuisineType: number | null;
};

type listingProp = {
  restaurants: RestaurantT[];
  lookups: LookUpType;
};

const getCuisineImage = (cuisineName: string) => {
  try {
    return require(`../../../images/icons/cuisines/${cuisineName.toLowerCase()}.svg`);
  } catch (e) {
    try {
      return require(`../../../images/icons/cuisines/${cuisineName.toLowerCase()}.png`);
    } catch (e) {
      return require(`../../../images/icons/cuisines/indian.svg`);
    }
  }
};

const Listing = () => {
  const coords = useSelector((state: RootState) => state.location);

  const [filter, setFilters] = useState<filterType | null>(null);
  const [restaurants, setRestaurants] = useState<RestaurantT[] | null>(null);
  const [lookups, setLookups] = useState<LookUpType | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const cuisineType = searchParams.get("cuisineType") || "";

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const lookupData = await getRestaurantlookUps();
        setLookups(lookupData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLookups();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (coords.latitude !== "" && coords.longitude !== "") {
          console.log("coords available as: ", coords);
        }
        const { latitude, longitude } = coords;
        const restaurantData = await fetchRestaurantsListing(parseInt(cuisineType || "0"), latitude, longitude);
        setRestaurants(restaurantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    if (cuisineType) {
      setFilters({
        cuisineType: parseInt(cuisineType),
      });
    }
  }, [cuisineType, coords]);

  const handleFilterChange = (cuisineType: CuisineType) => {
    let cuisineTypeId = null;
    if (filter?.cuisineType !== cuisineType.id) {
      cuisineTypeId = cuisineType.id;
    }
    setFilters({
      cuisineType: cuisineTypeId,
    });
    if (cuisineTypeId == null) {
      router.push(`/restaurants`);
      return;
    }

    router.push(`?cuisineType=${cuisineTypeId}`);
  };

  return (
    <div className="flex justify-center">
      <div className="p-3 container">
        <div className="flex my-2 justify-around cursor-pointer overflow-auto">
          {lookups?.cuisineType?.map((el) => (
            <div className={twMerge("mx-5 px-5 py-2", filter?.cuisineType === el.id && "bg-zinc-600 text-white rounded-xl")} key={el.id} onClick={() => handleFilterChange(el)}>
              <div className="flex flex-col items-center">
                <Image src={getCuisineImage(el.name)} className="w-12 h-12 object-contain" alt={el.name} />
                <p className="text-sm">{el.name}</p>
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div className="flex flex-wrap justify-center">
          {restaurants ? (
            restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <div className="mb-3" key={restaurant.id}>
                  <ListingItem restaurant={restaurant} />
                </div>
              ))
            ) : (
              <div className="my-10">
                <Image src={NotFound} width={250} alt="Not Found" />
                <p className="text-xl text-center">No Restaurant Found...</p>
              </div>
            )
          ) : (
            <div className="relative min-h-[60vh] w-full ">
              <div className="absolute inset-0 flex flex-col justify-center items-center ">
                <Spinner className="text-danger" />
                <p className="ml-2 text-lg">Loading Restaurants...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
