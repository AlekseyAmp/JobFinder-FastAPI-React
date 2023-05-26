import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './assets/reset.scss';
import './assets/global.scss';

import Header from './components/Header/Header';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
