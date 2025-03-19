import SearchSection from "../../components/client/SearchSection";
import ListingCard from "../../components/ListingCard";
import { fetchRestaurantsListing, getRestaurantlookUps, LookUpType } from "../../utils/api";
import { Pagination } from "@heroui/react";

interface IRestaurants {
  id: number;
  name: string;
  image: string;
  type: string;
  suburb: string;
  city: string;
}

const Listings = async () => {
  const restaurants: IRestaurants[] = await fetchRestaurantsListing();
  const lookups = await getRestaurantlookUps();
  
  return (
    <div className="flex justify-center">
      <div className="p-3 container">
        <div className="text-center m-auto">
          <SearchSection displaySearchbtn={false}/>
        </div>
        <div className="flex my-2 justify-center">
          {lookups?.cuisineType.map((el)=>{
              return(
                <div className="px-3">{el.name}</div>
              )
          })}
        </div>
        <div className="">
          {restaurants.map((restaurant: IRestaurants) => (
            <div className="mb-3" key={restaurant.id}>
              <ListingCard restaurant={restaurant}/>
            </div>
          ))}
        </div>
     
        <div className="flex justify-center m-7">
          <Pagination showControls total={10} initialPage={1} />
        </div>
      </div>
    </div>
  );
};

export default Listings;
