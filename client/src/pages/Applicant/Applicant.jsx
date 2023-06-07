import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { access_token } from '../../constants/token';
import { getUserInfo } from '../../services/user';
import { getPaginatedVacancies } from '../../services/vacancy';

import styles from './Applicant.module.scss';

import BlueButton from '../../components/Buttons/BlueButton/BlueButton';
import GreenButton from '../../components/Buttons/GreenButton/GreenButton';
import TextareaForm from '../../components/Forms/TextareaForm/TextareaForm';
import { createNewApplicant } from '../../services/applicant';

function Applicant() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthorized = access_token;
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  const [showApplicantCreateForm, setShowApplicantCreateForm] = useState(false);

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
    if (role === 'applicant') {
      const decoded_token = jwt_decode(access_token);
      const applicant_id = decoded_token.applicant_id;
      getPaginatedVacancies(1, true, false)
        .then((data) => {
          setVacancies(data);
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

  const renderContent = () => {
    if (role === 'user') {
      const handleBecomeApplicantClick = () => {
        setShowApplicantCreateForm(true);
      };

      const handleCreateApplicantSubmit = (e) => {
        e.preventDefault();
        createNewApplicant(e.target.speciality.value, e.target.experience.value, e.target.salary.value, e.target.resume_text.value);
      };

      const inputConfigs = [
        {
          title: 'Желаемая должность',
          type: 'text',
          name: 'speciality'
        },
        {
          title: 'Опыт работы',
          type: 'text',
          name: 'experience'
        },
        {
          title: 'Зарплатные ожидания',
          type: 'text',
          name: 'salary'
        }
      ];
      const textareaConfigs = [
        {
          title: 'Напишите, чем занимались на прошлых местах работы',
          type: 'text',
          name: 'resume_text'
        }
      ];

      return (
        <div className={`section`}>
          {showApplicantCreateForm ? (
            <TextareaForm
              inputConfigs={inputConfigs}
              textareaConfigs={textareaConfigs}
              buttonTitle={'Отправить'}
              onSubmit={handleCreateApplicantSubmit}
            />
          ) : (
            <div className={`content`}>
              <p className={`dark-text center`}>Для того, чтобы просматривать эту страницу, нужно стать соискателем</p>
              <div className={`center`}>
                <BlueButton title={'Разместить резюме'} onClick={handleBecomeApplicantClick} />
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className={styles.applicant}>
      {isAuthorized ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
          renderContent()
        )
      ) : (
        <div className={`content`}>
          <p className={`dark-text center`}>Войдите или зарегистрируйтесь</p>
          <div className={`buttons center`}>
            <GreenButton title={'Вход'} onClick={handleLoginClick} />
            <GreenButton title={'Регистрация'} onClick={handleRegisterClick} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Applicant;