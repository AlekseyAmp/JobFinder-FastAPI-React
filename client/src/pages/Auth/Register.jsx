import React from 'react';

import { register } from '../../services/auth';
import { access_token } from '../../constants/token';

import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import styles from './Auth.module.scss';

function Register() {
    const isAuthorize = access_token

    const inputConfigs = [
        { title: "Имя", type: 'text', name: 'name' },
        { title: "Фамилия", type: 'text', name: 'surname' },
        { title: "Номер телефона", type: 'text', name: 'phone' },
        { title: "Адрес электронной почты", type: 'email', name: 'email' },
        { title: "Придумайте пароль", type: 'password', name: 'password' },
    ]

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const surname = e.target.surname.value;
        const phone_number = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        register(name, surname, phone_number, email, password);
    };

    return (
        <div className={styles.registration}>
            {isAuthorize ? (
                null
            ) : (
                <div className={`content`}>
                    <div className={`title center`}>Регистрация</div>
                    <div className={`center mt50px`}>
                        <AuthForm
                            inputConfigs={inputConfigs}
                            buttonTitle='Зарегестрироваться'
                            authHelpText='Есть аккаунт?'
                            onSubmit={handleRegisterSubmit}
                            authHelpPage='Вход'
                            authHelpLink='/login'
                        />
                        <img src="img/job.jpg" alt="job-finder" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Register;