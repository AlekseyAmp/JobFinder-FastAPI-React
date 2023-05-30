import Main from './pages/Main/Main';
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Employer from './pages/Employer/Employer';
import Admin from './pages/Admin/Admin';

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
    {
        path: '/admin',
        component: Admin
    }
]
export default routes;