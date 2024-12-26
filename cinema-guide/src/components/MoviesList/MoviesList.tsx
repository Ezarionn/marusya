import { useEffect, useState } from "react";
import { IMovie } from "../../api/api";
import { useRemoveFromFavorites } from "../../hooks/useRemoveFromFavorites";
import { useAppDispatch } from "../../redux/hooks";
import { setMovie } from "../../redux/movieSlice";
import { Link } from "react-router-dom";
import './moviesList.css'

export const MoviesList = ({ type, moviesData }) => {

  const [movies, setMovies] = useState<IMovie[] | []>([])
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useAppDispatch()

  const { mutate: removeFromFavoritesMovies } = useRemoveFromFavorites();

  useEffect(() => {
    setMovies(moviesData)
  }, [moviesData]);

  const handleDeleteFavorite = (favoriteId) => {
    removeFromFavoritesMovies(favoriteId)
    setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== favoriteId));
  }

  return (
    <div className="movies-list-container">
      <ul className={type === 'profile__favorites' ? `${type}-list movies-list` : `${type}__list movies-list`}>
        {movies && movies.map((movie, index) => (
          <li key={movie.id} className={type === 'profile__favorites' ? `${type}-item movies-item` : `${type}__item movies-item`} onClick={() => dispatch(setMovie(movie))}
            onMouseEnter={type === 'profile__favorites' ? () => setHoveredIndex(index) : undefined}
            onMouseLeave={type === 'profile__favorites' ? () => setHoveredIndex(null) : undefined}
          >
            <Link to={`/movie/${movie.id}`}>
              {type === 'top-movies' &&
                <div className="top-movies__sticker">{index + 1}</div>
              }
              <img src={movie.posterUrl ? movie.posterUrl : '/no-photo-2-vert.png'} alt="" />
            </Link>
            {type === 'profile__favorites' && hoveredIndex === index && (
              <button className="profile__favorites-delete-btn" onClick={() => handleDeleteFavorite(movie.id)}>✕</button>
            )}
          </li>
        ))
        }
      </ul >
    </div>
  )

}