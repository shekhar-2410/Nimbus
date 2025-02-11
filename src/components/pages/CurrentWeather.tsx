import type { GeocodingResponse, WeatherData } from "@/api/types";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}
const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;
  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            {/* user-location */}
            <div className="space-y-2">
              <div className="flex items-end gap-1">
                <h2 className="text-2xl font-bold tracking-tight">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className=" text-sm text-muted-foreground">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>
            {/* city-temp */}
            <div className="flex items-center gap-2">
              <p className="text-4xl font-bold tracking-tight">
                {formatTemp(temp)}
              </p>
              {/* feels-like */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground ml-1">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  {/* min */}
                  <span className=" flex items-center gap-1 text-blue-500">
                    <ArrowUp className="h-4 w-4" />
                    {formatTemp(temp_min)}
                  </span>
                  {/* max */}
                  <span className=" flex items-center gap-1 text-red-500">
                    <ArrowDown className="h-4 w-4" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* humiditiy */}
              <div className="flex items-center gap-2 ">
                <Droplet className="h-4 w-4 text-blue-400" />
                <div className="space-y-1">
                  <p className=" text-sm font-medium">Humidity</p>
                  <p className=" text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              {/* wind */}
              <div className="flex items-center gap-2 ">
                <Wind className="h-4 w-4 text-blue-400" />
                <div className="space-y-1">
                  <p className=" text-sm font-medium">Wind</p>
                  <p className=" text-sm text-muted-foreground">{speed} km/h</p>
                </div>
              </div>
            </div>
          </div>
          {/* img */}
          <div className="flex flex-col justify-center">
            <div className="relative flex asept-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitilize">
                  {currentWeather.main}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
