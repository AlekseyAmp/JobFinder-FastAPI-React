import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../utils/axios';
import Cookies from 'js-cookie';

import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import styles from './Auth.module.scss';

function Register() {

    const inputConfigs = [
        { title: "Имя", type: 'name', name: 'name' },
        { title: "Фамилия", type: 'surname', name: 'surname' },
        { title: "Номер телефона", type: 'phone', name: 'phone' },
        { title: "Адрес электронной почты", type: 'email', name: 'email' },
        { title: "Придумайте пароль", type: 'password', name: 'password' },
    ]

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        const name = e.target.name.value
        const surname = e.target.surname.value;
        const phone_number = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post('/auth/register', { name, surname, phone_number, email, password });
            
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
        <div className={styles.registration}>
            <div className={`title ${styles.title}`}>Регистрация</div>
            <div className={styles.registrationForm}>
                <AuthForm
                    inputConfigs={inputConfigs}
                    buttonTitle='Зарегестрироваться'
                    authHelpText='Есть аккаунт?'
                    onSubmit={handleSubmit}
                    authHelpPage='Вход'
                    authHelpLink='/login'
                />
                <img src="img/job.jpg" alt="job-finder" />
            </div>
        </div>
    )
}

export default Register;