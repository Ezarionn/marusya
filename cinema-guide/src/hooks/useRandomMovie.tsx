import { useQuery } from "@tanstack/react-query";
import { getRandomMovie } from "../api/MoviesApi";

export const useRandomMovie = () => {

  const query =
    useQuery({
      queryKey: ['randomMovie'],
      queryFn: getRandomMovie,
      refetchOnWindowFocus: false,
    })

  return { movie: query.data, isLoading: query.isLoading, isError: query.isError, refetch: query.refetch };
};