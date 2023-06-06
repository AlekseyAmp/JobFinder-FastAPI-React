import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { access_token } from '../../constants/token';
import { getUserInfo } from '../../services/user';
import { createNewEmployer, getPaginatedEmployers } from '../../services/employer';
import { createNewVacancy, getVacanciesByEmployer } from '../../services/vacancy';

import styles from './Employer.module.scss';

import EmployerCard from '../../components/Cards/EmployerCard/EmployerCard';
import VacancyCard from '../../components/Cards/VacancyCard/VacancyCard'
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
  const [activeTab, setActiveTab] = useState('activeVacancies');
  const [vacancies, setVacancies] = useState([])
  const [employers, setEmployers] = useState([])
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
    if (role === 'employer' || role === 'admin') {
      const decoded_token = jwt_decode(access_token);
      const employer_id = decoded_token.employer_id;
      getVacanciesByEmployer(employer_id)
        .then((data) => {
          setVacancies(data);
        })
        .catch((error) => console.log(error));
    }
  }, [role]);

  useEffect(() => {
    if (role === 'applicant') {
      getPaginatedEmployers(1, true)
        .then((data) => {
          setEmployers(data);
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
      const handleBecomeEmployerClick = () => {
        setShowEmployerCreateForm(true);
      };

      const handleCreateEmployerSubmit = (e) => {
        e.preventDefault();
        createNewEmployer(e.target.company_name.value, e.target.company_description.value, e.target.contact.value, e.target.website.value);
      };

      const inputConfigs = [
        {
          title: 'Название компании',
          type: 'text',
          name: 'company_name'
        },
        {
          title: 'Контактный адрес (почта или телефон)',
          type: 'text',
          name: 'contact'
        },
        {
          title: 'Веб-сайт компании (если нет, то ссылку на местоположение в Яндекс Картах)',
          type: 'text',
          name: 'website'
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
        <div className={`section`}>
          {showEmployerCreateForm ? (
            <TextareaForm
              inputConfigs={inputConfigs}
              textareaConfigs={textareaConfigs}
              buttonTitle={'Отправить'}
              onSubmit={handleCreateEmployerSubmit}
            />
          ) : (
            <div className={`content`}>
              <p className={`dark-text center`}>Для того, чтобы просматривать эту страницу, нужно стать работодателем</p>
              <div className={`center`}>
                <BlueButton title={'Стать работодателем'} onClick={handleBecomeEmployerClick} />
              </div>
            </div>
          )}
        </div>
      );
    }
    else if (role === 'notConfirmedEmployer') {
      return <p className={`dark-text center`}>Ваша заявка на рассмотрении</p>;
    }
    else if (role === 'employer' || role === 'admin') {
      const handleCreateVacancyClick = () => {
        setShowVacancyCreateForm(true);
      };

      const handleCreateVacancySubmit = (e) => {
        e.preventDefault();
        createNewVacancy(e.target.name.value, e.target.description.value,
          e.target.place.value, e.target.salary.value, e.target.tags.value.trim().split(','));
      };

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

      const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

      const renderContent = () => {
        switch (activeTab) {
          case 'activeVacancies':
            return (
              <div className={`grid-cards`}>
                <div className={`grid-cards-content`}>
                  {vacancies.map((vacancy) => {
                    if (vacancy.is_confirmed && !vacancy.is_archived) {
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
                          role={role}
                          is_confirmed={true}
                          is_archived={false}
                          vacancies={vacancies}
                          setVacancies={setVacancies}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          case 'archiveVacancies':
            return (
              <div className={`grid-cards`}>
                <div className={`grid-cards-content`}>
                  {vacancies.map((vacancy) => {
                    if (vacancy.is_confirmed && !vacancy.is_archived) {
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
                          role={role}
                          is_confirmed={true}
                          is_archived={true}
                          vacancies={vacancies}
                          setVacancies={setVacancies}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          case 'unconfirmedVacancies':
            return (
              <div className={`grid-cards`}>
                <div className={`grid-cards-content`}>
                  {vacancies.map((vacancy) => {
                    if (vacancy.is_confirmed && !vacancy.is_archived) {
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
                          role={role}
                          is_confirmed={false}
                          is_archived={true}
                          vacancies={vacancies}
                          setVacancies={setVacancies}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div className={`section`}>
          {showVacancyCreateForm ? (
            <TextareaForm
              inputConfigs={inputConfigs}
              textareaConfigs={textareaConfigs}
              buttonTitle={'Отправить'}
              onSubmit={handleCreateVacancySubmit}
            />
          ) : (
            <div className={`content`}>
              <div className={`title`}>Добро пожаловать!</div>
              <div className={`buttons`}>
                <BlueButton title={'Разместить вакансию'} onClick={handleCreateVacancyClick} />
              </div>
              <div className={`tab-menu`}> 

                <button
                  className={activeTab === 'activeVacancies' ? 'active' : ''}
                  onClick={() => handleTabClick('activeVacancies')}>
                  Активные вакансии</button>

                <button
                  className={activeTab === 'archiveVacancies' ? 'active' : ''}
                  onClick={() => handleTabClick('archiveVacancies')}>
                  Неактивные вакансии</button>

                <button
                  className={activeTab === 'unconfirmedVacancies' ? 'active' : ''}
                  onClick={() => handleTabClick('unconfirmedVacancies')}>
                  Неподтвержденные вакансии</button>

              </div>

              <div className={styles.employerCards}>{renderContent()}</div>
            </div>
          )}
        </div>
      );
    }
    else {
      const goToNextPage = (currentPage) => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getPaginatedEmployers(nextPage, true)
          .then((data) => {
            setEmployers(data);
          })
          .catch((error) => console.log(error));
      };

      const goToPreviousPage = (currentPage) => {
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage);
        getPaginatedEmployers(previousPage, true)
          .then((data) => {
            setEmployers(data);
          })
          .catch((error) => console.log(error));

      };

      return (
        <div className={`grid-cards`}>
          <div className={`grid-cards-content`}>
            {employers.map((employer) => {
              return (
                <EmployerCard
                  key={employer.id}
                  employer_id={employer.id}
                  created_at={employer.created_at}
                  company_name={employer.company_name}
                  contact={employer.contact}
                  website={employer.website}
                  company_description={employer.company_description}
                  role={role}
                />
              );
            })}
          </div>
          <div className={`pagination`}>

            <button
              disabled={currentPage === 1}
              onClick={() => goToPreviousPage(currentPage)}>
              Предыдущая страница</button>

            <span>Текущая страница: {currentPage}</span>

            <button onClick={() => goToNextPage(currentPage)}>
              Следующая страница</button>


          </div>
        </div>
      )
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

export default Employer;
