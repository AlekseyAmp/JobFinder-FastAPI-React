import React from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/auth'
import { access_token } from '../../constants/token'

import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import styles from './Auth.module.scss';

function Login() {
    const navigate = useNavigate();
    const isAuthorize = access_token

    const inputConfigs = [
        { title: "Номер телефона", type: 'text', name: 'phone' },
        { title: "Введите пароль", type: 'password', name: 'password' },
    ]

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const phone_number = e.target.phone.value;
        const password = e.target.password.value;
        login(phone_number, password)
        navigate('/vacancies')
    };

    return (
        <div className={styles.login}>
            {isAuthorize ? (
                null
            ) : (
                <div className={`content`}>
                    <div className={`title center`}>Вход</div>
                    <div className={`center mt50px`}>
                        <AuthForm
                            inputConfigs={inputConfigs}
                            buttonTitle='Войти'
                            authHelpText='Нет аккаунта?'
                            onSubmit={handleLoginSubmit}
                            authHelpPage='Регистрация'
                            authHelpLink='/register'
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;