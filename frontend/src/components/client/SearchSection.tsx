"use client"
import { Button, Spacer } from "@nextui-org/react";
import SearchInput from "../SearchInput";
import FilterModal from "../FilterModal";
import { useRouter } from 'next/navigation';
import React from "react";

type searchProps = {
    displaySearchbtn?: boolean
}

const SearchSection = ({displaySearchbtn =  true}:searchProps) => {
  const router = useRouter();

    return (
        <div className="flex justify-center items-center flex-wrap">
            <SearchInput />
            <Spacer x={4} />
            <div className="my-3 sm:my-0"><FilterModal/></div>
            <Spacer x={3} />
            {displaySearchbtn && <Button className="text-white bg-red-600 border-danger-800"  size="lg" variant="shadow" onPress={()=> router.push("/restaurants")}>Search</Button>} </div>
    );
};

export default SearchSection;