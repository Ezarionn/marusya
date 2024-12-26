export const URL = 'https://cinemaguide.skillbox.cc'

export interface IMovie {
  awardsSummary: string;
  backdropUrl: string;
  budget: string;
  cast: [];
  countriesOfOrigin: [];
  director: string;
  genres: string[];
  homepage: string;
  id: number;
  keywords: string[];
  language: string;
  languages: string[];
  originalTitle: string;
  plot: string;
  posterUrl: string;
  production: string;
  releaseDate: string;
  releaseYear: number;
  revenue: string;
  runtime: number;
  searchL: string;
  status: string;
  title: string;
  tmdbRating: number;
  trailerUrl: string;
  trailerYouTubeId: string;
}

export interface IRegistrationUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface IUserData {
  favorites: string[];
  surname: string;
  name: string;
  email: string;
}