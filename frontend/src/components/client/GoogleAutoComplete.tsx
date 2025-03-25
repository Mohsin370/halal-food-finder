import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import React from "react";
import { autoComplete } from "../../utils/api";

type RestaurantAddressType = {
  address: string;
  suburb: string;
  country: string;
  city: string;
  lat: string;
  lng: string;
  state: string;
  postCode: string;
};

type PredictionType = {
    description: string;
    place_id: string;
};

export default function GoogleAutoComplete({ setAddress }: { setAddress: (address: RestaurantAddressType) => void }) {
    // const [selectedAddress, setSelectedAddress] = React.useState<string>("");
    const [predictions, setPredictions] = React.useState<PredictionType[]>([]);

  const animals = [
    { label: "Cat", key: "cat", description: "The second most popular pet in the world" },
    { label: "Dog", key: "dog", description: "The most popular pet in the world" },
  ];

  const onHandleInputChange = async (text: string) => {
    if (text.length < 5) {
      return; //input should have at least 5 charachters
    }
    const address = await autoComplete(text);
    if(address.status !== "OK"){
        return;
    }
    
    console.log(address);
    setPredictions([...address.predictions])
  };

  const onAddressSelect = (prediction:PredictionType) =>{
    console.log("selected Address", prediction);
  }

  return (
    <Autocomplete
      label="Find Address"
      errorMessage="Please enter a valid address"
      placeholder="Find an address"
      onInputChange={(text: string) => {
        onHandleInputChange(text);
        // setSelectedAddress(text); // Allow user to change the input field
        // list.setFilterText(text);
      }}
      defaultItems={predictions}
      //   inputValue={(text:string)=>setSelectedAddress(text)}
      //   items={list.items}
      //   isLoading={list.isLoading}
      classNames={{
        base: "text-black/50 dark:text-white/90",
      }}
      selectorIcon={<MagnifyingGlassIcon className="h-4 w-4 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
      listboxProps={{
        emptyContent: "No Address Found",
      }}
    >
      {(prediction) => <AutocompleteItem key={prediction.place_id} onPress={()=>onAddressSelect(prediction)} >{prediction.description}</AutocompleteItem>}
    </Autocomplete>
  );
}
