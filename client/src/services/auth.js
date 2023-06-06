import { useNavigate } from 'react-router-dom';

import axios from '../utils/axios';
import Cookies from 'js-cookie';


export async function register(name, surname, phone_number, email, password) {
    try {
        const response = await axios.post('/auth/register', { name, surname, phone_number, email, password });

        if (response.data) {
            Cookies.set('access_token', response.data.access_token);
            Cookies.set('refresh_token', response.data.refresh_token);
            window.location.reload();
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function login(phone_number, password) {
    try {
        const response = await axios.post('/auth/login', { phone_number, password });

        if (response.data) {
            Cookies.set('access_token', response.data.access_token);
            Cookies.set('refresh_token', response.data.refresh_token);
            window.location.reload();
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function logout() {
    try {
        const response = await axios.get('/auth/logout');

        if (response.data) {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            window.location.reload();
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}
