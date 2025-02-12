import type { WeatherData } from "@/api/types";
import { Sunrise, Sunset, Gauge, Compass } from "lucide-react";
import { format } from "date-fns";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;
  const formatTime = (timeStamp: number) => {
    return format(new Date(timeStamp * 1000), "h:mm a");
  };
  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((deg / 45) % 8);
    return directions[index];
  };
  const detailes = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset ,
      color: "text-yellow-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass ,
      color: "text-sky-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge ,
      color: "text-purple-500",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 mt-2">
            {detailes.map((detail) => (
              <div
                key={detail.title}
                className="flex items-center gap-3 rounded-lg border p-4"
              >
                <detail.icon className={detail.color}/>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {detail.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default WeatherDetails;
