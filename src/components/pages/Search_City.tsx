import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { useState } from "react";
import { Button } from "../ui/button";
import { CommandDialog } from "cmdk";
import { CircleX, Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useSearchLocationQuery } from "../hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "../hooks/use-search-history";
import { format } from "date-fns/format";
import { useFavourite } from "../hooks/use-favourite";
const Searchlocation = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearchLocationQuery(query);
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const { favorites } = useFavourite();
  const navigate = useNavigate();
  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    // add to history
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    setOpen(false);
  };
  return (
    <>
      <Button
        variant={"outline"}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" /> Search cities...
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-white-50 backdrop-blur-lg border border-border rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-3 sm:p-4 relative">
          <Button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2  hover:text-gray-700 text-white hover:bg-transparent"
            variant={"ghost"}
          >
            <CircleX />
          </Button>
          <CommandInput
            placeholder="Search cities..."
            value={query}
            onValueChange={setQuery}
            className="w-full"
          />
          <CommandList className="max-h-60 overflow-y-auto">
            {query.length > 0 && !isLoading && data?.length === 0 && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}

            {/* Favorites */}
            {favorites && favorites.length > 0 && (
              <CommandGroup heading="Favorites">
                {favorites.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                    className="flex items-center justify-between gap-2 hover:bg-accent rounded-md px-2 py-1"
                  >
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{location.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {location.state ? `${location.state}, ` : ""}
                        {location.country}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Search History */}
            {history && history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between px-2 py-2">
                    <p className="text-xs text-muted-foreground">
                      Recent Searches
                    </p>
                    <Button
                      onClick={() => clearHistory.mutate()}
                      variant={"ghost"}
                      className="text-xs flex items-center gap-1"
                    >
                      <XCircle className="h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                  {history.map((location) => (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                      className="flex items-center justify-between gap-2 hover:bg-accent rounded-md px-2 py-1"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{location.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {location.state ? `${location.state}, ` : ""}
                          {location.country}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(location.searchedAt, "yyyy-MM-dd")}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* Search Suggestions */}
            <CommandSeparator />
            {data && data.length > 0 && (
              <CommandGroup heading="Suggestions">
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                )}
                {data.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                    className="flex items-center gap-2 hover:bg-accent rounded-md px-2 py-1"
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="font-medium">{location.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {location.state ? `${location.state}, ` : ""}
                        {location.country}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
};

export default Searchlocation;
