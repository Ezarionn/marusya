import { useState, useEffect } from "react"
import { ProfileSettings } from "./ProfileSettings"
import { FavoritesList } from "./FavoritesList"
import { useAppSelector } from "../../redux/hooks"
import { selectUser } from "../../redux/authSlice"
import { useNavigate } from "react-router-dom"

export const Profile = () => {

  const [chosenPart, setChosenPart] = useState('favorites')

  const currentUser = useAppSelector(selectUser)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const currentWidth = window.innerWidth

  useEffect(() => {
    if (currentUser !== null) {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!loading && currentUser === null) {
      navigate('/');
    }
  }, [currentUser, loading]);

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Мой аккаунт</h2>
        <button
          className={chosenPart === 'favorites' ? 'profile__btn-favorites profile__part-btn profile__part-btn--active' : 'profile__btn-favorites profile__part-btn'}
          onClick={() => setChosenPart('favorites')}>
          {currentWidth > 550 ? 'Избранные фильмы' : 'Избранное'}
        </button>
        <button
          className={chosenPart === 'settings' ? 'profile__btn-settings profile__part-btn profile__part-btn--active' : 'profile__btn-settings profile__part-btn'}
          onClick={() => setChosenPart('settings')}>
          {currentWidth > 550 ? 'Настройка аккаунта' : 'Настройки'}
        </button>
        <div className="profile__parts-content">
          {chosenPart === 'favorites' && (
            <FavoritesList />
          )}
          {chosenPart === 'settings' && (
            <ProfileSettings />
          )}
        </div>
      </div>
    </section>
  )

}
