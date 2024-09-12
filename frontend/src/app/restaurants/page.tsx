import SearchSection from "../../components/client/SearchSection";
import ListingCard from "../../components/ListingCard";
import { fetchRestaurants } from "../../utils/api";
import { Pagination } from "@nextui-org/react";

interface IRestaurants {
  id: number;
  name: string;
  image: string;
  type: string;
  suburb: string;
  city: string;
}

const Listings = async () => {
  const restaurants: IRestaurants[] = await fetchRestaurants();
  return (
    <div className="flex justify-center">
      <div className="p-3 container">
        <div className="text-center m-auto">
          <SearchSection displaySearchbtn={false}/>
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
