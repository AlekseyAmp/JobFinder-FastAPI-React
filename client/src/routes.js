import Main from './pages/Main/Main';
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Employer from './pages/Employer/Employer';

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/employer',
        component: Employer,
    },
]
export default routes;