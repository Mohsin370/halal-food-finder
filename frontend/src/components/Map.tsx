"use client";
import React, { useState } from "react";
import { Marker, Map as RestaurantsMap, ViewState } from "react-map-gl";
import { Logo } from "../images/logo";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function Map() {
  const [viewState, setViewState] = useState({
    longitude: 138.59,
    latitude: -34.92,
    zoom: 12,
  });

  return (
    <div className="w-full h-[60vh]">
      <RestaurantsMap mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN} {...viewState} onMove={(evt) => setViewState(evt.viewState)} mapStyle="mapbox://styles/mapbox/streets-v12">
        <Marker longitude={138.59} latitude={-34.92} anchor="bottom">
          {/* <MapPinIcon className="h-10 w-10  text-red-600"/> */}
          <div className="bg-red-600  border-hite border-3 w-5 h-5 rounded-full"></div>
        </Marker>
      </RestaurantsMap>
    </div>
  );
}
