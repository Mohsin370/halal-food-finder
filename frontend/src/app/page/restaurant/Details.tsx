"use client";
import React, { useEffect, useState } from "react";
// import { placeDetails } from "../../../utils/api";
import Header from "../../../components/restaurant/header";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchRestaurantById } from "../../../utils/api";
import { setSelected } from "../../../redux/features/restaurantSlice";

const Details = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  let selectedRestaurant = useSelector((state: RootState) => state.restaurant);

  useEffect(() => {
    if (!selectedRestaurant.name && id) {
      const getData = async () => {
        const res: RestaurantT = await fetchRestaurantById(parseInt(id));
        dispatch(
          setSelected({
            id: res.id,
            description: res.description,
            name: res.name,
            cuisineType: res.cuisineType.name,
            restaurantType: res.restaurantType.name,
            image: res.image,
            placeId: res.placeId,
          })
        );
      };
      getData();
    }
  }, [id]);

  //   const restaurantDetails = await placeDetails(id, ["*"]);
  //   console.log(restaurantDetails);

  return (
    <div className="m-auto container my-5">
      <div className="flex">
        <Header imageSrc={selectedRestaurant.image} />
        <div className="ml-5">
          <h2 className="text-xl font-bold">{selectedRestaurant.name}</h2>
          <p className="">{selectedRestaurant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
