import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../utils/axios';
import Cookie from 'js-cookie';

function Logout() {
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const response = await axios.get('/auth/logout');

      if (response.data.status === 'success') {
        Cookie.remove('access_token');
        Cookie.remove('refresh_token');
        navigate('/login');
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.detail);
    }
  };

  return (
    <a onClick={handleSubmit} className={"link-text"}>Выйти</a>
  );
}

export default Logout;