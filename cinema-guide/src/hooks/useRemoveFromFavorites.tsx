import { useMutation } from "@tanstack/react-query";
import { removeMovieFromFavorites } from "../api/FavoritesApi";
import { removeFromFavorites } from "../redux/favoritesSlice";
import { useAppDispatch } from "../redux/hooks";

export const useRemoveFromFavorites = () => {

  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (movieId: number) => removeMovieFromFavorites(movieId),
    onSuccess: (data, variables) => {
      const movieId = variables;
      dispatch(removeFromFavorites(String(movieId)));
      console.log('Видео успешно дизлайкнуто!')
    },
    onError: (error) => {
      console.error('Ошибка при удалении фильма из избранного:', error);
    },
  })

}