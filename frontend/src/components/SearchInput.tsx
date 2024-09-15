import React from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { autoCompleteAddress } from "../utils/api";
import { useAsyncList } from "@react-stately/data";
import { FeatureCollection, Feature } from "geojson";

export default function SearchInput() {

  let list = useAsyncList<Feature>({
    async load({ filterText }) {
      if (
        filterText === undefined ||
        filterText === "" ||
        filterText.length < 2
      ) {
        return {
          items: [],
        };
      }
      let addresses: FeatureCollection = await autoCompleteAddress(filterText);
      return {
        items: addresses.features || [],
      };
    },
  });

  const processLocationname = (item: Feature) => {
    let res: string = "";
    let { properties } = item;
    if (!properties) return <div>No data</div>;

    switch (properties.feature_type) {
      case "address": {
        res = properties.full_address;
        break;
      }
      case "poi":
        case "postcode": {
        res = properties.name + ", "+ properties.place_formatted;
        break;
      }
      case "place":
      case "locality":
      case "street": {
        res = properties.name + ", " + properties.place_formatted;
        break;
      }
    }

    return <div>{res}</div>;
  };

  return (
    <div className="w-[360px] m-auto my-3 rounded-xl flex justify-center items-center  shadow-lg  text-white">
      <Autocomplete
        label="Find restaurants"
        placeholder="Search an address"
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
        items={list.items}
        isLoading={list.isLoading}
        classNames={{
          base: "text-black/50 dark:text-white/90",
        }}
        selectorIcon={
          <MagnifyingGlassIcon className="h-4 w-4 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        listboxProps={{
          emptyContent: "No Address Found",
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.properties?.mapbox_id}>
            {processLocationname(item)}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}
