import { MovieCard } from "../MovieCard/MovieCard";

export const MoviePage = () => {

  return (
    <section className="about-movie">
      <div className="about-movie__container">
        <MovieCard type='about' />
      </div>
    </section>
  )

}