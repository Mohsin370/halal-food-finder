"use client";
import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import { autoComplete } from "../../utils/api";

export default function LocationInput() {
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

  const locationSelected = (item: Suggestion) => {
    //set location state, by dispatch
  };

  return (
    <div className="flex items-center">
      <Autocomplete label="Find by location" size="sm" inputValue={list.filterText} isLoading={list.isLoading} items={list.items} onInputChange={list.setFilterText}>
        {(item) => (
          <AutocompleteItem key={item.placePrediction.placeId} className="capitalize" onClickCapture={() => locationSelected(item)}>
            {item.placePrediction.text.text}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}
