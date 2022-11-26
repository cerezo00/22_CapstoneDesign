import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Start from './Start/components/Start';
import Order from './Order/Order';
import Menus from './Menus/Menus';
import Cart from './Cart/Cart';
import QrBox from './QR/QrBox';
import Scanner from './Kiosk/Scanner';
import Ingredients from './Ingredients/Ingredients';
import './App.css';
import SearchResult from './SearchResult/SearchResult';
import PayMent from './Kiosk/Payment';
import Kiosk from './Kiosk/Kiosk';
import OrderOption from './OrderOption/OrderOption';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/order" element={<Order />} />
      <Route path="/menus/:id" element={<Menus />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/qr" element={<QrBox />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/tag" element={<Ingredients />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="/payment" element={<PayMent />} />
      <Route path="/kiosk" element={<Kiosk />} />
      <Route path="/option" element={<OrderOption />} />
    </Routes>
  );
}

export default App;
