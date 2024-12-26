import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { MovieInfo } from "../MoviePage/MovieInfo"
import { Rating } from '../Rating/Rating'
import { Loader } from "../Loader/Loader"
import { formatRuntime } from '../../utils/formatRuntime'
import { selectFavoritesId } from "../../redux/favoritesSlice"
import { setMovie, selectMovie } from "../../redux/movieSlice"
import { openModal } from "../../redux/modalSlice"
import { selectUser } from "../../redux/authSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useRandomMovie } from "../../hooks/useRandomMovie";
import { useAddToFavorites } from "../../hooks/useAddToFavorites"
import { useRemoveFromFavorites } from "../../hooks/useRemoveFromFavorites"
import { useGetMovieById } from "../../hooks/useGetMovieById"
import { LikeIcon } from "../../assets/icons/like"
import { ShuffleIcon } from "../../assets/icons/shuffle"
import './MovieCard.css'

export const MovieCard = ({ type }) => {

  const dispatch = useAppDispatch()
  const movie = useAppSelector(selectMovie)
  const currentUser = useAppSelector(selectUser)
  const favoritesId = useAppSelector(selectFavoritesId)
  const sectionType = `${type}-movie`
  const { refetch: refetchRandomMovie } = useRandomMovie();
  const { mutate: addToFavorites } = useAddToFavorites();
  const { mutate: removeFromFavorites } = useRemoveFromFavorites();
  const params = useParams()
  const { movie: apiMovie, isLoading, isError, refetch: refetchMovieById } = useGetMovieById(params.movieId)

  const handleFetchRandomMovie = () => {
    refetchRandomMovie();
  };

  useEffect(() => {
    if (!movie && apiMovie && type === 'about') {
      dispatch(setMovie(apiMovie));
    }
  }, [movie, apiMovie, dispatch]);

  useEffect(() => {
    localStorage.setItem('favoritesId', JSON.stringify(favoritesId))
  }, [favoritesId])

  const handleFavoritesToggle = async (movieId: number) => {
    if (currentUser) {
      if (movie) {
        const isMovieFavorite = favoritesId.includes(String(movie.id));
        if (isMovieFavorite) {
          await removeFromFavorites(movieId)
        } else {
          await addToFavorites(movieId)
        }
      }
    } else {
      dispatch(openModal('auth'))
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div className="error-container">
      <p className="error-message">Произошла ошибка при загрузке :(</p>
      <button className="error-refetch-btn" onClick={() => refetchMovieById()}>Повторить запрос</button>
    </div>
  }

  return (
    <>
      {movie && (
        <>
          <div className={`${sectionType}__card movie-card`}>
            <div className={`${sectionType}__movie-details movie-details`}>
              <div className={`${sectionType}__info movie-info`}>
                <Rating rating={movie.tmdbRating} position='card' /> {movie.releaseYear} {movie.genres.join(', ')} {formatRuntime(movie.runtime)}
              </div>
              <div className={`${sectionType}__title movie-title`}>{movie.title}</div>
              <div className={`${sectionType}__descr movie-descr`}>{movie.plot}</div>
              <div className={`${sectionType}__buttons-container`}>
                <button className={`${sectionType}__trailer-btn blue-button`} onClick={() => dispatch(openModal('trailer'))}>Трейлер</button>
                {type === 'random' &&
                  <button className={`${sectionType}__about-btn card-about-button dark-button`}><Link to={`/movie/${movie.id}`}>О фильме</Link></button>
                }
                <button className={`${sectionType}__favorites-btn card-small-button dark-button`} onClick={() => handleFavoritesToggle(movie.id)}>
                  <LikeIcon fill={favoritesId.includes(String(movie.id)) ? '#B4A9FF' : '#FFFFFF'} />
                </button>
                {type === 'random' &&
                  <button className={`${sectionType}__random-btn card-small-button dark-button`} onClick={handleFetchRandomMovie}>
                    <ShuffleIcon fill='#FFFFFF' />
                  </button>
                }
              </div>
            </div>
            <div className="movie-img-container">
              <img className={`${sectionType}__movie-img movie-img`} src={movie.backdropUrl || '/no-photo-2.png'} alt={`Кадр из фильма ${movie.title}`} />
            </div>
          </div>
          {type === 'about' && <MovieInfo movie={movie} />}
        </>
      )}
    </>
  )

}

