"use client"
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setSelected } from "../redux/features/restaurantSlice";

const ScrollCard: React.FC<{ restaurant: RestaurantT}> = ({ restaurant }) => {
  const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
  

  const selectRestaurantHandler = () =>{
    const payload = {
      name: restaurant.name,
      image: restaurant.image,
      cuisineType: restaurant.cuisineType.name,
      restaurantType: restaurant.restaurantType.name,
    }
    dispatch(setSelected(payload));
    router.push(`restaurants/${restaurant.placeId}`);
  }

  return (
    <div className="my-3">
      <Card className="pb-4 flex shadow-none" isPressable={true} onPress={selectRestaurantHandler}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-semibold truncate w-[290px] text-left">
            {restaurant.name}
          </h4>
          <p className="text-tiny uppercase font-semibold">
            {restaurant.restaurantType.name} , {restaurant.cuisineType.name}
          </p>

          <div className="flex justify-between w-full">
            <small className="text-default-500">{restaurant.suburb}</small>
            <div className="flex justify-content-center items-center">
              <div><small>{restaurant.rating}  </small></div>
              <div><Star  fill="#FDCC0D" strokeWidth={0} size={15}></Star></div>
              <div><small  className="text-default-500"> ({restaurant.userRatingCount})</small></div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2 text-end ">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={restaurant.image}
            width={300}
            height={170}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ScrollCard;
