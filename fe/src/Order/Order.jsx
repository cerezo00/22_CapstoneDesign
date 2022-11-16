import React, { useState } from 'react';

import Header from '../components/Header';
import './Order.css';

const data = ['콜드 브루 커피', '에스프레소', '프라푸치노', '블렌디드'];

const Order = function () {
  const [catArr, setArr] = useState(
    data.map((elem, index) => {
      const category = {
        id: index,
        name: elem,
        active: index === 0,
      };
      return category;
    })
  );

  const onClick = (id) => {
    setArr(
      catArr.map((item) => {
        const elem = item;
        if (elem.id === id) {
          elem.active = true;
        } else {
          elem.active = false;
        }
        return elem;
      })
    );
  };

  return (
    <div className="order">
      <Header text="주문" />
      <div className="order-category">
        {catArr.map((elem) => (
          <button
            key={elem.id}
            type="button"
            className={
              elem.active
                ? 'order-category-item order-category-item--active'
                : 'order-category-item'
            }
            onClick={() => onClick(elem.id)}
          >
            {elem.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Order;
