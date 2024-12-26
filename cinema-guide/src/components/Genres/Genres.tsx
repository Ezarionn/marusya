import { Link } from 'react-router-dom'
import { useGetGenres } from '../../hooks/useGetGenres'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import './genres.css'

const genreImages = {
  comedy: './comedy.jpg',
  drama: './drama.jpg',
  crime: './crime.jpg',
  family: './family.jpg',
  history: './history.jpg',
  thriller: './thriller.jpg',
  fantasy: './fantasy.jpg',
  adventure: './adventure.jpg'
};

const getImageSrc = (genre) => {
  return genreImages[genre] || './no-photo-1.png';
};

export const Genres = () => {

  const { genres } = useGetGenres();

  return (
    <section className="genres">
      <div className="genres__container">
        <h2 className='genres__title'>Жанры фильмов</h2>
        <ul className="genres__list">
          {genres && genres.map(genre => {
            const imageSrc = getImageSrc(genre);
            return (
              <li key={genre} className="genres__item">
                <Link className='genres__link' to={`/genres/${genre}`}>
                  <img src={imageSrc} alt={`Обложка жанра ${genre}`} />
                  <div className="genres__text-container">
                    <p className="genres__subtitle">{capitalizeFirstLetter(genre)}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )

}