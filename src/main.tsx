import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Assicurati di avere azzerato margin/padding in questo file
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);

