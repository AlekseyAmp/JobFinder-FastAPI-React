import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

import './assets/reset.scss';
import './assets/global.scss';

import Register from './pages/Auth/Register';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;