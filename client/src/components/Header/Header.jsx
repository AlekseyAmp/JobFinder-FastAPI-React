import React from 'react';
import { Link } from 'react-router-dom';

import { access_token } from '../../constants/token';

import styles from './Header.module.scss';
import '../../assets/variables.scss';

import Logout from '../../pages/Auth/Logout';

function Header() {
  const isAuthorized = !!access_token;

  console.log(isAuthorized)
  return (
    <div className={styles.header}>
      <Link to='/' className={styles.logo}>
        <img src="img/logo.png" alt="Logo" />
        <h3 className={`title`}>JobFinder</h3>
      </Link>

      <div className={styles.menu}>
        <ul>
          <li>
            <Link to='/' className={`link-text`}>Работодателям</Link>
          </li>
          <li>
            <Link to='/' className={`link-text`}>Соискателям</Link>
          </li>
        </ul>
      </div>

      <div className={styles.menu}>
        <ul>
          {isAuthorized ? (
            <Logout />
          ) : (
            <>
              <Link to='/login' className={`link-text`}>Вход</Link>
              <Link to='/register' className={`link-text`}>Регистрация</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
