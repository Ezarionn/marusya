import { MoviesList } from "../MoviesList/MoviesList"
import { Loader } from "../Loader/Loader"
import { useGetFavoritesList } from "../../hooks/useGetFavoritesList"
import './profile.css'

export const FavoritesList = () => {

  const { movie: favorites, isLoading, isError, refetch } = useGetFavoritesList()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="error-container">
          <p className="error-message">Произошла ошибка при загрузке фильма :(</p>
          <button className="error-refetch-btn" onClick={() => refetch()}>Повторить запрос</button>
        </div>
      ) : (
        <MoviesList type='profile__favorites' moviesData={favorites} />
      )}
    </>
  )

}