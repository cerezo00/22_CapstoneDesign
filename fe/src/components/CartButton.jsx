// import React, { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import './css/CartButton.css';
import cartIcon from './img/shopping-bag.png';

const CartButton = function ({ cartText }) {
  // const [num, setNum] = useState(0);
  // const [active, setActive] = useState(false);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('shoppingCart'));
  //   if (items == null) setNum(0);
  //   else setNum(items.length);
  // }, []);

  // useEffect(() => {
  //   setActive((prev) => !prev);
  //   setTimeout(() => setActive((prev) => !prev), 3000);
  // }, [num]);

  return (
    <div className="cart-button">
      <span
        className={cartText ? 'menu-add-to-cart__active' : 'menu-add-to-cart'}
      >
        장바구니에 추가되었습니다.
      </span>
      <Link to="/cart" className="cart-button-icon">
        <img
          src={cartIcon}
          alt="Cart Icon"
          className={cartText ? 'cart-button-img__active' : 'cart-button-img'}
        />
      </Link>
    </div>
  );
};

CartButton.propTypes = {
  cartText: PropTypes.bool.isRequired,
};

export default CartButton;
