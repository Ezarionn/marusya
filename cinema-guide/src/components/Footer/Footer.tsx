import { useLocation } from 'react-router-dom';
import { VkIcon } from '../../assets/icons/vk';
import { YouTubeIcon } from '../../assets/icons/youTube';
import { OdnoklassnikiIcon } from '../../assets/icons/ok';
import { TelegramIcon } from '../../assets/icons/tg';
import './footer.css'

export const Footer = () => {

  const location = useLocation()
  const isFixedFooter = location.pathname

  return (
    <footer className={isFixedFooter === '/profile' ? 'fixed-footer' : 'footer'}>
      <div className={isFixedFooter === '/profile' ? 'fixed-footer__container' : 'footer__container'}>
        <ul className="footer__list-socials">
          <li className="footer__list-item">
            <a className='footer__item-link' href="#">
              <VkIcon />
            </a>
          </li>
          <li className="footer__list-item">
            <a className='footer__item-link' href="#">
              <YouTubeIcon />
            </a>
          </li>
          <li className="footer__list-item">
            <a className='footer__item-link' href="#">
              <OdnoklassnikiIcon />
            </a>
          </li>
          <li className="footer__list-item">
            <a className='footer__item-link' href="#">
              <TelegramIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )

}