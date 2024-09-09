import RestaurantCard from "../components/Card";
import SearchInput from "../components/SearchInput";
import { fetchRestaurants } from "../utils/api";
import LandingImage from "../images/landing.svg";
import { Image } from "@nextui-org/react";

interface IRestaurants {
  id: number;
  name: string;
  image: string;
  type: string;
  suburb: string;
  city: string;
}
export default async function Home() {
  const restaurants: IRestaurants[] = await fetchRestaurants();

  return (
    <div>
      <div className="flex justify-center mt-3">
        <Image className="text-center object-cover" src={LandingImage.src} loading="lazy" height={400} width={1500} alt="Landing Page Image" />
        <div className="absolute z-10 text-center top-40">
          <h3 className="font-bold text-large">Let's Find Some Halal Food</h3>
          <SearchInput />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-3 container">
          <h1 className="font-bold text-2xl p-2">Recently Added</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {restaurants.map((restaurant: IRestaurants) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
