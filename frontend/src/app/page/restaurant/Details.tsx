"use client";
import React, { useEffect } from "react";
// import { placeDetails } from "../../../utils/api";
import Header from "../../../components/restaurant/header";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchRestaurantById } from "../../../utils/api";
import { setSelected } from "../../../redux/features/restaurantSlice";
import { Star } from "lucide-react";

const Details = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  let selectedRestaurant = useSelector((state: RootState) => state.restaurant);

  useEffect(() => {
    if (!selectedRestaurant.name && id) {
      const getData = async () => {
        const restaurant: Restaurant = await fetchRestaurantById(parseInt(id));
        dispatch(
          setSelected({
            id: restaurant.id,
            description: restaurant.description,
            name: restaurant.name,
            rating: restaurant.rating,
            useRatingCount: restaurant.userRatingCount,
            cuisineType: restaurant.cuisineType.name,
            restaurantType: restaurant.restaurantType.name,
            halalStatus: restaurant.halalStatus.description,
            image: restaurant.image,
            placeId: restaurant.placeId,
          })
        );
      };
      getData();
    }
  }, [id]);

  //   const restaurantDetails = await placeDetails(id, ["*"]);
  //   console.log(restaurantDetails);

  return (
    <div className="m-auto container px-2 my-5 w-full">
      <div className="flex flex-wrap md:flex-nowrap">
        <Header imageSrc={selectedRestaurant.image} cuisineType={selectedRestaurant.cuisineType} restaurantType={selectedRestaurant.restaurantType} />
        <div className="ml-5 md:w-2/3">
          <div className="flex w-full justify-between">
            <h2 className="text-xl font-bold">{selectedRestaurant.name}</h2>
            {selectedRestaurant.useRatingCount && (
              <div className="flex items-center">
                <p className="ml-3">{selectedRestaurant.rating}</p>
                <div>
                  <Star fill="#FDCC0D" strokeWidth={0} size={20}></Star>
                </div>
                <p className="ml-1">({selectedRestaurant.useRatingCount})</p>
              </div>
            )}
          </div>
          <p className="my-3"> {selectedRestaurant.halalStatus} </p>
          <p className="whitespace-pre-line">{selectedRestaurant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
