import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { Restaurant } from "../../types/RestaurantType";
import { Image } from "@heroui/image";
import Pin from "../../images/icons/pin.svg"

export default function MapPinLocation({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Popover showArrow={true}>
      <PopoverTrigger>
        <img src={Pin.src} width={36} height={36} />
      </PopoverTrigger>
      <PopoverContent className="">
        <div className="px-1 py-2 flex">
          <div className="">
            <Image alt="Restaurant Image" src={restaurant.image} width={150} height={100} />
          </div>
          <div className="pl-3 pr-5 w-48">
            <div className="text-medium font-semibold">{restaurant.name}</div>
            <div className="text-small">{ restaurant.cuisineType.name} • {restaurant.restaurantType.name}</div>
            <div className="text-small"> {restaurant.halalStatus.status}</div>
           
            <div className="text-small text-gray-600">{ restaurant.address}, {restaurant.postCode}</div>

          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
