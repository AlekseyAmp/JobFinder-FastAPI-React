import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Employer from './pages/Employer/Employer';
import Applicant from './pages/Applicant/Applicant';
import Admin from './pages/Admin/Admin';
import Vacancies from './pages/Vacancies/Vacancies';

const routes = [
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
      path: '/employers/search',
      page: Employer,
    },
    {
      path: '/applicants',
      page: Applicant,
    },
    {
      path: '/applicants/filter',
      page: Applicant,
    },
    {
      path: '/applicants/search',
      page: Applicant,
    },
    {
      path: '/vacancies',
      page: Vacancies,
    },
    {
      path: '/vacancies/filter',
      page: Vacancies,
    },
    {
      path: '/vacancies/search',
      page: Vacancies,
    },
    {
      path: '/admin',
      page: Admin,
    },
  ];
  
export default routes;