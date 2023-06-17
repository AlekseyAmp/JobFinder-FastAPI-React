import axios from 'axios';
import { access_token } from '../constants/token';
import { refresh_token } from '../services/auth'; // Подключаем функцию обновления токена

export const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  }
});

// Добавляем interceptor для обработки ошибки 401 (неавторизован)
instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      try {
        const response = await refresh_token(); // Обновляем токен
        if (response && response.access_token) {
          const new_access_token = response.access_token;
          instance.defaults.headers.common['Authorization'] = `Bearer ${new_access_token}`; // Устанавливаем новый токен в headers
          error.config.headers['Authorization'] = `Bearer ${new_access_token}`; // Обновляем токен в текущем запросе
          return instance(error.config); // Повторно выполняем оригинальный запрос
        }
      } catch (refreshError) {
        console.log(refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
