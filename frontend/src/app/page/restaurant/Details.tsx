"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/restaurant/header";
import { fetchRestaurantById } from "../../../utils/api";
import { BadgeCheck, Navigation, Star } from "lucide-react";
import { Spinner } from "@heroui/react";
import Review from "../../../components/client/Review";

const Details = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRestaurant, setRestaurant] = useState<Restaurant | null>(null);


  useEffect(() => {
    if (id) {
      const getData = async () => {
        const res = await fetchRestaurantById(parseInt(id));
        setRestaurant(res);
      };
      setIsLoading(false);
      getData();
    }

  }, []);

  return (
    <>
      {!isLoading && selectedRestaurant?.name ? (
        <div className="m-auto container px-2 sm:my-8 my-5 w-full ">
          <div className="flex flex-wrap md:flex-nowrap ">
            <Header imageSrc={selectedRestaurant.image} cuisineType={selectedRestaurant.cuisineType.name} restaurantType={selectedRestaurant.restaurantType.name} />
            <div className="sm:ml-5 md:w-2/3 sm:mt-0 mt-3">
              <div className="flex w-full justify-between">
                <h2 className="text-xl font-bold">{selectedRestaurant.name}</h2>
                {selectedRestaurant.userRatingCount && (
                  <div className="flex items-center">
                    <p className="ml-3">{selectedRestaurant.rating}</p>
                    <div>
                      <Star fill="#FDCC0D" strokeWidth={0} size={20}></Star>
                    </div>
                    <p className="ml-1">({selectedRestaurant.userRatingCount})</p>
                  </div>
                )}
              </div>
              <div
                className="flex items-center cursor-pointer underline"
                onClick={() => {
                  window.open("https://maps.google.com?q=" + selectedRestaurant.lat + "," + selectedRestaurant.lng);
                }}
              >
                <p>{selectedRestaurant.address}</p>
                <span className=" text-blue-500">
                  <Navigation fill="oklch(62.3% 0.214 259.815)" className="pl-1" size={23} />
                </span>
              </div>

              <div className="my-3 w-fit">
                {selectedRestaurant.halalStatus.status == "Certified Halal" ? (
                  <div className="flex items-center">
                    <p>{selectedRestaurant.halalStatus.description}</p>
                    <BadgeCheck fill="oklch(62.3% 0.214 259.815)" className="ml-2 text-white " />
                  </div>
                ) : (
                  <p className="shadow-sm -mt-2 p-2 rounded-sm text-white bg-rose-600">{selectedRestaurant.halalStatus.description}</p>
                )}
              </div>
              <p className=" overflow-auto sm:h-[300px] p-2 rounded-sm bg-zinc-100 whitespace-pre-line">{selectedRestaurant.description}</p>
            </div>
          </div>
          {/* Review Section */}
          <div className="mt-8">
            <p className="text-2xl text-center">Top 5 reviews from Google</p>
            {selectedRestaurant.reviews?.map((review) => {
              return (
                  <Review key={review.id} review={review} />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center flex-grow mt-32">
          <Spinner />
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default Details;
