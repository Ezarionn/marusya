import axios from "axios";
import { URL, IMovie, IUserData } from "./api";

export const getFavoriteMovies = async (): Promise<IMovie[]> => {
  try {
    const response = await axios.get(`${URL}/favorites`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении любимых фильмов:', error);
    throw error;
  }
}

export const addMovieToFavorites = async (movieId: number): Promise<IUserData> => {
  try {
    const response = await axios.post(`${URL}/favorites`, { id: `${movieId}` }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении фильма в избранное:', error);
    throw error;
  }
}

export const removeMovieFromFavorites = async (movieId: number): Promise<void> => {
  try {
    const response = await axios.delete(`${URL}/favorites/${movieId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении фильма из избранного:', error);
    throw error;
  }
}