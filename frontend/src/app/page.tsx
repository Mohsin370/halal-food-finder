import Slider from "../components/Slider";
import { fetchFeaturedRestaurants, fetchRcentRestaurants } from "../utils/api";
import LandingImage from "../images/landing.svg";
import { Image } from "@heroui/image";
import LocationInput from "../components/client/LocationInput";
import SliderSection from "../components/homepage/SliderSection";
import SearchSection from "../components/homepage/SearchSection";

export default async function Home() {
  return (
    <div className="md:mx-3">
      <div className="flex justify-center mt-3 relative">
        <Image
          className="text-center object-cover"
          src={LandingImage.src}
          loading="lazy"
          height={320}
          width={1500}
          alt="Landing Page Image"
        />
        <div className="absolute z-10 text-center top-20 md:top-20">
          <SearchSection />
          {/* <SearchSection displayMapBtn={false} /> */}
        </div>
      </div>
      <SliderSection />
    </div>
  );
}
