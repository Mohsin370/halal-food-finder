"use client";
import { Button, Card, CardFooter } from "@heroui/react";
import Image from "next/image";
import React from "react";

const DetailsHeader = ({ imageSrc, cuisineType, restaurantType }: { imageSrc: string; cuisineType: string; restaurantType: string }) => {
  return (
    <Card isFooterBlurred className="border-none max-w-[700px] max-h-[400px] object-contain" radius="md">
      <Image alt="Woman listing to music" src={imageSrc} className="object-cover h-dvh  rounded-xl" width={700} height={500} />
      <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="flex justify-between w-full items-center">
          <div className="text-tiny text-white bg-black/20 py-3 px-4 rounded-xl">{cuisineType} Cuisine.</div>
          <div className="text-tiny text-white bg-black/20 py-3 px-4 rounded-xl " color="default">
            {restaurantType}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DetailsHeader;
