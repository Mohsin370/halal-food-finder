import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { MapPinIcon } from "lucide-react";
import { RestaurantType } from "../../types/RestaurantType";
import { Image } from "@heroui/image";

export default function MapPinLocation({ restaurant }: { restaurant: RestaurantType }) {
  return (
    <Popover showArrow={true}>
      <PopoverTrigger>
        <MapPinIcon className="w-5 h-5 text-red-500 "></MapPinIcon>
      </PopoverTrigger>
      <PopoverContent className="">
        <div className="px-1 py-2 flex">
          <div className="">
            <Image alt="Restaurant Image" src={restaurant.image} width={150} height={100} />
          </div>
          <div className="pl-3 pr-5">
            <div className="text-small font-bold">{restaurant.name}</div>
            <div className="text-tiny">{restaurant.postCode}</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
