import { useNavigate } from "react-router-dom";
import { useFavourite } from "../hooks/use-favourite";
import { ScrollArea } from "../ui/scroll-area";
import { useWeatherQuery } from "../hooks/use-weather";
import { Button } from "../ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface FavoriteCityProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavouriteCities = () => {
  const { favorites, removeFavorite } = useFavourite();

  if (!favorites.length) return null;

  return (
    <>
      <h1 className="text-xl font-bold tracking-tighter">Favourite Cities</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 flex-wrap">
          {favorites.map((city) => (
            <FavoriteCityTab
              key={city.id}
              {...city}
              onRemove={(id) => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

const FavoriteCityTab = ({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityProps) => {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  // Get weather icon URL (if available)
  const weatherIcon = weather?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    : null;

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      tabIndex={0}
      className="relative flex min-w-[250px] cursor-pointer items-center justify-between
       rounded-lg border border-border bg-card p-4 pr-8 transition-all shadow-sm hover:shadow-md"
    >
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground"
        onClick={(e) => {
          e.stopPropagation(); 
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Weather Loading State */}
      {isLoading ? (
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      ) : weather ? (
        <div className="flex items-center gap-3">
          {/* Weather Icon */}
          {weatherIcon && (
            <img
              src={weatherIcon}
              alt={weather.weather[0]?.description || "Weather Icon"}
              className="h-12 w-12"
            />
          )}

          {/* Weather Info */}
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-sm text-muted-foreground">
              {weather.weather[0]?.description}, {weather.main.temp}°C
            </span>
          </div>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">No weather data</span>
      )}
    </div>
  );
};

export default FavouriteCities;
