import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { RegistrationForm } from "./RegistrationForm"
import './auth.css'

export const AuthForm = () => {

  const [modalState, setModalState] = useState('login')
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegistered(false);
    setModalState('login');
  };

  return (
    <>
      <a className="auth__logo" href="/">
        <img src="/logo-black.png" alt="Логотип" />
      </a>
      {modalState === 'login' ?
        <><LoginForm /><button className="enter__btn-switch btn__switch-mode" onClick={() => { setModalState('registration') }}>Регистрация</button></> :
        <><RegistrationForm onSuccessfulRegistration={handleRegistrationSuccess} />
          {isRegistered ? (
            <button className="auth-submit-btn blue-button" onClick={handleSwitchToLogin}>
              Войти
            </button>
          ) : (
            <button className="registration__btn-switch btn__switch-mode" onClick={handleSwitchToLogin}>
              У меня есть пароль
            </button>
          )}
        </>
      }
    </>
  )

}