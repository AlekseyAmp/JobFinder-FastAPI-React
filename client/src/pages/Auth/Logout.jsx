import React from 'react';

import { logout } from '../../services/auth';

function Logout() {
  handleLogoutSubmit = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <a onClick={handleLogoutSubmit} className={"link-text"}>Выйти</a>
  );
}

export default Logout;