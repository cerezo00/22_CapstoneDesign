/* eslint-disable camelcase */
import React, { useState, useMemo, useEffect } from 'react';

import Header from '../components/Header';
import CartItem from './components/CartItem';
import './css/Cart.css';

const getTotal = (arr) => arr.reduce((acc, v) => v.quantity * v.price + acc, 0);

const Cart = function () {
  const [cartList, setCartList] = useState([]);
  const onClick = (e) => {
    setCartList((prev) => prev.filter((item) => item.name !== e.target.value));
  };
  const onChangeQuantity = (menu_id, value) => {
    const newList = cartList.map((obj) => {
      if (obj.menu_id === menu_id) {
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
        {cartList.map((item) => (
          <CartItem
            item={item}
            onClick={onClick}
            onChangeQuantity={onChangeQuantity}
          />
        ))}
      </div>
      <div className="cart-bottom">
        <span className="cart-total-price">{`${totalPrice
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원`}</span>
        <button type="button" className="cart-order">
          주문 QR 받기
        </button>
      </div>
    </div>
  );
};

export default Cart;
