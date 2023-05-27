import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { access_token } from '../../constants/token';
import axios from '../../utils/axios';

import styles from './Header.module.scss';
import '../../assets/variables.scss';

import Logout from '../../pages/Auth/Logout';

function Header() {
  const isAuthorized = !!access_token;
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => {
    async function getNameSurname() {
      try {
        const response = await axios.get(`/users/me`);

        if (response.data) {
          setName(response.data.name);
          setSurname(response.data.surname);
        }
      } catch (error) {
        console.log(error.response.data.detail);
      }
    }
    if (isAuthorized) {
      getNameSurname();
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
