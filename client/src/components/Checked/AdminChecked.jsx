import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../services/user';

function AdminChecked({ children }) {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  useEffect(() => {
    getUserInfo()
      .then((data) => setRole(data.role))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (role !== null) {
      const currentPath = window.location.pathname;
      if (currentPath === '/admin' && role !== 'admin') {
        navigate('/');
      }
    }
  }, role);
  

  return <>{children}</>;
}

export default AdminChecked;
