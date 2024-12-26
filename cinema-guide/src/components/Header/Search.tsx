import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SearchItem } from "./SearchItem";
import { useGetMoviesByFilter } from "../../hooks/useGetMoviesByFilter";
import { useAppDispatch } from "../../redux/hooks";
import { setMovie } from "../../redux/movieSlice";

export const Search = () => {

  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState('');
  const [requestDelay, setRequestDelay] = useState<number | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const currentWidth = window.innerWidth;

  const { movies, isLoading, isError, refetch } = useGetMoviesByFilter({ title: inputValue, count: 5 })

  const handleSearch = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (requestDelay) {
      clearTimeout(requestDelay);
    }

    const timeout = setTimeout(() => {
      refetch();
    }, 300);

    setRequestDelay(timeout);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
      &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  const handleInputClick = () => {
    setDropdownVisible(prev => !prev);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (requestDelay) {
        clearTimeout(requestDelay);
      }
    };
  }, [requestDelay]);

  useEffect(() => {
    if (isInputVisible) {
      document.body.classList.add('stop-scroll');
      if (window.innerWidth > 1000) {
        document.body.style.paddingRight = '17px';
      }
    } else {
      document.body.classList.remove('stop-scroll');
      document.body.style.paddingRight = '0'
    }
    return () => {
      document.body.classList.remove('stop-scroll');
      document.body.style.paddingRight = '0'
    };
  }, [isInputVisible]);

  const handleClearField = () => {
    setInputValue('');
    setDropdownVisible(false);
    if (currentWidth <= 1000) {
      setIsInputVisible(false)
    }
  }

  const renderListItems = () => {
    if (isLoading) {
      return <li className="header__item--search">Идет поиск...</li>;
    }
    if (isError) {
      return <li className="header__item--search">Ошибка при поиске фильма</li>;
    }
    if (inputValue !== '' && movies && movies.length === 0) {
      return <li className="header__item--search">Фильм не найден</li>;
    }
    if (movies && movies.length > 0) {
      return movies.map(movie => (
        <li key={movie.id} className="header__item--search" onClick={() => { dispatch(setMovie(movie)); setDropdownVisible(false); setIsInputVisible(false) }}>
          <Link className='header__search-link' to={`/movie/${movie.id}`}>
            <SearchItem movie={movie} />
          </Link>
        </li>
      ));
    }
  };

  return (
    <>
      <button className="header__search-button" onClick={() => setIsInputVisible(true)}>
      </button>
      {((currentWidth <= 1000 && isInputVisible) || (currentWidth > 1000)) && (
        <>
          <div className="header__search-overlay"></div>
          <div className="header__search-container">
            <input
              ref={inputRef}
              type="text"
              className="header__search"
              placeholder="Поиск"
              value={inputValue}
              onChange={handleSearch}
              onClick={handleInputClick} />
            {isDropdownVisible && inputValue !== '' && movies && (
              <ul className="header__list--search" ref={dropdownRef}>
                {renderListItems()}
              </ul>
            )}
            {((currentWidth <= 1000) || (currentWidth > 1000 && inputValue !== '')) && (
              <button ref={buttonRef} className="header__search-delete" onClick={handleClearField}>✕</button>
            )}

          </div>
        </>
      )}
    </>
  )

}