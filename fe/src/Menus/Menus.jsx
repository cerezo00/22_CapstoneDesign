import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Product from './components/Product';
import Option from './components/Option';

const data = [
  {
    menu_id: 1,
    name: '아메리카노',
    tag: '#샷 #물',
    price: '4,500원',
    img: 'americano',
  },
  {
    menu_id: 2,
    name: '카페 라떼',
    tag: '#샷 #우유',
    price: '5,000원',
    img: 'caffelatte',
  },
  {
    menu_id: 3,
    name: '돌체라떼',
    tag: '#샷 #무지방 우유 #돌체 시럽',
    price: '5,500원',
    img: 'dolcelatte',
  },
];

const Menus = function () {
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [beverage, setBeverage] = useState([]);
  useEffect(() => {
    setBeverage(data);
  });
  return (
    <div className="menus">
      <Header />
      <div>
        {beverage.map((item) => (
          <Product
            key={item.menu_id}
            name={item.name}
            tag={item.tag}
            price={item.price}
            img={item.img}
            onClick={() => setOptionOpen(true)}
          />
        ))}
      </div>
      <div className="order-option">
        {isOptionOpen && (
          <Option isOpen={isOptionOpen} onClose={() => setOptionOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Menus;
