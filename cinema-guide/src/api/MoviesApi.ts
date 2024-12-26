import axios from "axios";
import type { IMovie } from "./api";
import { URL } from "./api";

export const getRandomMovie = async (): Promise<IMovie> => {
  try {
    const response = await axios.get(`${URL}/movie/random`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении случайного фильма:', error);
    throw error;
  }
};

export const getTop10Movies = async (): Promise<IMovie[]> => {
  try {
    const response = await axios.get(`${URL}/movie/top10`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error);
    throw error;
  }
};

export const getMovieById = async (movieId): Promise<IMovie> => {
  try {
    const response = await axios.get(`${URL}/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении фильма по ID: ', error);
    throw error;
  }
}

export const getMoviesByFilter = async ({ count, genre, page, title }: {
  count?: number;
  genre?: string;
  page?: number;
  title?: string;
} = {}): Promise<IMovie[]> => {

  const params = new URLSearchParams();

  if (count !== undefined) params.append('count', count.toString());
  if (page !== undefined) params.append('page', page.toString());
  if (title) params.append('title', title);
  if (genre) params.append('genre', genre);

  try {
    const response = await axios.get(`${URL}/movie?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error);
    throw error;
  }
};

export const getAllGenres = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${URL}/movie/genres`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении жанров:', error);
    throw error;
  }
}

