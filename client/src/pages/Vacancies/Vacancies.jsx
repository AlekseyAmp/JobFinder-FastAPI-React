import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { access_token } from '../../constants/token';
import { getUserInfo } from '../../services/user';
import { getPaginatedVacancies } from '../../services/vacancy';

import styles from './Vacancies.module.scss';

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
        <div className={styles.vacancies}>
            {isAuthorized ? (
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={styles.vacanciesSection}>
                        <FilterBar />
                        <div className={`content`}>
                            <h3 className={`title`}>Вакансии</h3>
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
                                                experience={vacancy.experience}
                                                tags={vacancy.tags}
                                                is_confirmed={true}
                                                is_archived={false}
                                                role={role}
                                                vacancies={vacancies}
                                                setVacancies={setVacancies}
                                                showButtons={false}
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