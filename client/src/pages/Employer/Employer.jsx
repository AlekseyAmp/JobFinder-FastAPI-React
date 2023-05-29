import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoading, useLoading } from '../../utils/preload'
import { access_token } from '../../constants/token';
import { getUserRole } from '../../services/user';
import { createNewEmployer } from '../../services/employer';


import styles from './Employer.module.scss';
import '../../assets/variables.scss';

import BlueButton from '../../components/Buttons/BlueButton/BlueButton';
import GreenButton from '../../components/Buttons/GreenButton/GreenButton';
import TextareaForm from '../../components/Forms/TextareaForm/TextareaForm';

function Employer() {
    const isLoading = useLoading(150)
    const isAuthorized = !!access_token;
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };

    const [role, setRole] = useState();
    useEffect(() => {
        if (isAuthorized) {
            getUserRole()
                .then((data) => setRole(data.role))
                .catch((error) => console.log(error));
        }
    }, [isAuthorized]);

    const [showEmployerCreateForm, setShowEmployerCreateForm] = useState(false);
    const inputConfigs = [
        { title: 'Название компании', type: 'text', name: 'company_name' },
    ];
    const textareaConfigs = [
        { title: 'Описание компании', type: 'text', name: 'company_description' },
    ];
    const handleBecomeEmployerClick = () => {
        setShowEmployerCreateForm(true);
    };

    const handleCreateEmployerSubmit = (e) => {
        e.preventDefault();
        createNewEmployer(e.target.company_name.value, e.target.company_description.value);
    };

    return (
        <div className={styles.employer}>
            {isAuthorized ? (
                role === 'applicant' ? (
                    <div className={styles.notEmployer}>
                        {showEmployerCreateForm ? (
                            <TextareaForm
                                inputConfigs={inputConfigs}
                                textareaConfigs={textareaConfigs}
                                buttonTitle={'Отправить'}
                                onSubmit={handleCreateEmployerSubmit}
                            />
                        ) : (
                            <div className={styles.notEmployerContent}>
                                <p className={`dark-text`}>
                                    Для того, чтобы просматривать эту страницу, нужно стать работодателем
                                </p>
                                <div className={styles.notEmployerContentButton}>
                                    <BlueButton title={'Стать работодателем'} onClick={handleBecomeEmployerClick} />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>Employer content here</div>
                )
            ) : (
                <GreenButton title={'Войти'} onClick={handleLoginClick} />
            )}
        </div>
    );
}

export default Employer;