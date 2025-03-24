import { fetchRestaurantsListing, getRestaurantlookUps } from "../../utils/api";
import Listing from "./Listing";

interface RestaurantProps {
  searchParams: { cuisineType?: string };
}

const Restaurant = async ({ searchParams }: RestaurantProps) => {
  const params = await searchParams;
  const restaurants = await fetchRestaurantsListing(parseInt(params.cuisineType?params.cuisineType:"0"));
  const lookups = await getRestaurantlookUps();

  return <Listing restaurants={restaurants} lookups={lookups} />;
};

export default Restaurant;
