import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import Pin from "../../images/icons/pin.svg";
import { Navigation } from "lucide-react";

export default function MapPinLocation({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Popover showArrow={true}>
      <PopoverTrigger>
        <motion.img
          src={Pin.src}
          width={40}
          height={40}
          initial={{ y: -30, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.9,
            type: "tween",
            ease: "easeOut",
            duration: 1.2,
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="">
        <div className="px-1 py-2">
          <div className="">
            <Image alt="Restaurant Image" src={restaurant.image} width={250} height={200} />
          </div>
          <div className="pl-3 pr-5 w-[250]">
            <div className="text-medium font-semibold">{restaurant.name}</div>
            <div className="text-small">
              {restaurant.cuisineType.name} • {restaurant.restaurantType.name}
            </div>
            <div className="text-small"> {restaurant.halalStatus.status}</div>

            <div className="text-small text-gray-600">
              {restaurant.address}, {restaurant.postCode}
              <span
                className="flex text-blue-500 cursor-pointer"
                onClick={() => {
                  window.open("https://maps.google.com?q=" + restaurant.lat + "," + restaurant.lng);
                }}
              >
                Directions <Navigation className="pl-2" size={20} />
              </span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
