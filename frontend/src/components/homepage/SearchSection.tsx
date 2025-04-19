"use client";
import React from "react";
import LocationInput from "../client/LocationInput";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const SearchSection: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <h3 className="font-bold text-large">Let's Find Some Halal Food</h3>
      <div className="flex mt-3 ml-3 justify-content-center">
        <LocationInput />
        <Button
          className="text-white bg-red-600 ml-5"
          size="lg"
          variant="shadow"
          onPress={()=> router.push('/restaurants')}
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default SearchSection;
