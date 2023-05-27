import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './assets/reset.scss';
import './assets/global.scss';

import routes from './routes';

import Header from './components/Header/Header';

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <route.component />
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
