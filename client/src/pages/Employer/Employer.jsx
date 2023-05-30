import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { access_token } from '../../constants/token';
import { getUserInfo } from '../../services/user';
import { createNewEmployer } from '../../services/employer';

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

  const inputConfigs = [
    { title: 'Название компании', type: 'text', name: 'company_name' },
  ];
  const textareaConfigs = [
    { title: 'Описание компании', type: 'text', name: 'company_description' },
  ];

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
    window.location.reload();
  };

  const renderContent = () => {
    if (role === 'applicant') {
      return showEmployerCreateForm ? (
        <TextareaForm
          inputConfigs={inputConfigs}
          textareaConfigs={textareaConfigs}
          buttonTitle={'Отправить'}
          onSubmit={handleCreateEmployerSubmit}
        />
      ) : (
        <div className={styles.cantWatchPage}>
          <p className={`dark-text`}>
            Для того, чтобы просматривать эту страницу, нужно стать работодателем
          </p>
          <div className={styles.cantWatchPageButton}>
            <BlueButton title={'Стать работодателем'} onClick={handleBecomeEmployerClick} />
          </div>
        </div>
      );
    }
    else if (role === 'notConfirmedEmployer') {
      return <p className={`dark-text`}>
        Ваша заявка на рассмотрении
      </p>
    }
    if (role === 'employer' || role === 'admin') {
      return <div>Employer content</div>;
    }
    else {
      return null
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
          <p className={`dark-text`}>Войдите или зарегиструйтесь</p>
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
