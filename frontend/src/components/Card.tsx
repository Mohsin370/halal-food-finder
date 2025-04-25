"use client";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

const ScrollCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  const router = useRouter();

  const selectRestaurantHandler = () => {
    router.push(`restaurants/${restaurant.id}`);
  };

  return (
    <div className="my-3 w-full">
      <Card className="pb-4 sm:w-full" isPressable={true} onPress={selectRestaurantHandler}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-semibold truncate text-left text-sm w-36 sm:w-full">{restaurant.name}</h4>
          <div className="sm:flex text-xs text-left">
            <span className="text-tiny uppercase font-semibold truncate">{restaurant.restaurantType.name}</span>
            <br/>
            <span className=" hidden sm:block">,</span>
            <span className="text-tiny uppercase font-semibold truncate sm:pl-1">{restaurant.cuisineType.name}</span>
          </div>

          <div className="flex justify-between w-full">
            <small className="text-default-500">{restaurant.suburb}</small>
            {restaurant.userRatingCount > 0 && (
              <div className="flex justify-content-center items-center">
                <div>
                  <small>{restaurant.rating} </small>
                </div>
                <div>
                  <Star fill="#FDCC0D" strokeWidth={0} size={15}></Star>
                </div>
                <div>
                  <small className="text-default-500"> ({restaurant.userRatingCount})</small>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2 text-end">
          <Image alt="Card background" className="object-cover rounded-xl w-96 h-[100px] sm:h-[170px]" src={restaurant.image} />
        </CardBody>
      </Card>
    </div>
  );
};

export default ScrollCard;
