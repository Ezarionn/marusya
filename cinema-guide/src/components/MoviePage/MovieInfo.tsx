import type { IMovie } from "../../api/api"
import { FC } from "react";
import './moviePage.css'

interface MovieInfoProps {
  movie: IMovie;
}

export const MovieInfo: FC<MovieInfoProps> = ({ movie }) => {

  return (
    <div className="movie-info__container">
      <h2 className="movie-info__title">О фильме</h2>
      <div className="movie-info__block">

        <ul className="movie-info__labels">
          <li className="movie-info__item">
            <span className="movie-info__item-label">Язык оригинала</span>
            <p className="movie-info__item-value">{movie.language || ''}</p>
            <div className="dot"></div>
          </li>
          <li className="movie-info__item">
            <span className="movie-info__item-label">Бюджет</span>
            <p className="movie-info__item-value">{movie.budget || ''}</p>
            <div className="dot"></div>
          </li>
          <li className="movie-info__item">
            <span className="movie-info__item-label">Выручка</span>
            <p className="movie-info__item-value">{movie.revenue || ''}</p>
            <div className="dot"></div>
          </li>
          <li className="movie-info__item">
            <span className="movie-info__item-label">Режиссёр</span>
            <p className="movie-info__item-value">{movie.director || ''}</p>
            <div className="dot"></div>
          </li>
          <li className="movie-info__item">
            <span className="movie-info__item-label">Продакшен</span>
            <p className="movie-info__item-value">{movie.production || ''}</p>
            <div className="dot"></div>
          </li>
          <li className="movie-info__item">
            <span className="movie-info__item-label">Награды</span>
            <p className="movie-info__item-value">{movie.awardsSummary || ''}</p>
            <div className="dot"></div>
          </li>
        </ul>
        <div className="movie-info__value">
          <p className="movie-info__value-p">{movie.language || ''}</p>
          <p className="movie-info__value-p">{movie.budget || ''}</p>
          <p className="movie-info__value-p">{movie.revenue || ''}</p>
          <p className="movie-info__value-p">{movie.director || ''}</p>
          <p className="movie-info__value-p">{movie.production || ''}</p>
          <p className="movie-info__value-p">{movie.awardsSummary || ''}</p>
        </div>
      </div>
    </div>
  )

}