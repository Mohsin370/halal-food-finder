import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

const ScrollCard: React.FC<{ restaurant: RestaurantT }> = ({ restaurant }) => {
  return (
    <div className="mr-3 my-3 w-[350px]">
      <Card className="pb-4 flex" isPressable={true}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-semibold truncate w-[290px] text-left">{restaurant.name}</h4>
          <p className="text-tiny uppercase font-semibold">{restaurant.restaurantType.name} , {restaurant.cuisineType.name}</p>
          <small className="text-default-500">
            {restaurant.suburb}, {restaurant.city}
          </small>
        </CardHeader>
        <CardBody className="overflow-visible py-2 text-end ">
          <Image alt="Card background" className="object-cover rounded-xl" src={restaurant.image} width={300} height={170} />
        </CardBody>
      </Card>
    </div>
  );
};

export default ScrollCard;
