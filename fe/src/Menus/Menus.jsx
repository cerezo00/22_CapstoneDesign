import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Product from './components/Product';
import Option from './components/Option';
import './css/Menus.css';

const data = [
  {
    menu_id: 1,
    name: '아메리카노',
    tag: '#샷 #물',
    price: 4500,
    quantity: 1,
    img: 'americano',
  },
  {
    menu_id: 2,
    name: '카페 라떼',
    tag: '#샷 #우유',
    price: 5000,
    quantity: 1,
    img: 'caffelatte',
  },
  {
    menu_id: 3,
    name: '돌체라떼',
    tag: '#샷 #무지방 우유 #돌체 시럽',
    price: 5500,
    quantity: 1,
    img: 'dolcelatte',
  },
];

const Menus = function () {
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({});
  const [beverage, setBeverage] = useState([]);

  useEffect(() => {
    setBeverage(data);
  }, []);

  const setOption = (e) => {
    setClickedItem(e);
    setOptionOpen(true);
  };
  return (
    <div className={isOptionOpen ? 'menus-option' : 'menus'}>
      <div
        className={
          isOptionOpen ? 'menus-background__black' : 'menus-background'
        }
      >
        <Header text="에스프레소" />
        <div className="menus-list">
          {beverage.map((item) => (
            <Product
              key={item.menu_id}
              item={item}
              onClick={() => setOption(item)}
            />
          ))}
        </div>
      </div>
      <div className="order-option">
        {isOptionOpen && (
          <Option item={clickedItem} onClose={() => setOptionOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Menus;
