import { fetchRestaurantsListing, getRestaurantlookUps } from "../../utils/api";
import Listing from "./Listing";

const Restaurant = async ({ searchParams }: any) => {
  const params = await searchParams;

  return <Listing />;
};

export default Restaurant;
