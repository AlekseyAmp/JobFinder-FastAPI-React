import React, { useState, useEffect } from 'react';

import { getPaginatedEmployers } from '../../services/employer';
import { getPaginatedVacancies } from '../../services/vacancy';
import { getUserInfo } from '../../services/user';
import { access_token } from '../../constants/token';

import styles from './Admin.module.scss';

import EmployerCard from '../../components/Cards/EmployerCard/EmployerCard';
import VacancyCard from '../../components/Cards/VacancyCard/VacancyCard';

function Admin() {
  const isAuthorize = access_token
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null)
  const [activeTab, setActiveTab] = useState('unconfirmedEmployers');
  const [employers, setEmployers] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isAuthorize) {
      getUserInfo()
        .then((data) => {
          setRole(data.role);
          setName(data.name);
        })

        .catch((error) => console.log(error));
    }
  }, [isAuthorize]);

  const handleTabClick = (tab, service, state) => {
    setActiveTab(tab);
    setCurrentPage(1);
    service()
      .then((data) => {
        state(data);
      })
      .catch((error) => console.log(error));
  };

  const goToNextPage = (service, currentPage, state) => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    service()
      .then((data) => {
        state(data);
      })
      .catch((error) => console.log(error));
  };

  const goToPreviousPage = (service, currentPage, state) => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
    service()
      .then((data) => {
        state(data);
      })
      .catch((error) => console.log(error));

  };

  const renderContent = () => {
    switch (activeTab) {
      case 'confirmedEmployers':
        return (
          <div className={`content`}>
            <div className={`grid-cards`}>
              <div className={`grid-cards-content`}>
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
                onClick={() => goToPreviousPage(() => getPaginatedEmployers(currentPage-1, true), currentPage, setEmployers)}>
                Предыдущая страница</button>

              <span>Текущая страница: {currentPage}</span>

              <button onClick={() => goToNextPage(() => getPaginatedEmployers(currentPage+1, true), currentPage, setEmployers)}>
                Следующая страница</button>
            </div>
          </div>
          </div>
        );
      case 'unconfirmedEmployers':
        return (
          <div className={`content`}>
            <div className={`grid-cards`}>
              <div className={`grid-cards-content`}>
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
                      is_confirmed={false}
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
                onClick={() => goToPreviousPage(() => getPaginatedEmployers(currentPage-1, false), currentPage, setEmployers)}>
                Предыдущая страница</button>

              <span>Текущая страница: {currentPage}</span>

              <button onClick={() => goToNextPage(() => getPaginatedEmployers(currentPage+1, false) ,currentPage, setEmployers)}>
                Следующая страница</button>
            </div>
          </div>
          </div>
        );
      case 'confirmedVacanciesNotInArchive':
        return (
          <div className={`content`}>
            <div className={`grid-cards`}>
              <div className={`grid-cards-content`}>
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
                onClick={() => goToPreviousPage(() => getPaginatedVacancies(currentPage-1, true, false), currentPage, setVacancies)}>
                Предыдущая страница</button>

              <span>Текущая страница: {currentPage}</span>

              <button onClick={() => goToNextPage(() => getPaginatedVacancies(currentPage+1, true, false), currentPage, setVacancies)}>
                Следующая страница</button>
            </div>
          </div>
          </div>
        );
      case 'confirmedVacanciesInArchive':
        return (
          <div className={`content`}>
            <div className={`grid-cards`}>
              <div className={`grid-cards-content`}>
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
                      is_archived={true}
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
                onClick={() => goToPreviousPage(() => getPaginatedVacancies(currentPage-1, true, true), currentPage, setVacancies)}>
                Предыдущая страница</button>

              <span>Текущая страница: {currentPage}</span>

              <button onClick={() => goToNextPage(() => getPaginatedVacancies(currentPage+1, true, true), currentPage, setVacancies)}>
                Следующая страница</button>
            </div>
          </div>
          </div>
        );
      case 'unconfirmedVacancies':
        return (
          <div className={`content`}>
            <div className={`grid-cards`}>
              <div className={`grid-cards-content`}>
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
                      is_confirmed={false}
                      is_archived={true}
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
                onClick={() => goToPreviousPage(() => getPaginatedVacancies(currentPage-1, false, true), currentPage, setVacancies)}>
                Предыдущая страница</button>

              <span>Текущая страница: {currentPage}</span>

              <button onClick={() => goToNextPage(() => getPaginatedVacancies(currentPage+1, false, true), currentPage, setVacancies)}>
                Следующая страница</button>
            </div>
          </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.admin}>
      {role === 'admin' ? (
        <div className={`content`}>
          <div className={`title`}>Добро пожаловать, {name}!</div>

          <div className={`tab-menu`}>

            <button
              className={activeTab === 'confirmedEmployers' ? 'active' : ''}
              onClick={() => handleTabClick('confirmedEmployers', () => getPaginatedEmployers(1, true), setEmployers)}>

              Подтвержденные работодатели</button>

            <button
              className={activeTab === 'unconfirmedEmployers' ? 'active' : ''}
              onClick={() => handleTabClick('unconfirmedEmployers', () => getPaginatedEmployers(1, false), setEmployers)}>
              Неподтвержденные работодатели</button>

            <button
              className={activeTab === 'confirmedVacanciesNotInArchive' ? 'active' : ''}
              onClick={() => handleTabClick('confirmedVacanciesNotInArchive', () => getPaginatedVacancies(1, true, false), setVacancies)}>
              Подтвержденные вакансии (активные)</button>

            <button
              className={activeTab === 'confirmedVacanciesInArchive' ? 'active' : ''}
              onClick={() => handleTabClick('confirmedVacanciesInArchive', () => getPaginatedVacancies(1, true, true), setVacancies)}>
              Подтвержденные вакансии (неактивные)</button>

            <button
              className={activeTab === 'unconfirmedVacancies' ? 'active' : ''}
              onClick={() => handleTabClick('unconfirmedVacancies', () => getPaginatedVacancies(1, false, true), setVacancies)}>
              Неподтвержденные вакансии</button>

          </div>

          {renderContent()}
        </div>
      ) : "Нет прав доступа"
      }
    </div>
  );
}

export default Admin;