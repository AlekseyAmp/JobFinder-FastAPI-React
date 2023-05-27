import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../utils/axios';
import Cookies from 'js-cookie';

import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import styles from './Auth.module.scss';

function Login() {

    const inputConfigs = [
        { title: "Номер телефона", type: 'phone', name: 'phone' },
        { title: "Придумайте пароль", type: 'password', name: 'password' },
    ]

    const navigate = useNavigate()

    async function handleSubmit(e) {
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
            <div className={`title ${styles.title}`}>Вход</div>
            <div className={styles.loginForm}>
                <AuthForm
                    inputConfigs={inputConfigs}
                    buttonTitle='Войти'
                    authHelpText='Нет аккаунта?'
                    onSubmit={handleSubmit}
                    authHelpPage='Регистрация'
                    authHelpLink='/register'
                />
            </div>
        </div>
    )
}

export default Login;