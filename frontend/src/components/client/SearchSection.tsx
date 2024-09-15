"use client";
import { Button, Spacer } from "@nextui-org/react";
import SearchInput from "../SearchInput";
import FilterModal from "../FilterModal";
import { useRouter } from "next/navigation";
import React from "react";
import { MapIcon } from "@heroicons/react/24/outline";

type searchProps = {
  displaySearchbtn?: boolean;
  displayMapBtn?: boolean;
};

const SearchSection = ({ displaySearchbtn = true, displayMapBtn = true }: searchProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center flex-wrap">
      <SearchInput />
      <Spacer x={4} />
      <div className="my-3 sm:my-0">
        <FilterModal />
      </div>
      <Spacer x={3} />
      {displayMapBtn && (
        <Button size="lg" className="mr-3 bg-red-600 text-white  border-danger-800" onPress={() => router.push("/mapView")}>
          <MapIcon className="h-5 w-5"></MapIcon>Map
        </Button>
      )}{" "}
      {displaySearchbtn && (
        <Button className="text-white bg-red-600 border-danger-800" size="lg" variant="shadow" onPress={() => router.push("/restaurants")}>
          Search
        </Button>
      )}
    </div>
  );
};

export default SearchSection;
