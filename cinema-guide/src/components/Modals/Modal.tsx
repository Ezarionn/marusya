import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeModal } from "../../redux/modalSlice";
import { Trailer } from './Trailer'
import { AuthForm } from "../Authentification/AuthForm";
import './modal.css'

export const Modal = () => {

  const dispatch = useAppDispatch();
  const { isOpen, modalType } = useAppSelector((state) => state.modal);
  const currentWidth = window.innerWidth;

  const renderContent = () => {
    switch (modalType) {
      case 'trailer':
        return <Trailer />;
      case 'auth':
        return <AuthForm />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('stop-scroll');
      if (currentWidth > 1000) {
        document.body.style.marginRight = '17px'
      }
    } else {
      document.body.classList.remove('stop-scroll');
      document.body.style.paddingRight = '0'
    }
    return () => {
      document.body.classList.remove('stop-scroll');
      document.body.style.paddingRight = '0'
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal__overlay">
      <div className={modalType === 'auth' ? 'modal__container-auth' : 'modal__container-trailer'}>
        {renderContent()}
        <button className={modalType === 'auth' ? 'modal__auth-cancel modal__btn-cancel' : 'modal__trailer-cancel modal__btn-cancel'} onClick={() => dispatch(closeModal())}>✕</button>
      </div>
    </div>
  );
};