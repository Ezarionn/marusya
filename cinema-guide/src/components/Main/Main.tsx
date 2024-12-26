import { RandomMovie } from './RandomMovie'
import { TopMoviesList } from './TopMoviesList'
import './main.css'

export const Main = () => {

  return (
    <main className="main">
      <div className="main__container">
        <RandomMovie />
        <TopMoviesList />
      </div>
    </main>
  )

}