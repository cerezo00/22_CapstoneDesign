import React, { useState } from 'react';

import Header from '../components/Header';
import './Order.css';

const data = [
  {
    category_name: '에스프레소',
    menus: [
      {
        menu_id: 1,
        name: '아메리카노',
        tag: '#샷 #물',
        price: '4,500원',
        img: 'americano',
      },
      {
        menu_id: 2,
        name: '카페 라떼',
        tag: '#샷 #우유',
        price: '5,000원',
        img: 'caffelatte',
      },
      {
        menu_id: 3,
        name: '돌체라떼',
        tag: '#샷 #무지방 우유 #돌체 시럽',
        price: '5,500원',
        img: 'dolcelatte',
      },
    ],
  },
  {
    category_name: '블렌디드',
    menus: [
      {
        menu_id: 4,
        name: '딸기 딜라이트 요거트 블렌디드',
        tag: '#딸기 #우유',
        price: '6,300원',
        img: 'strawberry',
      },
      {
        menu_id: 5,
        name: '망고 바나나 블렌디드',
        tag: '#망고 #바나나 #우유',
        price: '6,300원',
        img: 'mangobanana',
      },
    ],
  },
];

const Order = function () {
  const [catArr, setArr] = useState(
    data.map((elem, index) => {
      const category = {
        id: index,
        name: elem.category_name,
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
      <Header />
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
