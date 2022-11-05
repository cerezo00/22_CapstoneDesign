import React, { useState, useEffect } from 'react';

import Option from './components/Option';
import Product from './components/Product';
import './Order.css';
import arrow from './img/arrow-left.png';

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
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [beverage, setBeverage] = useState([]);
  const [curCategory, setCurCategory] = useState('에스프레소');
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

  useEffect(() => {
    data.some((elem) => {
      if (elem.category_name === curCategory) {
        setBeverage(elem.menus);
        return true;
      }
      return false;
    });
  }, [curCategory]);

  const onClick = (id) => {
    setArr(
      catArr.map((item) => {
        const elem = item;
        if (elem.id === id) {
          elem.active = true;
          setCurCategory(elem.name);
        } else {
          elem.active = false;
        }
        return elem;
      })
    );
  };

  return (
    <div className={isOptionOpen ? 'order-option' : 'order'}>
      <div
        className={
          isOptionOpen ? 'order-background__black' : 'order-background'
        }
      >
        <div className="order-header">
          <button type="button" className="order-header-back">
            <img alt="back" src={arrow} className="order-header-img" />
          </button>
          <span className="order-header-text">주문</span>
        </div>
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
        <div>
          {beverage.map((item) => (
            <Product
              key={item.menu_id}
              name={item.name}
              tag={item.tag}
              price={item.price}
              img={item.img}
              onClick={() => setOptionOpen(true)}
            />
          ))}
        </div>
      </div>
      <div className="order-option">
        {isOptionOpen && (
          <Option isOpen={isOptionOpen} onClose={() => setOptionOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Order;
