import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../api/MoviesApi";

export const useGetMovieById = (movieId) => {

  const query =
    useQuery({
      queryKey: ['currentMovie'],
      queryFn: () => getMovieById(movieId),
      enabled: !!movieId,
    })

  return { movie: query.data, isLoading: query.isLoading, isError: query.isError, refetch: query.refetch };
};