"use client";
import React from "react";

export default function CurrentLocation() {
  const [userLocation, setUserLocation] = React.useState({
    longitude: 138.59,
    latitude: -34.92,
  });

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          console.log(coords);
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
    <div>
      <p className="text-sm pointer cursor-pointer" onClick={getUserLocation}>
        Use my location
      </p>
    </div>
  );
}
