import { useQuery } from "@tanstack/react-query";
import { getFavoriteMovies } from "../api/FavoritesApi";

export const useGetFavoritesList = () => {

  const query =
    useQuery({
      queryKey: ['favoritesList'],
      queryFn: getFavoriteMovies,
    })

  return { movie: query.data, isLoading: query.isLoading, isError: query.isError, refetch: query.refetch };
};