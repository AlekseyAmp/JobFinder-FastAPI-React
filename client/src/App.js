import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './assets/reset.scss';
import './assets/global.scss';

import Header from './components/Header/Header';
import AuthChecked from './components/Checked/AuthChecked';
import AdminChecked from './components/Checked/AdminChecked';
import Admin from './pages/Admin/Admin';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Main from './pages/Main/Main'
import Employer from './pages/Employer/Employer';

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/login"
          element={<AuthChecked><Login /></AuthChecked>}
        />
        <Route
          path="/register"
          element={<AuthChecked><Register /></AuthChecked>}
        />
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/employer"
          element={<AuthChecked><Employer /></AuthChecked>}
        />
        <Route
          path="/admin"
          element={<AuthChecked><AdminChecked><Admin /></AdminChecked></AuthChecked>}
        />
      </Routes>
    </div>
  );
}

export default App;
