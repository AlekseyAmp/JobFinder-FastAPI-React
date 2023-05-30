import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { access_token } from '../../constants/token';

function AuthChecked({ children }) {
    const navigate = useNavigate();
    const isAuthorize = access_token

    useEffect(() => {

        const isAuthNotAllowedPath = ['/register', '/login'];
        const isNotAuthNotAllowedPaths = ['/employer', '/applicant', '/admin'];
        const currentPath = window.location.pathname;

        if (isAuthorize) {
            if (isAuthNotAllowedPath.includes(currentPath)) {
                navigate('/')
            }
        } else {
            if (isNotAuthNotAllowedPaths.includes(currentPath)) {
                navigate ('/login')
            }
        }
    }, [navigate]);

    return <>{children}</>;
}

export default AuthChecked;