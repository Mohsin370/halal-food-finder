"use client";

import React from "react";
import { Autocomplete, AutocompleteItem, Input } from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { autoCompleteAddress } from "../../utils/api";
import { useAsyncList } from "@react-stately/data";
import { FeatureCollection, Feature } from "geojson";

type RestaurantAddressType = {
  address: string;
  suburb: string;
  country: string;
  city: string;
  lat: string;
  lng: string;
  state: string;
  postcode: string;

};

export default function AddressSearch({ setAddress }: { setAddress: (address: RestaurantAddressType) => void }) {
  const [selectedAddress, setSelectedAddress] = React.useState<string>("");

  let list = useAsyncList<Feature, Boolean>({
    async load({ filterText }) {
      if (filterText === undefined || filterText === "" || filterText.length < 2) {
        return {
          items: [],
        };
      }
      let addresses: FeatureCollection = await autoCompleteAddress(filterText, "address");
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
    }

    return <div>{res}</div>;
  };
  const setAddressState = (selection: Feature) => {
    const { properties } = selection;
    console.log(properties);

    if (!properties) return;
    setAddress({
      address: properties.address,
      country: properties.context.country.country_code,
      city: properties.context.place.name,
      state: properties.context.region.region_code,
      lat: properties.coordinates.latitude,
      suburb: properties.context.locality.name,
      postcode: properties.context.postcode.name,
      lng: properties.coordinates.longitude,
    });
    list.setFilterText(properties.full_address);
    setSelectedAddress(properties.full_address);
  };
  return (
    <Autocomplete
      label="Find Address"
      isRequired
      errorMessage="Please enter a valid address"
      placeholder="Find an address"
      onInputChange={(text: string) => {
        setSelectedAddress(text); // Allow user to change the input field
        list.setFilterText(text);
      }}
      inputValue={selectedAddress || list.filterText}
      items={list.items}
      isLoading={list.isLoading}
      classNames={{
        base: "text-black/50 dark:text-white/90",
      }}
      selectorIcon={<MagnifyingGlassIcon className="h-4 w-4 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
      listboxProps={{
        emptyContent: "No Address Found",
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.properties?.mapbox_id} textValue={selectedAddress} onPress={() => setAddressState(item)}>
          {processLocationname(item)}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
