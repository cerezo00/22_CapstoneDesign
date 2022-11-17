import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import './Order.css';

const data = ['콜드 브루 커피', '에스프레소', '프라푸치노', '블렌디드'];

const Order = function () {
  const [catArr, setArr] = useState([]);

  const getCategory = data.map((elem, index) => {
    const category = {
      id: index,
      name: elem,
    };
    return category;
  });

  useEffect(() => {
    setArr(getCategory);
  }, []);

  return (
    <div className="order">
      <Header text="주문" />
      <div className="order-category">
        {catArr.map((elem) => (
          <Link to="/menus" className="order-category-item">
            {elem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Order;
