import Listing from "../page/restaurant/Listing";
import { Suspense } from "react";

const Restaurant = async () => {
  return (
    <Suspense>
      <Listing />
    </Suspense>
  );
};

export default Restaurant;
