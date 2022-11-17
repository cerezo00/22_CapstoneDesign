/* eslint-disable camelcase */
import React, { useState, useMemo, useEffect } from 'react';
import {useLocation} from "react-router-dom";
// import { Link } from 'react-router-dom';

// import Header from '../components/Header';
import CartItem from '../Cart/components/CartItem';
import '../Cart/css/Cart.css';
/*
const datas = [
    {
        menu_id: 1,
        name: '아메리카노',
        img: 'americano',
        quantity: 1,
        option: 'ICE',
    },
    { 
        menu_id: 2,
        name: '카페 라떼',
        img: 'caffelatte',
        quantity: 1,
        option: 'ICE',
    },
];
*/

// <Header text="장바구니" />
const Kiosk = function() {
    const location = useLocation();
    const data = location.state.qrvalue;

const getTotal = (arr) => arr.reduce((acc, v) => v.quantity * v.price + acc, 0);

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
    // qr 스캐너 페이지에서 받은 문자열 json인 data
    let items = JSON.parse({data});

    if (items === null) {
      items = [];
    }

    setCartList(items);
  }, []);

  const ClickPayment = () => {
    // payment 페이지로 이동
  }

  const totalPrice = useMemo(() => getTotal(cartList), [cartList]);
  return (
    <div className="cart">
      
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
            <span className="cart-total-price">{`${totalPrice.toLocaleString()}원`}</span>
            <button type="button" className="cart-order" onClick={ClickPayment}>
                결제하기
            </button>
        </div>
    </div>
  );

}

export default Kiosk;