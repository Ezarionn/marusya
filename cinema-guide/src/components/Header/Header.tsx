import { useEffect } from 'react';
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { Search } from './Search';
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { openModal } from '../../redux/modalSlice';
import { selectUser, setUser, clearUser } from '../../redux/authSlice';
import { useFetchUser } from '../../hooks/useAuth';
import './header.css'

export const Header = () => {

  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectUser)
  const location = useLocation();
  const currentSection = location.pathname
  const currentWidth = window.innerWidth;

  const { userData, isError } = useFetchUser()

  const checkUserSession = () => {
    if (userData) {
      dispatch(setUser(userData));
      localStorage.setItem('currentUser', JSON.stringify(userData))
    } else if (isError) {
      dispatch(clearUser());
      localStorage.removeItem('currentUser');
    }
  };

  useEffect(() => {
    checkUserSession();
  }, [userData]);

  return (
    <header className="header">
      <div className="header__container">
        <a className='header__logo' href="/">
          <img src="/logo.png" alt="Логотип" />
        </a>
        <Link className={currentSection === '/' ? 'header__link-main header__link header__link--active' : 'header__link-main header__link'} to="/">Главная</Link>
        <Link className={currentSection.includes('/genres') ? 'header__link-genres header__link header__link--active' : 'header__link-genres header__link'} to="/genres">{currentWidth <= 650 ? null : 'Жанры'}</Link>
        <Search />
        {currentUser ? <Link className={currentSection === '/profile' ? 'header__link-profile header__link header__link--active' : 'header__link-profile header__link'} to="/profile">{currentWidth <= 650 ? null : currentUser.name}</Link> :
          (<button className="header__login-btn" onClick={() => dispatch(openModal('auth'))}>{currentWidth <= 650 ? null : 'Войти'}</button>)
        }
      </div>
    </header>
  )

}