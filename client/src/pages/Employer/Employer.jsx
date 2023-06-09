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
import FilterBar from '../../components/FilterBar/FilterBar';

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

  const getEmployerId = () => {
    const decoded_token = jwt_decode(access_token);
    const employer_id = decoded_token.employer_id;

    return employer_id;
  }

  useEffect(() => {
    if (role === 'employer') {
      const employer_id = getEmployerId()
      getVacanciesByEmployer(employer_id)
        .then((data) => {
          setVacancies(data);
        })
        .catch((error) => console.log(error));
    }
  }, [role]);

  useEffect(() => {
    if (role === 'applicant' || role === 'admin') {
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
    else if (role === 'employer') {
      const handleCreateVacancyClick = () => {
        setShowVacancyCreateForm(true);
      };

      const handleLinkOn = (link) => {
        navigate(link);
      };

      const handleCreateVacancySubmit = (e) => {
        e.preventDefault();
        createNewVacancy(e.target.name.value, e.target.description.value,
          e.target.place.value, e.target.salary.value, e.target.experience.value, e.target.tags.value.trim().split(','));
      };

      const inputConfigs = [
        {
          title: 'Название вакансии',
          type: 'text',
          name: 'name'
        },
        {
          title: 'Местоположение (Например: Москва)',
          type: 'text',
          name: 'place'
        },
        {
          title: 'Заработная плата (Например: 35.000)',
          type: 'text',
          name: 'salary'
        },
        {
          title: 'Требуемый опыт (Например: 2 года, 10 месяцев)',
          type: 'text',
          name: 'experience'
        },
      ];
      const textareaConfigs = [
        {
          title: 'Описание вакансии',
          type: 'text',
          name: 'description'
        },
        {
          title: 'Ключевые слова (Ввод через запятую, например: Excel, Коммуникабельность)',
          type: 'text',
          name: 'tags'
        }
      ];

      const handleTabClick = (tab) => {
        setActiveTab(tab);
        const employer_id = getEmployerId()
        getVacanciesByEmployer(employer_id)
        .then((data) => {
          setVacancies(data);
        })
        .catch((error) => console.log(error));
      };

      const renderContent = () => {
        switch (activeTab) {
          case 'activedVacancies':
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
                          experience={vacancy.experience}
                          tags={vacancy.tags}
                          is_confirmed={true}
                          is_archived={false}
                          role={role}
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
          case 'archivedVacancies':
            return (
              <div className={`grid-cards`}>
                <div className={`grid-cards-content`}>
                  {vacancies.map((vacancy) => {
                    if (vacancy.is_confirmed && vacancy.is_archived) {
                      return (
                        <VacancyCard
                          key={vacancy.id}
                          vacancy_id={vacancy.id}
                          name={vacancy.name}
                          created_at={vacancy.created_at}
                          description={vacancy.description}
                          place={vacancy.place}
                          salary={vacancy.salary}
                          experience={vacancy.experience}
                          tags={vacancy.tags}
                          is_confirmed={true}
                          is_archived={true}
                          role={role}
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
                    if (!vacancy.is_confirmed && vacancy.is_archived) {
                      return (
                        <VacancyCard
                          key={vacancy.id}
                          vacancy_id={vacancy.id}
                          name={vacancy.name}
                          created_at={vacancy.created_at}
                          description={vacancy.description}
                          place={vacancy.place}
                          salary={vacancy.salary}
                          experience={vacancy.experience}
                          tags={vacancy.tags}
                          is_confirmed={false}
                          is_archived={true}
                          role={role}
                          vacancies={vacancies}
                          setVacancies={setVacancies}
                          showButtons={false}
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
                <GreenButton title={'Разместить вакансию'} onClick={handleCreateVacancyClick} />
                <BlueButton title={'Просмотреть соискателей'} onClick={() => handleLinkOn('/applicants')} />
                <BlueButton title={'Просмотреть размещенные вакансии'} onClick={() => handleLinkOn('/vacancies')} />
              </div>
              <div className={`tab-menu`}>

                <button
                  className={activeTab === 'activedVacancies' ? 'active' : ''}
                  onClick={() => handleTabClick('activedVacancies')}>
                  Мои активные вакансии</button>

                <button
                  className={activeTab === 'archivedVacancies' ? 'active' : ''}
                  onClick={() => handleTabClick('archivedVacancies')}>
                  Мои неактивные вакансии</button>

                <button
                  className={activeTab === 'unconfirmedVacancies' ? 'active' : ''}
                  onClick={() => handleTabClick('unconfirmedVacancies')}>
                  Мои неподтвержденные вакансии</button>

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
        <div className={styles.employerSection}>
          <FilterBar />
          <div className={`content`}>
            <h3 className={`title`}>Работодатели</h3>
            <div className={`cards`}>
              <div className={`cards-content`}>
                {employers.map((employer) => {
                  return (
                    <EmployerCard
                      key={employer.id}
                      employer_id={employer.id}
                      company_name={employer.company_name}
                      company_description={employer.company_description}
                      contact={employer.contact}
                      website={employer.website}
                      created_at={employer.created_at}
                      is_confirmed={true}
                      role={role}
                      employers={employers}
                      setEmployers={setEmployers}
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
