import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { access_token } from '../../constants/token';
import { getUserInfo } from '../../services/user';

import styles from './Header.module.scss';

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

  const makeRoleOnRussian = (role) => {
      switch(role) {
        case 'employer':
          role = 'работодатель'; 
          break;
        case 'applicant':
          role = 'соискатель';
          break;
        case 'notConfirmedEmployer':
          role = 'неподтвержденный работодатель';
          break;
        case 'admin':
            role = 'админ';
            break;
        default:
          role = 'пользователь';
      }
      return role;
  }

  const translatedRole = makeRoleOnRussian(role)

  return (
    <div className={styles.header}>
      <Link to='/' className={styles.logo}>
        <img src="img/logo.png" alt="Logo" />
        <h3 className={`title`}>JobFinder</h3>
      </Link>

      <div className={styles.menu}>
        <ul>
          <li>
            <Link to='/vacancies' className={`link-text`}>Вакансии</Link>
          </li>
          <li>
            <Link to='/applicants' className={`link-text`}>Соискатели</Link>
          </li>
          <li>
            <Link to='/employers' className={`link-text`}>Работодатели</Link>
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
                <p className={`green-text`}>Вы - {translatedRole}</p>
              </li>
              <li>
                <p className={`gray-text`}>{name} {surname}</p>
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
