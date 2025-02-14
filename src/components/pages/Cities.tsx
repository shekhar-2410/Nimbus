import { useParams, useSearchParams } from "react-router-dom";
import { useForecastQuery, useWeatherQuery } from "../hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle } from "lucide-react";
import Loadingskeleton from "./Loading_skeleton";
import CurrentWeather from "./CurrentWeather";
import HourlyTemp from "./HourlyTemp";
import WeatherDetails from "./WeatherDetails";
import WeatherForecast from "./WeatherForecast";
import Favouritebutton from "./Favourite-button";

function Cities() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  console.log("params", params);
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangle className="h-6 w-6" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4"></AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data ||  !params.cityname) {
    return <Loadingskeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tighter">
          {params.cityname}, {weatherQuery.data.sys.country}
        </h1>
        <div>
          {/* favorites button */}
          <Favouritebutton data={{...weatherQuery.data,name: params.cityname}}/>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col  gap-6">
          {/* current weater */}
          {weatherQuery?.data && <CurrentWeather data={weatherQuery.data} />}
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
}

export default Cities;
