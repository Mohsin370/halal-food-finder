"use client";
import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import React from "react";

export default function LocationInput() {
  const [userLocation, setUserLocation] = React.useState({
    longitude: 138.59,
    latitude: -34.92,
  });

  const getUserLocation = () => {
    console.log;("hello")
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
            console.log(coords)
          setUserLocation({
            latitude,
            longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    }
  };

  return (
    <div className="flex items-center ">
      <Autocomplete label="Find by location" size="sm">
        <AutocompleteItem key={"location"} onPress={getUserLocation}>
          <div>Use My Location </div>
        </AutocompleteItem>
      </Autocomplete>
      <p className="ml-5 text-sm pointer">Use my location</p>
    </div>
  );
}
