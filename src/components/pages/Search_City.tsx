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
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
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
        className="fixed inset-0 flex items-center justify-center"
      >
        <div className="border-b bg-background/95 backdrop-blur py-2 w-96 relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
          <CommandInput
            placeholder="Search cities..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.length > 0 && !isLoading && data?.length === 0 && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}

            {/* favorites */}
            {favorites && favorites.length > 0 && (
              <CommandGroup heading="Favorites">
               
                {favorites.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                    className="flex items-center justify-between gap-2"
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
            {/* serch history */}
            {history && history.length > 0 && (
              <>
                <CommandSeparator />

                <CommandGroup>
                  <div className="flex items-center justify-between px-2 py-2">
                    <p className="text-xs text-muted-foreground">
                      Recent Searches
                    </p>
                    <Button
                      onClick={() => {
                        clearHistory.mutate();
                      }}
                      variant={"ghost"}
                      className="text-xs "
                    >
                      <XCircle className=" h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                  {history.map((location) => (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                      className="flex items-center justify-between gap-2"
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

            {/*  search city*/}
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
                    className="flex items-center gap-2"
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
