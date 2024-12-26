import { useEffect, useState } from "react";
import type { IMovie } from '../../api/api';
import { MoviesList } from "../MoviesList/MoviesList";
import { Loader } from "../Loader/Loader";
import { useGetTopMovies } from "../../hooks/useGetTopMovies";

export const TopMoviesList = () => {

  const [topMovies, setMovies] = useState<IMovie[] | null>(null);

  const { movies, isLoading, isError, refetch } = useGetTopMovies()

  useEffect(() => {
    if (movies) setMovies(movies)
  }, [movies])

  return (
    <section className="top-movies">
      <div className="top-movies__container">
        <h2 className="top-movies__title">Топ 10 фильмов</h2>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div className="error-container">
            <p className="error-message">Произошла ошибка при загрузке :(</p>
            <button className="error-refetch-btn" onClick={() => refetch()}>Повторить запрос</button>
          </div>
        ) : (
          <MoviesList type='top-movies' moviesData={topMovies} />
        )}
      </div>
    </section>
  )

}