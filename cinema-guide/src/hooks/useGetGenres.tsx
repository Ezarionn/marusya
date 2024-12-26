import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "../api/MoviesApi";

export const useGetGenres = () => {

  const query =
    useQuery({
      queryKey: ['genres'],
      queryFn: getAllGenres,
    })

  return { genres: query.data, isLoading: query.isLoading, isError: query.isError, refetch: query.refetch };
};