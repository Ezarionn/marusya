import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setMovie } from "../../redux/movieSlice";
import { MovieCard } from "../MovieCard/MovieCard";
import { Loader } from "../Loader/Loader";
import { useRandomMovie } from "../../hooks/useRandomMovie";

export const RandomMovie = () => {

  const { movie, isLoading, isError, refetch } = useRandomMovie();
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (movie) {
      dispatch(setMovie(movie));
    }
  }, [movie]);

  return (
    <section className="random-movie">
      <div className="random-movie__container">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div className="error-container">
            <p className="error-message">Произошла ошибка при загрузке фильма :(</p>
            <button className="error-refetch-btn" onClick={() => refetch()}>Повторить запрос</button>
          </div>
        ) : (
          <MovieCard type='random' />
        )}
      </div>
    </section>
  )

}