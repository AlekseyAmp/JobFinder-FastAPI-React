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
    const [role, setRole] = useState();
    useEffect(() => {
        getUserInfo()
            .then((data) => setRole(data.role))
            .catch((error) => console.log(error));
    }, []);

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
            {role === 'applicant' ? (
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
            )}
        </div>
    );
}

export default Employer;
