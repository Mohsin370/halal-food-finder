import React from "react";
import { placeDetails } from "../../../utils/api";
import Details from "@/page/restaurant/Details";

const RestaurantDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {


  const { id } = await params;
//   const restaurantDetails = await placeDetails(id, ["*"]);
//   console.log(restaurantDetails);


  return (
    <div className="m-auto container">
        <Details placeId={id} />
    </div>
  );
};

export default RestaurantDetails;
