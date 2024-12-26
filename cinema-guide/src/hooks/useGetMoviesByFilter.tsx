import { useQuery } from "@tanstack/react-query";
import { getMoviesByFilter } from "../api/MoviesApi";

export const useGetMoviesByFilter = (filterParams) => {

  const query =
    useQuery({
      queryKey: ['filteredMovies', filterParams],
      queryFn: () => getMoviesByFilter(filterParams),
      enabled: false,
      refetchOnWindowFocus: false,
    })

  return { movies: query.data, isLoading: query.isLoading, isError: query.isError, isSuccess: query.isSuccess, refetch: query.refetch };
};