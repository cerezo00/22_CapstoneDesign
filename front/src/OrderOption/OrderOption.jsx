import React from 'react';
import { Link } from 'react-router-dom';

import './OrderOption.css';
import takeout from '../components/img/take-away.png';
import restaurant from '../components/img/restaurant.png';

const OrderOption = function () {

  return (
    <div className="order-option">
      <span className="order-option-title">식사하실 장소를 선택해 주세요</span>
      <div className="order-option-box">
        <Link
          to="/payment"
          state={{ option: { id: 1, name: '매장 내 식사' } }}
          className="order-option-link"
        >
          <img
            src={restaurant}
            alt="매장 내 식사"
            className="order-option-img"
          />
          <span className="order-option-text">매장 내 식사</span>
        </Link>
        <Link
          to="/payment"
          state={{ option: { id: 2, name: '포장' } }}
          className="order-option-link"
        >
          <img src={takeout} alt="포장" className="order-option-img" />
          <span className="order-option-text">포장</span>
        </Link>
      </div>
    </div>
  );
};

export default OrderOption;
