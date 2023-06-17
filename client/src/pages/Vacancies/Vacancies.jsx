import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { access_token } from '../../constants/token';
import { getUserInfo } from '../../services/user';
import { getApplicantByUserID } from '../../services/applicant';
import { getFilteredVacancies, getPaginatedVacancies, searchVacancies } from '../../services/vacancy';
import { getFeedbackByVacancy } from '../../services/feedback';

import styles from './Vacancies.module.scss';

import SearchForm from '../../components/Forms/SearchForm/SearchForm';
import VacancyCard from '../../components/Cards/VacancyCard/VacancyCard';
import GreenButton from '../../components/Buttons/GreenButton/GreenButton';
import FilterBar from '../../components/FilterBar/FilterBar';

function Vacancies() {
    const [isLoading, setIsLoading] = useState(true);
    const isAuthorized = access_token;
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [vacancies, setVacancies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [applicantID, setApplicantID] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [filteredVacancies, setFilteredVacancies] = useState([]);

    const inputConfigSearch = [
        { title: 'Поиск по вакансиям', type: 'text', name: 'search', placeholder: 'Например: Разработчик' },
    ]

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
        if (role) {
            if (role === 'applicant') {
                const decoded_token = jwt_decode(access_token);
                const userID = decoded_token.sub;

                getApplicantByUserID(userID)
                    .then((data) => {
                        setApplicantID(data.id);
                    })
                    .catch((error) => console.log(error));
            }
            const urlParams = new URLSearchParams(window.location.search);
            const currentPage = parseInt(urlParams.get('page')) || 1;
            const query = urlParams.get('query');
            const place = urlParams.get('place');
            const salary = urlParams.get('salary');
            const experience = urlParams.get('experience'); 

            if (!query && !place && !salary && !experience) {
                getPaginatedVacancies(currentPage, true, false)
                .then((data) => {
                    setVacancies(data);
                })
                .catch((error) => console.log(error));
            }

            if (query !== null) {
                searchVacancies(query)
                .then((results) => {
                    setSearchResults(results);
                })
                .catch((error) => console.log(error));
            }

            if (place && salary && experience) {
                getFilteredVacancies(place, salary, experience)
                  .then((filteredData) => {
                    setFilteredVacancies(filteredData);
                  })
                  .catch((error) => console.log(error));
              }
        }
    }, [role]);

    const handleSearchClick = async (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        const results = await searchVacancies(query);
        setSearchResults(results);
        setVacancies([]);
        setFilteredVacancies([]);
        setCurrentPage(1);
        const searchParams = new URLSearchParams({ query });
        navigate(`/vacancies/search?${searchParams.toString()}`);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleBackClick = () => {
        navigate('/vacancies')
        window.location.reload();
    };

    const handleFilterClick = async (e) => {
        e.preventDefault();
        const place = e.target.place.value;
        const salary = e.target.salary.value;
        const experience = e.target.experience.value;
        const filteredApplicants = await getFilteredVacancies(place, salary, experience);
        setFilteredVacancies(filteredApplicants);
        setVacancies([]);
        setCurrentPage(1);
        const searchParams = new URLSearchParams({ place, salary, experience });
        navigate(`/vacancies/filter?${searchParams.toString()}`);
      };

    const goToNextPage = (currentPage) => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        setSearchResults([]);
        setFilteredVacancies([]);
        getPaginatedVacancies(nextPage, true, false)
            .then((data) => {
                setVacancies(data);
            })
            .catch((error) => console.log(error));
        navigate(`/vacancies?page=${nextPage}&confirmed=true&archived=false`);
    };

    const goToPreviousPage = (currentPage) => {
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage);
        setSearchResults([]);
        setFilteredVacancies([]);
        getPaginatedVacancies(previousPage, true, false)
            .then((data) => {
                setVacancies(data);
            })
            .catch((error) => console.log(error));
        navigate(`/vacancies?page=${previousPage}&confirmed=true&archived=false`);
    };

    return (
        <div className={styles.vacancies}>
            {isAuthorized ? (
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={styles.vacanciesSection}>
                        <FilterBar
                        onSubmit={handleFilterClick}
                        is_vacancies={true}
                        />
                        <div className={`content`}>
                            <h3 className={`title`}>Вакансии</h3>
                            <SearchForm
                                inputConfigs={inputConfigSearch}
                                onSubmit={handleSearchClick}
                            />
                            <div className={`cards`}>
                                <div className={`cards-content`}>
                                    {vacancies.length > 0 ? (
                                        vacancies.map((vacancy) => (
                                            <VacancyCard
                                                key={vacancy.id}
                                                vacancy_id={vacancy.id}
                                                applicant_id={applicantID}
                                                company_name={vacancy.company}
                                                name={vacancy.name}
                                                created_at={vacancy.created_at}
                                                description={vacancy.description}
                                                place={vacancy.place}
                                                salary={vacancy.salary}
                                                experience={vacancy.experience}
                                                tags={vacancy.tags}
                                                is_confirmed={true}
                                                is_archived={false}
                                                is_feedback={vacancy.is_feedback}
                                                role={role}
                                                vacancies={vacancies}
                                                setVacancies={setVacancies}
                                                showButtons={false}
                                            />
                                        ))
                                    ) : searchResults.length > 0 ? (
                                        searchResults.map((vacancy) => (
                                            <VacancyCard
                                                key={vacancy.id}
                                                vacancy_id={vacancy.id}
                                                applicant_id={applicantID}
                                                company_name={vacancy.company}
                                                name={vacancy.name}
                                                created_at={vacancy.created_at}
                                                description={vacancy.description}
                                                place={vacancy.place}
                                                salary={vacancy.salary}
                                                experience={vacancy.experience}
                                                tags={vacancy.tags}
                                                is_confirmed={true}
                                                is_archived={false}
                                                is_feedback={vacancy.is_feedback}
                                                role={role}
                                                vacancies={vacancies}
                                                setVacancies={setVacancies}
                                                showButtons={false}
                                            />
                                        ))
                                    ) : filteredVacancies.length > 0 ? (
                                        filteredVacancies.map((vacancy) => (
                                            <VacancyCard
                                                key={vacancy.id}
                                                vacancy_id={vacancy.id}
                                                applicant_id={applicantID}
                                                company_name={vacancy.company}
                                                name={vacancy.name}
                                                created_at={vacancy.created_at}
                                                description={vacancy.description}
                                                place={vacancy.place}
                                                salary={vacancy.salary}
                                                experience={vacancy.experience}
                                                tags={vacancy.tags}
                                                is_confirmed={true}
                                                is_archived={false}
                                                is_feedback={vacancy.is_feedback}
                                                role={role}
                                                vacancies={vacancies}
                                                setVacancies={setVacancies}
                                                showButtons={false}
                                            />
                                        ))
                                    ) : (
                                        <div className='searchNotFound'>
                                            <p className={`red-text`}>Ничего не найдено</p>
                                            <GreenButton
                                                title={"Вернуться к вакансиям"}
                                                onClick={handleBackClick}
                                            />
                                        </div>
                                    )}

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

export default Vacancies;