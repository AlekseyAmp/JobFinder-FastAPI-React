import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { access_token } from '../../constants/token';

import styles from './Header.module.scss';
import '../../assets/variables.scss';
import { getUserInfo } from '../../services/user';

import Logout from '../../pages/Auth/Logout';

function Header() {
  const isAuthorized = !!access_token;
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (isAuthorized) {
      getUserInfo()
        .then((data) => {
          setName(data.name);
          setSurname(data.surname);
          setRole(data.role);
        })
        .catch((error) => console.log(error));
    }
  }, [isAuthorized]);
  return (
    <div className={styles.header}>
      <Link to='/' className={styles.logo}>
        <img src="img/logo.png" alt="Logo" />
        <h3 className={`title`}>JobFinder</h3>
      </Link>

      <div className={styles.menu}>
        <ul>
          <li>
            <Link to='/applicant' className={`link-text`}>Соискателям</Link>
          </li>
          <li>
            <Link to='/employer' className={`link-text`}>Работодателям</Link>
          </li>
        </ul>
      </div>

      <div className={styles.menu}>
        <ul>
          {isAuthorized ? (
            <>
              {role === 'admin' ? (
                <li>
                  <Link to='/admin' className={`link-text`}>Админ панель</Link>
                </li>
              ) : null
              }
              <li>
                <Link to='/' className={`link-text`}>{name} {surname}</Link>
              </li>
              <li>
                <Logout />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login' className={`link-text`}>Вход</Link>
              </li>
              <li>
                <Link to='/register' className={`link-text`}>Регистрация</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
