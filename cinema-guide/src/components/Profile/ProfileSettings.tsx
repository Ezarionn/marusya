import { useAppSelector } from "../../redux/hooks"
import { selectUser } from "../../redux/authSlice"
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";
import { getInitials } from "../../utils/getInitials";

export const ProfileSettings = () => {

  const currentUser = useAppSelector(selectUser)
  const navigate = useNavigate();

  const { mutate: logout } = useLogout()

  const handleLogout = () => {
    logout()
    navigate(`/`);
  }

  return (
    (currentUser && <>
      <div className="profile__settings-container-1 profile__settings-container">
        <div className="profile__settings-circle">{getInitials(currentUser)}</div>
        <div className="profile__settings-content">
          <p className="profile__settings-caption">Имя Фамилия</p>
          <p className="profile__settings-data">{currentUser.name} {currentUser.surname}</p>
        </div>
      </div>
      <div className="profile__settings-container-2 profile__settings-container">
        <div className="profile__settings-email profile__settings-circle"></div>
        <div className="profile__settings-content">
          <p className="profile__settings-caption">Электронная почта</p>
          <p className="profile__settings-data">{currentUser.email}</p>
        </div>
      </div>
      <button className='profile__settings-logout blue-button' onClick={() => handleLogout()}>Выйти из аккаунта</button>
    </>)
  )

}