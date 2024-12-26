import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Modal } from '../Modals/Modal';

export const Layout = () => {

  return (
    <div className='wrapper'>
      <Header />
      <Outlet />
      <Footer />
      <Modal />
    </div>
  )
}