import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HelmetProvider} from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './utils/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App/>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
reportWebVitals();
