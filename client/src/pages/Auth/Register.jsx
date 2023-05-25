import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../utils/axios';

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
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post('/auth/register', { name, surname, phone, email, password });
            if (response.data) {
                navigate('/')
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
                    authHelpLink='Вход'
                    link='/login'
                />
            </div>
        </div>
    )
}

export default Register;