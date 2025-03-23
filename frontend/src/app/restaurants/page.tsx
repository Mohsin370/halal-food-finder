// import ListingCard from "../../components/ListingCard";
import { fetchRestaurantsListing, getRestaurantlookUps, LookUpType } from "../../utils/api";
import Listing from "./Listing";

const Restaurant = async () => {
  const restaurants: RestaurantT[] = await fetchRestaurantsListing();
  const lookups: LookUpType = await getRestaurantlookUps();

  return <Listing restaurants={restaurants} lookups={lookups} />;
};

export default Restaurant;
