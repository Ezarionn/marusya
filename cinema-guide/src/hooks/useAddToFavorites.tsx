import { useMutation } from "@tanstack/react-query";
import { addMovieToFavorites } from "../api/FavoritesApi";
import { addToFavorites } from "../redux/favoritesSlice";
import { useAppDispatch } from "../redux/hooks";

export const useAddToFavorites = () => {

  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (movieId: number) => addMovieToFavorites(movieId),
    onSuccess: (data, variables) => {
      const movieId = variables;
      dispatch(addToFavorites(String(movieId)));
      console.log('Видео успешно лайкнуто!')
    },
    onError: (error) => {
      console.error('Ошибка при добавлении фильма в избранное:', error);
    },
  })

}