import ListingCard from "../../components/ListingCard";
import SearchInput from "../../components/SearchInput";
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
  console.log(restaurants);

  return (
    <div className="flex justify-center">
      <div className="p-3 container">
        <SearchInput />
        <div className="">
          {restaurants.map((restaurant: IRestaurants) => (
            <div className="mb-3">
              <ListingCard restaurant={restaurant} key={restaurant.id} />
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
