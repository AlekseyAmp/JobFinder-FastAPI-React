import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { access_token } from '../../constants/token';
import axios from '../../utils/axios';

import styles from './Employer.module.scss';

import BlueButton from '../../components/Buttons/BlueButton/BlueButton';
import GreenButton from '../../components/Buttons/GreenButton/GreenButton';

function Employer() {
    const isAuthorized = !!access_token;
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const [role, setRole] = useState();
    useEffect(() => {
        async function getRole() {
            try {
                const response = await axios.get(`/users/me`);

                if (response.data) {
                    setRole(response.data.role);
                }
            } catch (error) {
                console.log(error.response.data.detail);
            }
        }
        if (isAuthorized) {
            getRole();
        }
    }, [isAuthorized]);

    return (
        <div className={styles.employer}>
            {isAuthorized ? (
                role === 'applicant' ? (
                    <BlueButton title={'Стать работодателем'} />
                ) : (
                    <div>Authorized content here</div>
                )
            ) : (
                <GreenButton title={'Войти'} onClick={handleLoginClick} />
            )}
        </div>
    );
}

export default Employer;
