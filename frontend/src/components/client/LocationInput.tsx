"use client";
import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import { autoComplete, placeDetails } from "../../utils/api";
import { setLocation } from "../../redux/features/locationSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

export default function LocationInput() {
  const dispatch = useDispatch<AppDispatch>();

  let list = useAsyncList<Suggestion>({
    async load({ signal, filterText }) {
      if (filterText && filterText.length < 10) {
        return {
          items: [],
        };
      }
      let res: AutocompleteResponse = await autoComplete(filterText ?? "", signal);
      return {
        items: res.suggestions,
      };
    },
  });

  const locationSelected = async (item: Suggestion) => {
    try {
      //find lat lng
      const selectedLocationData: PlaceDetailsResponse = await placeDetails(item.placePrediction.placeId, ["location"]);
      const { latitude, longitude } = selectedLocationData.location;
      //set location state, by dispatch
      dispatch(setLocation({ latitude, longitude }));
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div className="flex items-center">
      <Autocomplete label="Find by location" size="sm" inputValue={list.filterText} isLoading={list.isLoading} items={list.items} onInputChange={list.setFilterText}>
        {(item) => (
          <AutocompleteItem key={item.placePrediction.placeId} className="capitalize" onPress={() => locationSelected(item)}>
            {item.placePrediction.text.text}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}
