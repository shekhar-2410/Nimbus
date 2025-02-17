import type { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind_speed: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  date: string;
}
const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecast = data.list.reduce((acc, item) => {
    const date = format(new Date(item.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        weather: item.weather[0],
        date: item.dt_txt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
      acc[date].humidity = Math.max(acc[date].humidity, item.main.humidity);
      acc[date].wind_speed = Math.max(acc[date].wind_speed, item.wind.speed);
      acc[date].weather = item.weather[0];
      acc[date].date = item.dt_txt;
    }
    return acc;
  }, {} as Record<string, DailyForecast>);
  const nextDays = Object.values(dailyForecast).slice(0, 6);
  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-3 sm:px-6 sm:py-4">
        <div className="grid gap-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="rounded-lg border p-4 shadow-sm bg-background"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 sm:gap-6">
                {/* Date & Weather Description */}
                <div className="text-center sm:text-left">
                  <p className="font-medium">
                    {format(new Date(day.date), "dd MMMM yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>

                {/* Min & Max Temperature (Together) */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>

                {/* Humidity & Wind Speed (Together) */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  <span className="flex items-center text-blue-500">
                    <Droplet className="h-4 w-4 mr-1" />
                    {day.humidity}%
                  </span>
                  <span className="flex items-center">
                    <Wind className="h-4 w-4 mr-1" />
                    {day.wind_speed} km/h
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
