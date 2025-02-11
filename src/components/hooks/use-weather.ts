import { Coordinates } from "@/api/types";
import { weatherApi } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";
export const WEATHER_KEY = {
  weather: (coord: Coordinates) => ["weather", coord] as const,
  forecast: (coord: Coordinates) => ["forecast", coord] as const,
  location: (coord: Coordinates) => ["location", coord] as const,
}as const;

export const useWeatherQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEY.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
};

export const useForecastQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherApi.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
};

export const useReverseGeocodeQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
};
