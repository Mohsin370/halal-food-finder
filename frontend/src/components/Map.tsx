"use client";
import React, { useState, useEffect } from "react";
import { Marker, Map as RestaurantsMap } from "react-map-gl/mapbox";
import { fetchRestaurantMapPins } from "../utils/api";
import { Restaurant } from "../types/RestaurantType";
import MapPinLocation from "./client/Popover";

export default function Map() {
  const [initialViewState, setInitialViewState] = useState({
    longitude: 138.59,
    latitude: -34.92,
    zoom: 12,
  });

  const [restaurantPins, setRestaurantPins] = useState<any>([]);

  const [userLocation, setUserLocation] = useState({
    longitude: 138.59,
    latitude: -34.92,
  });

  useEffect(() => {
    //get Restaurant to PIN
    const restaurants = fetchRestaurantMapPins();
    restaurants.then((res: Restaurant) => {
      setRestaurantPins(res);
      console.log(res);
    });

    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setInitialViewState({
            longitude,
            latitude,
            zoom: 12,
          });

          setUserLocation({
            longitude,
            latitude,
          });
          console.log(coords);
        },
        (error) => {
          setInitialViewState({
            longitude: 133.275,
            latitude: -26.8533,
            zoom: 4,
          });
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    } else {
      setInitialViewState({
        longitude: 25,
        latitude: 135,
        zoom: 12,
      });
    }
  }, []);

  return (
    <div className="w-full h-[90vh]">
      <RestaurantsMap
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        {...initialViewState}
        onMove={(evt) => setInitialViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} anchor="bottom">
          <div className="relative">
            <div
              className="bg-red-600 shadow-[0_0_0_1px_black] border-white border-2 w-4 h-4 rounded-full hover:scale-125 cursor-pointer 
            before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:rounded-full 
            before:bg-red-600 before:opacity-50 before:animate-ping"
            ></div>
          </div>

          {/* <div className="bg-red-600 shadow-[0_0_0_3px_black] border-hite border-3 w-6 h-6 rounded-full hover:scale-125 hover:cursor-pointer"></div> */}
        </Marker>
        {restaurantPins?.map((res: Restaurant) => {
          return (
            <Marker key={res.id} longitude={parseFloat(res.lng)} latitude={parseFloat(res.lat)} anchor="bottom" className="cursor-pointer">
              <MapPinLocation restaurant={res} />
            </Marker>
          );
        })}
      </RestaurantsMap>
    </div>
  );
}
