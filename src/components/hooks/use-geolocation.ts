import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface UseGeolocation {
  coordinates: Coordinates | null;
  isLoading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<UseGeolocation>({
    coordinates: null,
    isLoading: false,
    error: null,
  });
  const getLocation = async () => {
    setCoordinates((prev) => ({ ...prev, isLoading: true, error: null }));
    if (!navigator.geolocation) {
      setCoordinates({
        coordinates: null,
        isLoading: false,
        error: "Geolocation is not supported by this browser.",
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;

          default:
            errorMessage = "An unknown error occurred.";
        }
        setCoordinates({
          coordinates: null,
          isLoading: false,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...coordinates,
    getLocation,
  };
}
