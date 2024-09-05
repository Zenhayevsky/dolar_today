import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './app/Pages/Home';
import reportWebVitals from './app/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

reportWebVitals();
