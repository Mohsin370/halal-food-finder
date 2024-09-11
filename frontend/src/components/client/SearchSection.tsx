"use client"
import { Button, Spacer } from "@nextui-org/react";
import SearchInput from "../SearchInput";
import FilterModal from "../FilterModal";
import { useRouter } from 'next/navigation';

const SearchSection: React.FC = () => {
  const router = useRouter();

    return (
        <div className="flex justify-center items-center flex-wrap">
            <SearchInput />
            <Spacer x={4} />
            <FilterModal/>
            <Spacer x={3} />
            <Button className="text-white bg-red-600 border-danger-800"  size="lg" variant="shadow" onPress={()=> router.push("/restaurants")}>Search</Button>
        </div>
    );
};

export default SearchSection;