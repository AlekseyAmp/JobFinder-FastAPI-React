import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../utils/axios';
import Cookies from 'js-cookie';
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

    async function handleLoginSubmit(e) {
        e.preventDefault();
        const phone_number = e.target.phone.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post('/auth/login', { phone_number, password });

            if (response.data) {
                Cookies.set('access_token', response.data.access_token);
                Cookies.set('refresh_token', response.data.refresh_token);
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.log(error.response.data.detail);
        }
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