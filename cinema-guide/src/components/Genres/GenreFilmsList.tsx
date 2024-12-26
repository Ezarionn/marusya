import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesList } from '../MoviesList/MoviesList';
import { Loader } from '../Loader/Loader';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { useGetMoviesByFilter } from '../../hooks/useGetMoviesByFilter';
import type { IMovie } from '../../api/api';

export const GenreFilmsList = () => {

  const [movies, setMovies] = useState<IMovie[]>([])
  const [page, setPage] = useState(0)
  const [hasMoreMovies, setHasMoreMovies] = useState(true)
  const [isFirstFetch, setIsFirstFetch] = useState(true)

  const { genre } = useParams()
  const selectedGenre = genre

  const { movies: moviesByFilter, isLoading, isError, isSuccess, refetch } = useGetMoviesByFilter({ count: 10, page, genre: selectedGenre });

  useEffect(() => {
    refetch()
    if (isSuccess) {
      if (moviesByFilter && moviesByFilter !== undefined && moviesByFilter !== movies && page === 0) {
        setMovies(moviesByFilter);
        setIsFirstFetch(false)
      } else if (page > 0 && moviesByFilter) {
        if (moviesByFilter.length === 0 || moviesByFilter.length < 10) {
          setHasMoreMovies(false)
        }
        setMovies(prevState => [...prevState, ...moviesByFilter]);
      }
    }
  }, [moviesByFilter, page])

  const handleShowMore = () => {
    setPage(prevState => prevState + 1)
  }

  return (
    <section className="genre">
      <div className="genre__container">
        {selectedGenre &&
          <h2 className='genre__title genres__title'>{capitalizeFirstLetter(selectedGenre)}</h2>
        }
        {(isLoading && isFirstFetch) ? (
          <Loader />
        ) : isError ? (
          <div className="error-container">
            <p className="error-message">Произошла ошибка при загрузке :(</p>
            <button className="error-refetch-btn" onClick={() => refetch()}>Повторить запрос</button>
          </div>
        ) : (
          <>
            <MoviesList type='genre' moviesData={movies} />
            {isLoading && !isFirstFetch && (
              <Loader />
            )}
          </>
        )}
        {hasMoreMovies && (
          <button className="blue-button genre__btn " onClick={handleShowMore}>Показать еще</button>)}
      </div>
    </section>
  )

}