import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../components/CartButton';

import Header from '../components/Header';
import './Order.css';

const Order = function () {
  const [catArr, setArr] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/store/categories/1', {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        setArr(response.data.categories);
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  return (
    <div className="order">
      <Header text="주문" />
      <div className="order-category">
        {catArr.map((elem) => (
          <Link
            to={`/menus/${elem.id}`}
            state={{ name: elem.name }}
            className="order-category-item"
          >
            {elem.name}
          </Link>
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Order;
