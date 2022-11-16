/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { useState, useMemo, useEffect } from 'react';

import Header from '../components/Header';
import CartItem from './components/CartItem';
import './css/Cart.css';

const Cart = function () {
  const getTotal = (arr) =>
    arr.reduce((acc, v) => v.quantity * v.price + acc, 0);

  const [cartList, setCartList] = useState([]);
  const onClick = (e) => {
    setCartList((prev) => prev.filter((item) => item.name !== e.target.value));
  };
  const onChangeQuantity = (menu_id, option, value) => {
    const newList = cartList.map((obj) => {
      if (obj.menu_id === menu_id && obj.option.name === option.name) {
        return { ...obj, quantity: value };
      }
      return { ...obj };
    });
    setCartList(newList);
  };

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem('shoppingCart'));

    if (items === null) {
      items = [];
    }

    setCartList(items);
  }, []);

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
        <button type="button" className="cart-order">
          주문 QR 받기
        </button>
      </div>
    </div>
  );
};

export default Cart;
