/* eslint-disable camelcase */
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import CartItem from './KioskCartItem';
import '../Cart/css/Cart.css';

// qr을 찍어서 데이터를 가져옴
/*
const datas = [
    {
        menu_id: 1,
        name: '아메리카노',
        img: 'americano',
        quantity: 1,
        option: {
          name: 'ICE',
          price: 4500,
        },
        price: 4500,
    },
    { 
        menu_id: 2,
        name: '카페 라떼',
        img: 'caffelatte',
        quantity: 1,
        option: {
          name: 'ICE',
          price: 5000,
        },
        price: 5000,
    },
];
*/

const getTotal = (arr) => arr.reduce((acc, v) => v.quantity * v.price + acc, 0);

// const dataset = JSON.stringify(datas);

const Kiosk = function () {
  // 페이지 이동 시 전달 받은 데이터
  const { state } = useLocation();
  console.log(state);
  // const qrdata = location.state.qrvalue;

  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();

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
    // qr 스캐너 페이지에서 받은 문자열 json인 data
    let items = JSON.parse(state.data); // {qrdata}
    // eslint-disable-next-line
    console.log(items);

    if (items === null) {
      items = [];
    }

    setCartList(items);
  }, []);

  const ClickPayment = () => {
    // 포장 or 매장 페이지로 이동
    navigate('/option');
  };

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
        <div className="cart-total">
          <span className="cart-total-text">총액</span>
          <span className="cart-total-price">{`${totalPrice.toLocaleString()}원`}</span>
        </div>
        <button type="button" className="cart-order" onClick={ClickPayment}>
          결제하기
        </button>
      </div>
    </div>
  );
};

export default Kiosk;
