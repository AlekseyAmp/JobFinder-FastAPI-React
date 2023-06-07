import Main from './pages/Main/Main';
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Employer from './pages/Employer/Employer';
import Applicant from './pages/Applicant/Applicant';
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
        path: '/employers',
        page: Employer,
    },
    {
        path: '/applicants',
        page: Applicant,
    },
    {
        path: '/admin',
        page: Admin
    }
]
export default routes;