"use client";
import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import React from "react";

export default function LocationInput() {
  return (
    <div className="flex items-center">
      <Autocomplete label="Find by location" size="sm">
        <AutocompleteItem key={"location"}>
          <div>Use My Location </div>
        </AutocompleteItem>
      </Autocomplete>
    </div>
  );
}
