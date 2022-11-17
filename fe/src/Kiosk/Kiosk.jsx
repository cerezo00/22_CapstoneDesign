/* eslint-disable camelcase */
import React, { useState, useMemo, useEffect } from 'react';
// import {useLocation, useNavigate} from "react-router-dom";
// import { Link } from 'react-router-dom';

// import Header from '../components/Header';
import CartItem from './KioskCartItem';
import '../Cart/css/Cart.css';

// qr을 찍어서 데이터를 가져옴
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

const getTotal = (arr) => arr.reduce((acc, v) => v.quantity * v.price + acc, 0);

const dataset = JSON.stringify(datas);

// <Header text="장바구니" />
const Kiosk = function() {
    // const location = useLocation();
    // const data = location.state.qrvalue;

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
    let items = JSON.parse(dataset); // {data}
    // eslint-disable-next-line
    console.log(dataset);

    if (items === null) {
      items = [];
    }

    setCartList(items);
  }, []);

 // const PaymentPage = () => {
 //   const navigate = useNavigate();
// }

  const ClickPayment = () => {
    // payment 페이지로 이동
    // navigate("/payment");
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