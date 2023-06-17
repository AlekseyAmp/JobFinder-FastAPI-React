import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import { register } from '../../services/auth';
import { access_token } from '../../constants/token';

import ErrorBox from '../../components/ErrorBox/ErrorBox';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import styles from './Auth.module.scss';

function Register() {
    const navigate = useNavigate();
    const isAuthorize = access_token
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);

    const inputConfigs = [
        { title: "Имя", type: 'text', name: 'name' },
        { title: "Фамилия", type: 'text', name: 'surname' },
        { title: "Номер телефона", type: 'text', name: 'phone' },
        { title: "Адрес электронной почты", type: 'email', name: 'email' },
        { title: "Придумайте пароль", type: 'password', name: 'password' },
    ]

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const surname = e.target.surname.value;
        const phone_number = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        await register(name, surname, phone_number, email, password, setError, setShowError, navigate);
    };

    return (
        <div className={styles.registration}>
            {isAuthorize ? (
                null
            ) : (
                <div className={`content`}>
                    <div className={`title center`}>Регистрация</div>
                    <div className={`${styles.registrationContent} center mt50px`}>
                        <AuthForm
                            inputConfigs={inputConfigs}
                            buttonTitle='Зарегистрироваться'
                            authHelpText='Есть аккаунт?'
                            onSubmit={handleRegisterSubmit}
                            authHelpPage='Вход'
                            authHelpLink='/login'
                        />
                        <img src="img/job.jpg" alt="job-finder" />
                    </div>
                </div>
            )}
        {showError && <ErrorBox error={error} />}
        </div>
        
    )
}

export default Register;