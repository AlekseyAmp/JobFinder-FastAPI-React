import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/auth'
import { access_token } from '../../constants/token'

import ErrorBox from '../../components/ErrorBox/ErrorBox';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import styles from './Auth.module.scss';

function Login() {
    const navigate = useNavigate();
    const isAuthorize = access_token
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);

    const inputConfigs = [
        { title: "Номер телефона", type: 'text', name: 'phone' },
        { title: "Введите пароль", type: 'password', name: 'password' },
    ]

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const phone_number = e.target.phone.value;
        const password = e.target.password.value;
        await login(phone_number, password, setError, setShowError, navigate)
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
        {showError && <ErrorBox error={error} />}
        </div>
    )
}

export default Login;