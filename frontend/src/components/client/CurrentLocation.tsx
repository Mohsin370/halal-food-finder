"use client";
import React from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/features/locationSlice";

export default function CurrentLocation() {
  const dispatch = useDispatch<AppDispatch>();

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          dispatch(setLocation({ latitude, longitude }));
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
        Find nearby
      </p>
    </div>
  );
}
