import React from "react";
import { Button } from "../ui/button";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { useGeolocation } from "../hooks/use-geolocation";
import Loadingskeleton from "./Loading_skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "../hooks/use-weather";
import CurrentWeather from "./CurrentWeather";
import HourlyTemp from "./HourlyTemp";
import WeatherDetails from "./WeatherDetails";
import WeatherForecast from "./WeatherForecast";
import FavouriteCities from "./FavouriteCities";
const WeatherDashboard = () => {
  const { coordinates, isLoading, error, getLocation } = useGeolocation();
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const reverseGeocodeQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      reverseGeocodeQuery.refetch();
    }
  };
  // loading
  if (isLoading) {
    return React.createElement(Loadingskeleton);
  }
  // error
  if (error) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-6 w-6" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> {error}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  // coordinates
  if (!coordinates) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location to use this app</p>
          <Button
            onClick={getLocation}
            variant={"outline"}
            className="w-fit"
            disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = reverseGeocodeQuery.data?.[0];
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-6 w-6" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> {error}</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <Loadingskeleton />;
  }

  return (
    <div className="space-y-4">
      {/* favoritecities */}
      <FavouriteCities />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tighter">My Location</h1>
        <Button onClick={handleRefresh} variant={"outline"} size={"icon"}>
          <RefreshCcw
            className={` h-4 w-4 
              ${weatherQuery.isFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* current weater */}
          {weatherQuery?.data && (
            <CurrentWeather
              data={weatherQuery.data}
              locationName={locationName}
            />
          )}
          {/* housr temaperatures */}
          {forecastQuery?.data && <HourlyTemp data={forecastQuery?.data} />}
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          {weatherQuery?.data && <WeatherDetails data={weatherQuery?.data} />}

          {/* forecast */}
          {forecastQuery?.data && (
            <WeatherForecast data={forecastQuery?.data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
