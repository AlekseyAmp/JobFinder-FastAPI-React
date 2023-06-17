import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../services/auth';

import ErrorBox from '../../components/ErrorBox/ErrorBox';

function Logout() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleLogoutSubmit = async (e) => {
    e.preventDefault();
    await logout(setError, setShowError, navigate);
  };

  return (
    <div className={'content'}>
      <a onClick={handleLogoutSubmit} className={"link-text"}>Выйти</a>
      {showError && <ErrorBox error={error} />}
    </div>
  );
}

export default Logout;