import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localstorage";

interface FavoriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavourite() {
  const [favorite, setFavorite] = useLocalStorage<FavoriteCity[]>(
    "favorite",
    []
  );

  const favoriteQuery = useQuery({
    queryKey: ["favorite"],
    queryFn: () => favorite,
    initialData: favorite,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const addToFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}}`,
        addedAt: Date.now(),
      };
      const exists = favorite.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorite;
      const newFavorites = [...favorite, newFavorite].slice(0, 10);
      setFavorite(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorite"],
      });
    },
    onError: (error) => {
      // Handle error scenarios
      console.error("Error adding to history:", error);
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorite = favorite.filter((fav) => fav.id !== cityId);
      setFavorite(newFavorite);
      return newFavorite;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorite"],
      });
    },
    onError: (error) => {
      // Handle error scenarios
      console.error("Error clearing history:", error);
    },
  });

  return {
    favorites: favoriteQuery.data,
    addToFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) =>
      favorite.some((fav) => fav.lat === lat && fav.lon === lon),
  };
}
