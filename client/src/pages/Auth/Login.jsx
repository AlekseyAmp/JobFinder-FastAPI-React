import React from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/auth'
import { access_token } from '../../constants/token'

import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import styles from './Auth.module.scss';

function Login() {
    const navigate = useNavigate()
    if (!!access_token) {
        navigate('/');
    }

    const inputConfigs = [
        { title: "Номер телефона", type: 'text', name: 'phone' },
        { title: "Введите пароль", type: 'password', name: 'password' },
    ]

    handleLoginSubmit = (e) => {
        e.preventDefault();
        const phone_number = e.target.phone.value;
        const password = e.target.password.value;
        login(phone_number, password)
    };

    return (
        <div className={styles.login}>
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
    )
}

export default Login;