import type { WeatherData } from "@/api/types";
import { useFavourite } from "../hooks/use-favourite";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavouriteButtonProps {
  data: WeatherData;
}

const Favouritebutton = ({ data }: FavouriteButtonProps) => {
  const { addToFavorite, isFavorite, removeFavorite } = useFavourite();
  const isCurrentFavorite = isFavorite(data.coord.lat, data.coord.lon);
  const handleTogglerFav = () => {
    if (isCurrentFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addToFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };
  return (
    <Button
      onClick={handleTogglerFav}
      variant={isCurrentFavorite ? "default" : "outline"}
      className={isCurrentFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star className={`h-4 w-4 ${isCurrentFavorite ? "fill-current" : ""}`} />
    </Button>
  );
};

export default Favouritebutton;
