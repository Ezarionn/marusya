import { useQuery } from "@tanstack/react-query";
import { getTop10Movies } from "../api/MoviesApi";

export const useGetTopMovies = () => {

  const query =
    useQuery({
      queryKey: ['topMovies'],
      queryFn: getTop10Movies,
      refetchOnWindowFocus: false,
      staleTime: 0,
      gcTime: 0,
    })

  return { movies: query.data, isLoading: query.isLoading, isError: query.isError, isSuccess: query.isSuccess, refetch: query.refetch };
}