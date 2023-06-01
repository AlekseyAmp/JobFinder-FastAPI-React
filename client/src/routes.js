import Main from './pages/Main/Main';
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Employer from './pages/Employer/Employer';
import Admin from './pages/Admin/Admin';

const routes = [
    {
        path: '/',
        page: Main,
    },
    {
        path: '/register',
        page: Register,
    },
    {
        path: '/login',
        page: Login,
    },
    {
        path: '/employer',
        page: Employer,
    },
    {
        path: '/admin',
        page: Admin
    }
]
export default routes;