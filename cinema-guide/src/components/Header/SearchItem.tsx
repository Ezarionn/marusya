import { Rating } from "../Rating/Rating"
import { formatRuntime } from "../../utils/formatRuntime"

export const SearchItem = ({ movie }) => {

  return (
    <div className="search__item-container">
      <img className="search__item-img" src={movie.posterUrl} alt={`Постер к фильму ${movie.title}`} />
      <div className="search__item-content">
        <div className="search__text-content">
          <Rating rating={movie.tmdbRating} position='search' />
          {`${movie.releaseYear} ${movie.genres.join(', ')} ${formatRuntime(movie.runtime)}`}
        </div>
        <span className="search__item-title">
          {movie.title}
        </span>
      </div>
    </div>
  )

}