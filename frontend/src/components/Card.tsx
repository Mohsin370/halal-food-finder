import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

const ScrollCard: React.FC<{ restaurant: RestaurantT }> = ({ restaurant }) => {
  return (
    <div className="mr-3 my-3 w-[300px]">
      <Card className="py-4" isPressable={true}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-semibold text-large/6 break-words w-full whitespace-normal text-left">{restaurant.name}</h4>
          <p className="text-tiny uppercase font-semibold">{restaurant.restaurantType.name}</p>
          <small className="text-default-500">
            {restaurant.suburb}, {restaurant.city}
          </small>
        </CardHeader>
        <CardBody className="overflow-visible py-2 ">
          <Image alt="Card background" className="object-cover rounded-xl" src={restaurant.image} width={500} height={200} />
        </CardBody>
      </Card>
    </div>
  );
};

export default ScrollCard;
