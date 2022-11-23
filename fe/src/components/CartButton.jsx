import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './css/CartButton.css';
import cartIcon from './img/shopping-bag.png';

const CartButton = function () {
  const [num, setNum] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('shoppingCart'));
    if (items == null) setNum(0);
    else setNum(items.length);
  }, []);

  useEffect(() => {
    setActive((prev) => !prev);
    setTimeout(() => setActive((prev) => !prev), 3000);
  }, [num]);

  return (
    <Link to="/cart" className="cart-button">
      <img
        src={cartIcon}
        alt="Cart Icon"
        className={active ? 'cart-button-img__active' : 'cart-button-img'}
      />
    </Link>
  );
};

export default CartButton;
