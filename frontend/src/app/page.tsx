import Slider from "../components/Slider";
import { fetchFeaturedRestaurants, fetchRcentRestaurants } from "../utils/api";
import LandingImage from "../images/landing.svg";
import { Image } from "@heroui/image";
import SliderSection from "../components/homepage/SliderSection";
import SearchSection from "../components/homepage/SearchSection";

export default async function Home() {
  return (
    <div className="md:mx-3">
      <div className="flex justify-center mt-3 relative">
        <Image className="text-center object-cover" src={LandingImage.src}  height={320} width={1500} alt="Landing Page Image" />
        <div className="absolute z-10 text-center top-20 md:top-20">
          <SearchSection />
          {/* <SearchSection displayMapBtn={false} /> */}
        </div>
      </div>
      <SliderSection />
      <div className="container m-auto p-6 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-center">Why Halal Findr?</h2>
        <div className="text-lg">
          <p>
            Welcome to Halal Findr! Looking for delicious halal food in Adelaide? You’re in the right place, mate! Halal Findr is your go-to guide for discovering restaurants that serve halal food.
            Whether you're after fully halal menus or places with halal-friendly options, we've got you covered—authenticity guaranteed!
          </p>
          <p className="pt-2 font-semibold">Here’s what you can do on our site:</p>
          <ul className="py-2">
            <li>📍 Find restaurants by location</li>
            <li>🗺️ Explore places on an interactive map</li>
            <li>🌟 Discover top-rated halal spots</li>
            <li>🍽️ Filter by cuisine to match your cravings</li>
          </ul>
          <p>We’re all about helping you discover the best halal eats around Adelaide. So go ahead, explore the site and find your next favorite place. Have fun, mates!</p>
        </div>
      </div>
    </div>
  );
}
