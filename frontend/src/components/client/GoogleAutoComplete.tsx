import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import React from "react";
import { autoComplete, placeDetails } from "../../utils/api";

export default function GoogleAutoComplete({ setAddress }: { setAddress: (address: RestaurantAddressType) => void }) {
  // const [selectedAddress, setSelectedAddress] = React.useState<string>("");
  const [predictions, setPredictions] = React.useState<Suggestion[]>([]);

  const onHandleInputChange = async (text: string) => {
    if (text.length < 10) {
      return; //input should have at least 10 charachters
    }
    try {
      const address: AutocompleteResponse = await autoComplete(text);
      setPredictions([...address.suggestions]);
    } catch (e) {
      console.error("Could not auto complete, ", e);
    }
  };

  const onAddressSelect = async (prediction: Suggestion) => {
    console.log("selected Address", prediction);
    const params = ["id", "addressComponents", "displayName", "shortFormattedAddress", "location", "rating", "userRatingCount"];

    const placeDetail: PlaceDetailsResponse = await placeDetails(prediction.placePrediction.placeId, params);
    if (!placeDetail) return;

    let addressDetails: RestaurantAddressType = {
      suburb: "",
      country: "",
      address: "",
      city: "",
      postCode: "",
      lat: "",
      lng: "",
      state: "",
      placeId: "",
    };

    placeDetail.addressComponents.forEach((element: any) => {
      if (element.types.includes("locality")) {
        addressDetails.suburb = element.longText;
        addressDetails.city = element.longText;
      } else if (element.types.includes("administrative_area_level_1")) {
        addressDetails.state = element.shortText;
      } else if (element.types.includes("country")) {
        addressDetails.country = element.shortText;
      } else if (element.types.includes("postal_code")) {
        addressDetails.postCode = element.shortText;
      }
    });
    addressDetails.address = placeDetail.shortFormattedAddress;
    addressDetails.lat = placeDetail.location.latitude.toString();
    addressDetails.lng = placeDetail.location.longitude.toString();
    addressDetails.placeId = placeDetail.id;
    setAddress(addressDetails);
  };

  return (
    <Autocomplete
      label="Find Address"
      errorMessage="Please enter a valid address"
      placeholder="Find an address"
      onInputChange={(text: string) => {
        onHandleInputChange(text);
      }}
      items={predictions}
      // defaultItems={predictions}
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
      {(prediction) => (
        <AutocompleteItem key={prediction.placePrediction.placeId} onPress={() => onAddressSelect(prediction)}>
          {prediction.placePrediction.text.text}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
