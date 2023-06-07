import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { access_token } from '../../constants/token';
import { getUserInfo } from '../../services/user';
import { getPaginatedVacancies } from '../../services/vacancy';
import { createNewApplicant } from '../../services/applicant';

import styles from './Applicant.module.scss';

import VacancyCard from '../../components/Cards/VacancyCard/VacancyCard';
import BlueButton from '../../components/Buttons/BlueButton/BlueButton';
import GreenButton from '../../components/Buttons/GreenButton/GreenButton';
import TextareaForm from '../../components/Forms/TextareaForm/TextareaForm';

function Applicant() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthorized = access_token;
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  const [showApplicantCreateForm, setShowApplicantCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
    else if (role == 'applicant') {
      const goToNextPage = (currentPage) => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getPaginatedVacancies(nextPage, true, false)
          .then((data) => {
            setVacancies(data);
          })
          .catch((error) => console.log(error));
      };

      const goToPreviousPage = (currentPage) => {
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage);
        getPaginatedVacancies(previousPage, true, false)
          .then((data) => {
            setVacancies(data);
          })
          .catch((error) => console.log(error));
      };

      return (
        <div className={`content`}>
          <div className={`cards`}>
            <div className={`cards-content`}>
              {vacancies.map((vacancy) => {
                return (
                  <VacancyCard
                    key={vacancy.id}
                    vacancy_id={vacancy.id}
                    name={vacancy.name}
                    created_at={vacancy.created_at}
                    description={vacancy.description}
                    place={vacancy.place}
                    salary={vacancy.salary}
                    tags={vacancy.tags}
                    is_confirmed={true}
                    is_archived={false}
                    role={role}
                    vacancies={vacancies}
                    setVacancies={setVacancies}
                  />
                );
              })}
            </div>
          </div>
          <div className={`pagination`}>
            <div className={`pagination-content`}>

              <button
                disabled={currentPage === 1}
                onClick={() => goToPreviousPage(currentPage)}>
                Предыдущая страница</button>

              <span>Текущая страница: {currentPage}</span>

              <button onClick={() => goToNextPage(currentPage)}>
                Следующая страница</button>
            </div>
          </div>
        </div>
      )
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