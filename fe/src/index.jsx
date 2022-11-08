import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {CookiesProvider} from 'react-cookie';
// import App from './App';
// import ShopName from './Start/ShopName';
// import OrderButton from './Start/OrderButton';
// import Start from './Start/Start';
// import QR from './QR/QR';
import QrBox from './QR/components/QrBox';
// import Cookie from './QR/components/Cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <QrBox />
    </CookiesProvider>
  </React.StrictMode>
);
