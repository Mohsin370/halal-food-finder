import Slider from "../components/Slider";
import { fetchRestaurants } from "../utils/api";
import LandingImage from "../images/landing.svg";
import { Image } from "@heroui/react";
import SearchSection from "../components/client/SearchSection";

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <div className="md:mx-3">
      <div className="flex justify-center mt-3 relative">
        <Image
          className="text-center object-cover"
          src={LandingImage.src}
          loading="lazy"
          height={400}
          width={1500}
          alt="Landing Page Image"
        />
        <div className="absolute z-10 text-center top-40">
            <h3 className="font-bold text-large">Let's Find Some Halal Food</h3>
            <SearchSection displayMapBtn={false}/>
          </div>
      </div>
      <div className="flex justify-center">
        <div className="p-3 container">
          <h1 className="font-bold text-2xl p-2">Recently Added</h1>
          <Slider items={restaurants} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-3 container">
          <h1 className="font-bold text-2xl p-2">Featured Restaurants</h1>
          <Slider items={restaurants} />
        </div>
      </div>
    </div>
  );
}
