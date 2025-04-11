"use client"
import React from "react";
// import { placeDetails } from "../../../utils/api";
import Header from "../../../components/restaurant/header";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Details = ({ placeId }: { placeId: string }) => {
  const selectedRestaurant = useSelector(
    (state: RootState) => state.restaurant
  );
  //   const restaurantDetails = await placeDetails(id, ["*"]);
  //   console.log(restaurantDetails);

  return (
    <div className="m-auto container">
      <div className="w-50">
        <Header imageSrc={selectedRestaurant.image} />
      </div>
    </div>
  );
};

export default Details;
