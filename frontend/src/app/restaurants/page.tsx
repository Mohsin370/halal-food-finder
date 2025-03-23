import ListingItem from "../../components/Card";
import SearchSection from "../../components/client/SearchSection";
// import ListingCard from "../../components/ListingCard";
import { fetchRestaurantsListing, getRestaurantlookUps, LookUpType } from "../../utils/api";
import { Pagination } from "@heroui/pagination";



const Listings = async () => {
  const restaurants: RestaurantT[] = await fetchRestaurantsListing();
  const lookups = await getRestaurantlookUps();
  
  return (
    <div className="flex justify-center">
      <div className="p-3 container">
        <div className="text-center m-auto">
          <SearchSection displaySearchbtn={false}/>
        </div>
        <div className="flex flex-wrap my-2 justify-center cursor-pointer">
          {lookups?.cuisineType.map((el)=>{
              return(
                <div className="px-3" key={el.id}>{el.name}</div>
              )
          })}
        </div>
        <div className="flex flex-wrap justify-center">
          {restaurants.map((restaurant: RestaurantT) => (
            <div className="mb-3" key={restaurant.id}>
              <ListingItem restaurant={restaurant} />
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
