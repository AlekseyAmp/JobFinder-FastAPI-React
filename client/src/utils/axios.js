import axios from 'axios';
import { access_token } from '../constants/token';

export const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  }
});

export default instance;
