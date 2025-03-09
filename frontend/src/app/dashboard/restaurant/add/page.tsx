import * as React from "react";
import RestaurantForm from "./form";

export default function AddRestaurant() {
  return (
    <div className="mx-auto w-full overflow-auto">
      <div className="mt-5 sm:mt-20 px-20 w-full ">
        <h1 className="font-bold text-2xl mb-10 text-center">Add Restaurant</h1>
        <RestaurantForm></RestaurantForm>
      </div>
    </div>
  );
}
