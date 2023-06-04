import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { access_token } from '../../constants/token';
import { getUserInfo } from '../../services/user';
import { createNewEmployer } from '../../services/employer';
import { createNewVacancy, getVacanciesByEmployer } from '../../services/vacancy';

import styles from './Employer.module.scss';
import '../../assets/variables.scss';

import BlueButton from '../../components/Buttons/BlueButton/BlueButton';
import GreenButton from '../../components/Buttons/GreenButton/GreenButton';
import TextareaForm from '../../components/Forms/TextareaForm/TextareaForm';

function Employer() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthorized = access_token;
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [showEmployerCreateForm, setShowEmployerCreateForm] = useState(false);
  const [showVacancyCreateForm, setShowVacancyCreateForm] = useState(false);

  const [myVacancies, setMyVacancies] = useState([])

  const decoded_token = jwt_decode(access_token);
  const employer_id = decoded_token.employer_id;

  useEffect(() => {
    if (isAuthorized) {
      getUserInfo()
        .then((data) => {
          setRole(data.role);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (role === 'employer' || role === 'admin') {
      getVacanciesByEmployer(employer_id)
        .then((data) => {
          setMyVacancies(data);
        })
        .catch((error) => console.log(error));
    }
  }, [role]);
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleBecomeEmployerClick = () => {
    setShowEmployerCreateForm(true);
  };

  const handleCreateEmployerSubmit = (e) => {
    e.preventDefault();
    createNewEmployer(e.target.company_name.value, e.target.company_description.value);
  };

  const handleCreateVacancyClick = () => {
    setShowVacancyCreateForm(true);
  };

  const handleCreateVacancySubmit = (e) => {
    e.preventDefault();
    createNewVacancy(e.target.name.value, e.target.description.value,
      e.target.place.value, e.target.salary.value, e.target.tags.value.trim().split(','));
  };

  const renderContent = () => {
    if (role === 'user') {
      const inputConfigs = [
        {
          title: 'Название компании',
          type: 'text',
          name: 'company_name'
        }
      ];
      const textareaConfigs = [
        {
          title: 'Описание компании',
          type: 'text',
          name: 'company_description'
        }
      ];

      return (
        <div className={styles.createEmployer}>
          {showEmployerCreateForm ? (
            <TextareaForm
              inputConfigs={inputConfigs}
              textareaConfigs={textareaConfigs}
              buttonTitle={'Отправить'}
              onSubmit={handleCreateEmployerSubmit}
            />
          ) : (
            <div className={styles.createEmployerContent}>
              <p className={`dark-text`}>Для того, чтобы просматривать эту страницу, нужно стать работодателем</p>
              <div className={styles.createEmployerButton}>
                <BlueButton title={'Стать работодателем'} onClick={handleBecomeEmployerClick} />
              </div>
            </div>
          )}
        </div>
      );
    } else if (role === 'notConfirmedEmployer') {
      return <p className={`dark-text`}>Ваша заявка на рассмотрении</p>;
    } else if (role === 'employer' || role === 'admin') {
      const inputConfigs = [
        {
          title: 'Название вакансии',
          type: 'text',
          name: 'name'
        },
        {
          title: 'Местоположение',
          type: 'text',
          name: 'place'
        },
        {
          title: 'Заработная плата',
          type: 'text',
          name: 'salary'
        },
      ];
      const textareaConfigs = [
        {
          title: 'Описание вакансии',
          type: 'text',
          name: 'description'
        },
        {
          title: 'Ключевые слова (ввод через запятую)',
          type: 'text',
          name: 'tags'
        }
      ];

      return (
        <div className={styles.confirmedEmployer}>
          {showVacancyCreateForm ? (
            <TextareaForm
              inputConfigs={inputConfigs}
              textareaConfigs={textareaConfigs}
              buttonTitle={'Отправить'}
              onSubmit={handleCreateVacancySubmit}
            />
          ) : (
            <div className={styles.confirmedEmployerContent}>
              <div className={`title`}>Добро пожаловать!</div>
              <BlueButton title={'Разместить вакансию'} onClick={handleCreateVacancyClick} />
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className={styles.employer}>
      {isAuthorized ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
          renderContent()
        )
      ) : (
        <div className={styles.cantWatchPage}>
          <p className={`dark-text`}>Войдите или зарегистрируйтесь</p>
          <div className={styles.cantWatchPageButton}>
            <GreenButton title={'Вход'} onClick={handleLoginClick} />
            <GreenButton title={'Регистрация'} onClick={handleRegisterClick} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Employer;
