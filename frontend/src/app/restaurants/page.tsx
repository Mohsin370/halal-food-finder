import { fetchRestaurantsListing, getRestaurantlookUps } from "../../utils/api";
import Listing from "./Listing";

const Restaurant = async ({ searchParams }: any) => {
  const params = await searchParams;
  const restaurants = await fetchRestaurantsListing(parseInt(params.cuisineType ? params.cuisineType : "0"));
  const lookups = await getRestaurantlookUps();

  return (
      <Listing restaurants={restaurants} lookups={lookups} />
  );
};

export default Restaurant;
