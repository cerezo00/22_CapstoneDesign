import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Kiosk from './Kiosk/Kiosk';
// import QrBox from './QR/QrBox';
import App from './App';
// import Scanner from './Kiosk/Scanner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
