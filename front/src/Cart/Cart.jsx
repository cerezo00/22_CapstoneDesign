/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import CartItem from './components/CartItem';
import './css/Cart.css';

const initCart = () => {
  let items = JSON.parse(localStorage.getItem('shoppingCart'));

  if (items === null) {
    items = [];
  }

  return items;
};

const Cart = function () {
  const getTotal = (arr) =>
    arr.reduce((acc, v) => v.quantity * v.option.price + acc, 0);

  const [cartList, setCartList] = useState(initCart);
  const onClick = (id, optinId) => {
    setCartList((prev) =>
      prev.filter((item) => !(item.id === id && item.option.id === optinId))
    );
  };
  const onChangeQuantity = (id, option, value) => {
    const newList = cartList.map((obj) => {
      if (obj.id === id && obj.option.id === option.id) {
        return { ...obj, quantity: value };
      }
      return { ...obj };
    });
    setCartList(newList);
  };

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartList));
  }, [cartList]);

  const totalPrice = useMemo(() => getTotal(cartList), [cartList]);
  return (
    <div className="cart">
      <Header text="장바구니" />
      <div className="cart-middle">
        {cartList.map((item, index) => (
          <CartItem
            key={item.menu_id + index}
            item={item}
            onClick={onClick}
            onChangeQuantity={onChangeQuantity}
          />
        ))}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <span className="cart-total-text">총액</span>
          <span className="cart-total-price">{`${totalPrice.toLocaleString()}원`}</span>
        </div>
        <Link to="/qr" className="cart-order">
          주문 QR 받기
        </Link>
      </div>
    </div>
  );
};

export default Cart;
