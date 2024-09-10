// components/Card.tsx

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  type: string;
  suburb: string;
  city: string;
}

const ScrollCard: React.FC<{ restaurant: Restaurant }> = ({
  restaurant,
}) => {
  return (
    <div className="mr-3 my-3">
      <Card className="py-4" isPressable={true}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{restaurant.name}</h4>
          <p className="text-tiny uppercase font-bold">{restaurant.type}</p>
          <small className="text-default-500">
            {restaurant.suburb}, {restaurant.city}
          </small>
        </CardHeader>
        <CardBody className="overflow-visible py-2 w-[300px]">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={restaurant.image}
            width={500}
            height={200}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ScrollCard;
