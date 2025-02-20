import * as React from "react";
import RestaurantForm from "./form";

export default function Example() {
  return (
    <>
      <div className="mt-5 px-20 w-full">
        <h1 className="font-bold text-2xl  mb-10">Add Restaurant</h1>
          <RestaurantForm></RestaurantForm>
      </div>
    </>
  );
}
