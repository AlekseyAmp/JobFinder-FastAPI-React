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
        path: '/employer',
        component: Employer,
    },
]
export default routes;