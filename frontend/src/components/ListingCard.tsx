// components/Card.tsx

import { Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  type: string;
  suburb: string;
  city: string;
}

const ListingCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  return (
    <Card className="" isPressable={true}>
      <CardBody className="overflow-visible p-0">
        <Image alt="Card background" className="object-cover rounded-none rounded-t-xl px-0" src={restaurant.image} width={700} height={500} />
      </CardBody>
      <CardFooter className="pb-7 block text-left">
        <h4 className="font-bold text-large pl-7">{restaurant.name}</h4>
        <p className="text-tiny uppercase font-bold">{restaurant.type}</p>
        <small className="text-default-500 pl-7">
          {restaurant.suburb}, {restaurant.city}
        </small>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
